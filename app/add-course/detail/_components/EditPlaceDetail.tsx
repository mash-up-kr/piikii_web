"use client";

import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import { CategoryChip } from "../../_components/CategoryChip";
import { InputWithLabel } from "../../_components/InputWithLabel";
import { CardWithAutoCompleteData } from "@/components/common/Cards/CardWithAutoCompleteData";
import { useRouter, useSearchParams } from "next/navigation";
import { useCourseContext } from "@/providers/course-provider";
import {
  ModifyPlaceRequestDto,
  PlaceResponseDto,
} from "@/apis/place/types/dto";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useAddPlaceDetailForm } from "../../_hooks/useAddPlaceDetailForm";
import { useDeletePlace, useUpdatePlace } from "@/apis/place/PlaceApi.mutation";
import { ModalWithCategory } from "@/components/common/Modal/ModalWithCategory";
import InputWithEditImage from "../../_components/InputWithEditImage";

const EditPlaceDetail: React.FC = () => {
  const router = useRouter();
  const methods = useAddPlaceDetailForm();
  const [placeInfo, setPlaceInfo] = useState<PlaceResponseDto | null>(null);
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const roomUid = searchParams.get("roomUid") || "";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categoryList, selectedPlaceInfo, setSelectedPlaceInfo } =
    useCourseContext();

  const handleLeftButtonClick = () => {
    setIsModalOpen(false);
  };
  const handleRightButtonClick = () => {
    deletePlaceInfo();
    setIsModalOpen(false);
  };

  const { mutate: updatePlaceMutate } = useUpdatePlace({
    options: {
      onSuccess: () => {
        router.back();
      },
      onError: (error) => {
        console.error("장소 수정 실패:", error);
      },
    },
  });

  const { mutate: DeletePlaceMutate } = useDeletePlace({
    options: {
      onSuccess: () => {
        router.back();
      },
      onError: (error) => {
        console.error("장소 삭제 실패:", error);
      },
    },
  });

  const updatePlaceInfo = (_placeInfo: PlaceResponseDto) => {
    setPlaceInfo(_placeInfo);
  };

  const deletePlaceInfo = () => {
    if (selectedPlaceInfo) {
      DeletePlaceMutate({
        roomUid,
        placeId: selectedPlaceInfo.id,
      });
    }
  };

  useEffect(() => {
    if (selectedPlaceInfo !== null) {
      setSelectedChip(selectedPlaceInfo.scheduleId);
      updatePlaceInfo(selectedPlaceInfo);
    }
  }, [selectedPlaceInfo]);

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  useEffect(() => {
    if (selectedPlaceInfo) {
      console.log(selectedPlaceInfo, "selectedPlaceInfo?");
      const { name, url, address, phoneNumber, memo, openingHours } =
        selectedPlaceInfo || {};
      const initialImages = selectedPlaceInfo.placeImageUrls.contents || [];
      methods.setValue("pictures", initialImages);
      methods.setValue("name", name);
      methods.setValue("url", url);
      methods.setValue("address", address);
      methods.setValue("phoneNumber", phoneNumber);
      methods.setValue("memo", memo);
      methods.setValue("openingHours", openingHours);
    }
  }, [selectedPlaceInfo]);

  const onCompleteButtonClick = async () => {
    const values = methods.getValues();
    console.log("values", values);
    if (!values.name || !selectedChip || !selectedPlaceInfo) {
      return;
    }

    const deleteTargetUrls = methods.getValues("deletedPictures");

    const newPlaceImages =
      values.pictures && Array.isArray(values.pictures)
        ? values.pictures.filter((file): file is File => file instanceof File)
        : [];

    const payload: ModifyPlaceRequestDto = {
      scheduleId: selectedPlaceInfo.scheduleId as number,
      name: values.name ? values.name : selectedPlaceInfo.name,
      url: values.url ? values.url : "-",
      address: values.address ? values.address : "-",
      phoneNumber: values.phoneNumber ? values.phoneNumber : "-",
      starGrade: values.starGrade ? values.starGrade : 0,
      reviewCount: values.reviewCount ? values.reviewCount : 0,
      memo: values.memo ? values.memo : "-",
      openingHours: values.openingHours ? values.openingHours : "-",
      voteLikeCount: 0,
      voteDislikeCount: 0,
      longitude: 0,
      latitude: 0,
      deleteTargetUrls: deleteTargetUrls ?? [],
    };

    updatePlaceMutate({
      roomUid,
      placeId: selectedPlaceInfo.id as number,
      payload: {
        modifyPlaceRequest: payload,
        newPlaceImages,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-y-[56px]">
        <NavigationBar
          leftSlot={
            <div
              className="flex py-[16px] px-[12px] cursor-pointer "
              onClick={() => router.back()}
            >
              <Image
                src="/png/ic_arrow_left_24.png"
                alt="ic_arrow_left_24.png"
                width={24}
                height={24}
              />
              <p className="flex items-center text-semibold-15 text-neutral-700">
                장소 수정하기
              </p>
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
            <div className="flex flex-row w-[252px] gap-x-[8px] mt-[12px]">
              {categoryList?.map(
                (item) =>
                  item.scheduleId !== null &&
                  item.scheduleId !== undefined &&
                  item.name && (
                    <CategoryChip
                      key={item.scheduleId}
                      title={item.name}
                      selected={selectedChip === item.scheduleId}
                      onClick={() => handleChipClick(item.scheduleId as number)}
                    />
                  )
              )}
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-y-[32px]">
            {selectedPlaceInfo?.origin == "AVOCADO" ||
            selectedPlaceInfo?.origin == "LEMON" ? (
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
                <div className="flex flex-col gap-y-[12px]">
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
                      {...methods.register("name")}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <InputWithEditImage
                      id="picture"
                      type="file"
                      onFilesChange={(formData) => {
                        const files = Array.from(
                          formData.getAll("placeImageUrls")
                        );
                        methods.setValue(
                          "pictures",
                          files.filter(
                            (file): file is File => file instanceof File
                          )
                        );
                      }}
                      onDeleteImageUrlsChange={(deleteImageUrls) => {
                        methods.setValue("deletedPictures", deleteImageUrls);
                      }}
                      multiple
                      initialImages={selectedPlaceInfo?.placeImageUrls.contents}
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
            <div className="flex rounded-[28px] mx-auto flex-row items-center justify-center w-[113px] h-[41px] bg-[#FEF1F2] text-[#FF5B5B] jutsity-center mt-[8px] mb-[32px]">
              <button
                className="flex flex-row gap-x-[8px] items-center justify-center"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={"/png/ic_bin_20.png"}
                  alt="bin"
                  width={20}
                  height={20}
                />
                <p className="text-[14px] font-semibold">삭제하기</p>
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && selectedPlaceInfo && (
          <ModalWithCategory
            modalText={
              <>
                &apos;{selectedPlaceInfo.name}&apos;
                <br />
                정말 삭제하시겠어요?
              </>
            }
            onLeftButtonText="취소"
            onRightButtonText="확인"
            onLeftButtonClick={handleLeftButtonClick}
            onRightButtonClick={handleRightButtonClick}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default EditPlaceDetail;
