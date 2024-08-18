"use client";

import React from "react";
import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Image from "next/image";
import Title from "@/components/common/Title";
import CourseItem from "./_components/CourseItem";
import { useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import useRoomUid from "@/hooks/useRoomUid";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { useGetCourseQuery } from "@/apis/course/CourseApi.query";
import useShare from "@/hooks/useShare";

const VoteFinishPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const roomUid = useRoomUid();
  const { onShare } = useShare();

  const {
    data: courseData,
    isLoading: isCourseDataLoading,
    isError: isCourseDataError,
  } = useGetCourseQuery({
    variables: roomUid ?? "",
    options: { enabled: !!roomUid },
  });

  if (!isClient || isCourseDataLoading || isCourseDataError || !courseData)
    return <FullScreenLoader label={`가장 적합한 코스를\n만들고 있어요`} />;

  return (
    <div>
      <NavigationBar
        className="pr-[24px] pl-[40px]"
        title="코스 추천"
        rightSlot={
          <button
            className="flex justify-center items-center"
            onClick={async () =>
              await onShare({
                url: `${window.location.origin}/vote-finish?roomUid=${roomUid}`,
                title: courseData.data.roomName,
                text: `투표 결과로 만들어진 ‘${courseData.data.roomName}’ 모임 코스를 확인해보세요`,
              })
            }
          >
            <Image
              src={"/svg/ic_wrap_gray.svg"}
              alt="wrap"
              width={16}
              height={16}
            />
          </button>
        }
      />

      <div className="flex flex-col pt-[56px]">
        <div className="px-[20px]">
          <Title
            title={
              <span className="text-neutral-600 text-regular-15">
                {courseData.data.roomName} 팀
              </span>
            }
            titleClassName="leading-[1]"
            subtitle={
              <span className="text-bold-22 text-neutral-900">
                적합한 코스를 만들었어요
              </span>
            }
          />
        </div>

        <div className="flex flex-col pt-[40px] px-[20px]">
          {/* SAMPLE DATA */}
          {courseData.data.places.map((place, index) => (
            <CourseItem
              id="course"
              key={index}
              index={index}
              type="food"
              placeTitle={place.name}
              placeContact={place.phoneNumber}
              placeAddress={place.address}
              distanceToNextLocation={place.distance}
            />
          ))}
        </div>

        <div className="px-[20px] mt-[64px] mb-[24px]">
          <Image
            src="/png/vote-finish-banner.png"
            alt="banner"
            width={335}
            height={120}
            className="w-full cursor-pointer"
            unoptimized
            onClick={() => router.push("/vote-finish/result")}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteFinishPage;
