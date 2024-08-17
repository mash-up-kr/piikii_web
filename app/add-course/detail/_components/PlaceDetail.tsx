"use client";

import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import { CategoryChip } from "../../_components/CategoryChip";
import { InputWithLabel } from "../../_components/InputWithLabel";
import { CardWithAutoCompleteData } from "@/components/common/Cards/CardWithAutoCompleteData";
import { InputWithImage } from "../../_components/InputWithImage";
import { useRouter, useSearchParams } from "next/navigation";
import { useCourseContext } from "@/providers/course-provider";
import { AddPlaceRequestDto } from "@/apis/place/types/dto";
import { useEffect, useState } from "react";
import placeApi from "@/apis/place/PlaceApi";
import { categoryImageMap } from "@/lib/utils";

const PlaceDetail: React.FC = () => {
  const router = useRouter();
  const [placeName, setPlaceName] = useState("");
  const [url, setUrl] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [pictures, setPictures] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const roomUid = searchParams.get("roomUid") || "";
  const { categoryList, isClipboardText, setIsClipboardText, autoPlaceInfo } =
    useCourseContext();

  const handleChipClick = (index: number) => {
    setSelectedChip(index === selectedChip ? null : index);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= 50) {
        setter(e.target.value);
      }
    };

  const selectedCategory = categoryList?.find(
    (category) => category.scheduleId === selectedChip
  );

  useEffect(() => {
    if (autoPlaceInfo && autoPlaceInfo[0]) {
      setPlaceName(autoPlaceInfo[0].name);
    }
  }, [autoPlaceInfo]);

  const onCompleteButtonClick = async () => {
    if (!placeName || !selectedChip || !selectedCategory) {
      return;
    }
    const defaultImage = categoryImageMap[selectedCategory.name];

    const payload: AddPlaceRequestDto = {
      scheduleId: selectedCategory.scheduleId as number,
      type: selectedCategory.name,
      name:
        autoPlaceInfo && autoPlaceInfo[0] ? autoPlaceInfo[0].name : placeName,
      url:
        autoPlaceInfo && autoPlaceInfo[0] ? autoPlaceInfo[0].url : url || "-",
      address: address || "-",
      phoneNumber:
        autoPlaceInfo && autoPlaceInfo[0]
          ? autoPlaceInfo[0].phoneNumber
          : phoneNumber
          ? phoneNumber
          : "-",
      starGrade:
        autoPlaceInfo && autoPlaceInfo[0] ? autoPlaceInfo[0].starGrade : 0,
      memo: memoContent || "-",
      voteLikeCount: 0,
      voteDislikeCount: 0,
      longitude: 0,
      latitude: 0,
    };

    try {
      const response = await placeApi.createPlace({
        roomUid,
        payload: {
          addPlaceRequest: payload,
          placeImages: pictures.length > 0 ? pictures : [defaultImage],
        },
      });

      console.log("장소 생성 성공", response);
      router.push("/add-course");
    } catch (error) {
      console.error("장소 생성 실패:", error, payload, selectedCategory);
    }
  };
  return (
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
            <p
              className="text-semibold-15 text-neutral-700"
              onClick={() => setIsClipboardText(false)}
            >
              장소 추가하기
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
          <div className="w-[120px] h-[21px] font-medium text-[14px] text-[#23272F] opacity-[0.5] mb-[12px]">
            여러 개 선택 가능해요
          </div>
          <div className="flex flex-row w-[252px] h-[98px] gap-x-[8px]">
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
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
              />
              <CardWithAutoCompleteData />
            </div>
          ) : (
            <div className="gap-y-[32px] flex flex-col">
              <div className="flex flex-col gap-y-[12px]">
                <div className="flex flex-row items-center w-[90px] h-[24px] gap-x-[6px]">
                  <p className="w-[59px] font-bold text-[#292E31] text-[16px]">
                    장소 이름
                  </p>
                  <p className="w-[25px] font-bold text-[#FF601C] text-[14px]">
                    필수
                  </p>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <InputWithLabel
                    type="text"
                    placeholder="상호명을 적어주세요"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <InputWithImage
                    className="w-[80px] h-[80px]"
                    id="picture"
                    type="file"
                    onFilesChange={setPictures}
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
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
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
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                />
                <InputWithLabel
                  type="link"
                  placeholder="주소를 남겨주세요"
                  iconSrc="/svg/ic_pin_location_mono.svg"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <InputWithLabel
                  type="link"
                  placeholder="전화번호를 남겨주세요"
                  iconSrc="/svg/ic_call_mono.svg"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  value={memoContent}
                  onChange={(e) => setMemoContent(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
