"use client";

import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import { CategoryChip } from "../../_components/CategoryChip";
import { InputWithLabel } from "../../_components/InputWithLabel";
import { CardWithAutoCompleteData } from "@/components/common/Cards/CardWithAutoCompleteData";
import { InputWithImage } from "../../_components/InputWithImage";
import { useRouter, useSearchParams } from "next/navigation";
import { useCourseContext } from "@/providers/course-provider";
import { PlaceResponseDto } from "@/apis/place/types/dto";
import { useEffect, useState, useMemo } from "react";
import {
  CommonPlaceDetailFormType,
  useAddPlaceDetailForm,
} from "../../_hooks/useAddPlaceDetailForm";
import { FormProvider } from "react-hook-form";
import { useCreatePlace } from "@/apis/place/PlaceApi.mutation";
import { PlaceAutoCompleteResponse } from "@/apis/origin-place/types/dto";

export type DefaultImageType = {
  id: string;
  src: string;
};

export const DEFAULT_IMAGES: DefaultImageType[] = [
  {
    id: "DISH",
    src: "/png/default_food.png",
  },
  {
    id: "DESSERT",
    src: "/png/default_dessert.png",
  },
  {
    id: "ALCOHOL",
    src: "/png/default_alcohol.png",
  },
  {
    id: "ARCADE",
    src: "/png/default_arcade.png",
  },
];

const createFileFromImagePath = async (
  imagePath: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};

const getPayloadForRequest = (
  autoData: PlaceAutoCompleteResponse | null,
  values: CommonPlaceDetailFormType,
  selectedChips: number[]
) => {
  return {
    scheduleIds: selectedChips,
    name: autoData ? autoData?.data?.name : values.name,
    url: autoData ? autoData?.data?.url : values.url ? values.url : "-",
    address: values.address || "-",
    openingHours: autoData
      ? autoData?.data?.openingHours
      : values.openingHours
      ? values.openingHours
      : "-",
    phoneNumber: autoData
      ? autoData?.data?.phoneNumber
      : values.phoneNumber
      ? values.phoneNumber
      : "-",
    reviewCount: autoData?.data?.reviewCount || 0,
    starGrade: autoData?.data?.starGrade || 0,
    memo: values.memo || "-",
    origin: autoData?.data?.origin || "MANUAL",
    voteLikeCount: 0,
    longitude: 0,
    latitude: 0,
    autoCompletedPlaceImageUrls: autoData?.data?.placeImageUrls?.contents || [],
  };
};

const AddPlaceDetail: React.FC = () => {
  const router = useRouter();
  const [selectedChips, setSelectedChips] = useState<number[]>([]);
  const methods = useAddPlaceDetailForm();
  const searchParams = useSearchParams();

  const roomUid = searchParams.get("roomUid") || "";
  const {
    categoryList,
    isClipboardText,
    setIsClipboardText,
    autoData,
    addPlaceInfo,
  } = useCourseContext();

  const [payloadForRequest, setPayloadForRequest] = useState(() => {
    const values = methods.getValues();
    return getPayloadForRequest(autoData, values, selectedChips);
  });

  useEffect(() => {
    const values = methods.getValues();
    setPayloadForRequest(getPayloadForRequest(autoData, values, selectedChips));
  }, [methods, selectedChips, autoData]);

  const { mutate: createPlaceMutate } = useCreatePlace({
    options: {
      onSuccess: (res) => {
        const placeResponse: PlaceResponseDto = res.data;
        setIsClipboardText(false);

        addPlaceInfo(placeResponse);

        router.replace(`/add-course?roomUid=${roomUid}`);
      },
      onError: (error) => {
        console.error("장소 등록 실패:", error);
      },
    },
  });

  const handleChipClick = (index: number) => {
    setSelectedChips((prevChips) => {
      if (prevChips.includes(index)) {
        return prevChips.filter((chip) => chip !== index); // 이미 선택된 경우 선택 해제
      } else {
        return [...prevChips, index]; // 새로운 칩 선택
      }
    });
  };

  const selectedCategory = useMemo(() => {
    const result = selectedChips.map((chipId) =>
      categoryList?.find((category) => category.scheduleId === chipId)
    );

    return result;
  }, [selectedChips, categoryList]);

  useEffect(() => {
    if (autoData) {
      setIsClipboardText(true);

      const { name, url, address, phoneNumber, openingHours } =
        autoData.data || {};
      methods.setValue("name", name);
      methods.setValue("url", url);
      methods.setValue("address", address);
      methods.setValue("phoneNumber", phoneNumber);
      methods.setValue("openingHours", openingHours);
    } else {
      setIsClipboardText(false);
    }
  }, []);

  const onCompleteButtonClick = async () => {
    const values = methods.getValues();
    const scheduleIds = selectedChips;

    const updatedPayloadForRequest = getPayloadForRequest(
      autoData,
      values,
      scheduleIds
    );

    if (!values.name || !selectedChips || !selectedCategory) {
      return;
    }

    const selectedCategories = scheduleIds.map((chipId) => {
      return categoryList?.find((category) => category.scheduleId === chipId);
    });

    const defaultImages = (
      await Promise.all(
        selectedCategories.map(async (category) => {
          const matchedImage = DEFAULT_IMAGES.find(
            (image) => image.id === category!.type
          );
          if (matchedImage) {
            const file = await createFileFromImagePath(
              matchedImage.src,
              matchedImage.src.split("/").pop() || "default.png"
            );

            return file;
          }
          return null;
        })
      )
    ).filter((file): file is File => file !== null);

    const formImages =
      values.pictures && Array.isArray(values.pictures)
        ? values.pictures.filter((file): file is File => file instanceof File)
        : [];

    const placeImages =
      autoData !== null
        ? []
        : formImages.length > 0
        ? formImages
        : defaultImages;

    const payload = {
      addPlaceRequest: updatedPayloadForRequest,
      ...(autoData !== null ? {} : { placeImages }),
    };

    createPlaceMutate({
      roomUid,
      payload,
    });
  };

  useEffect(() => {
    return () => {
      setIsClipboardText(false);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-y-[56px]">
        <NavigationBar
          leftSlot={
            <div
              className="flex py-[16px] px-[12px] cursor-pointer"
              onClick={() => router.back()}
            >
              <Image
                src="/png/ic_arrow_left_24.png"
                alt="ic_arrow_left_24.png"
                width={24}
                height={24}
              />
              <p className="text-semibold-15 text-neutral-700">장소 추가하기</p>
            </div>
          }
          rightSlot={
            <p
              className="flex py-[16px] px-[12px] cursor-pointer text-semibold-15 text-[#FF601C]"
              onClick={onCompleteButtonClick}
            >
              완료
            </p>
          }
        />
        <div className="flex flex-col w-[335px] mt-[88px] mx-[20px] gap-y-[32px]">
          <div className="flex flex-col w-[252px] h-[98px]">
            <div className="flex flex-row items-center w-[90px] h-[24px] gap-x-[6px]">
              <p className="w-[59px] font-bold text-[#292E31] text-[16px]">
                카테고리
              </p>
              <p className="w-[25px] font-bold text-[#FF601C] text-[14px]">
                필수
              </p>
            </div>
            <div className="w-full h-[21px] font-medium text-[14px] text-[#23272F] opacity-[0.5]">
              여러 개 선택 가능해요
            </div>
            <div className="flex flex-row w-[252px] mt-[12px] gap-x-[8px]">
              {categoryList?.map(
                (item) =>
                  item.scheduleId !== null &&
                  item.scheduleId !== undefined &&
                  item.name && (
                    <CategoryChip
                      key={item.scheduleId}
                      title={item.name}
                      selected={selectedChips.includes(item.scheduleId)}
                      onClick={() => handleChipClick(item.scheduleId as number)}
                    />
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-[184px] gap-y-[32px]">
            {isClipboardText === true ? (
              <div className="flex flex-col items-start justify-center gap-y-[12px]">
                <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
                  메모
                </p>
                <InputWithLabel
                  type="link"
                  placeholder="일행에게 메모를 남겨주세요"
                  iconSrc="/svg/ic_memo_mono.svg"
                  {...methods.register("memo")}
                />
                <CardWithAutoCompleteData register={methods.register} />
              </div>
            ) : (
              <div className="gap-y-[32px] flex flex-col">
                <div className="flex flex-col w-full gap-y-[12px]">
                  <div className="flex flex-row items-center w-full h-[24px] gap-x-[6px]">
                    <p className="w-[65px] font-bold text-[#292E31] text-[16px]">
                      장소 이름
                    </p>
                    <p className="w-[30px] font-bold text-[#FF601C] text-[14px]">
                      필수
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <InputWithLabel
                      type="text"
                      placeholder="상호명을 적어주세요"
                      {...methods.register("name", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <InputWithImage
                      className="w-[80px] h-[80px]"
                      id="picture"
                      type="file"
                      onFilesChange={(formData) => {
                        const files = Array.from(
                          formData.getAll("placeImages")
                        );
                        methods.setValue(
                          "pictures",
                          files.filter(
                            (file): file is File => file instanceof File
                          )
                        );
                      }}
                      multiple
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-y-[12px]">
                  <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
                    링크
                  </p>
                  <InputWithLabel
                    type="link"
                    placeholder="링크를 붙여주세요"
                    iconSrc="/svg/ic_link.svg"
                    {...methods.register("url")}
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-[12px]">
                  <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
                    영업정보
                  </p>
                  <InputWithLabel
                    type="link"
                    placeholder="영업 시간을 남겨주세요"
                    iconSrc="/svg/ic_clock_mono.svg"
                    {...methods.register("openingHours")}
                  />
                  <InputWithLabel
                    type="link"
                    placeholder="주소를 남겨주세요"
                    iconSrc="/svg/ic_pin_location_mono.svg"
                    {...methods.register("address")}
                  />
                  <InputWithLabel
                    type="link"
                    placeholder="전화번호를 남겨주세요"
                    iconSrc="/svg/ic_call_mono.svg"
                    {...methods.register("phoneNumber")}
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-y-[12px]">
                  <p className="w-[59px] font-bold text-[#747B89] text-[16px]">
                    메모
                  </p>
                  <InputWithLabel
                    type="link"
                    placeholder="일행에게 메모를 남겨주세요"
                    iconSrc="/svg/ic_memo_mono.svg"
                    {...methods.register("memo")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddPlaceDetail;
