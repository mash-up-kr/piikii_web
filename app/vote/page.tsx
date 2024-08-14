"use client";

import Step from "@/components/common/Step";
import MotionCardContainer from "./components/MotionCardContainer";
import Title from "@/components/common/Title";
import { useEffect, useMemo, useState } from "react";
import { Z_INDEX } from "@/lib/constants";
import {
  CategoryChoiceState,
  PlaceOption,
  PlaceVoteResult,
  VoteType,
} from "./model";
import HoldingOptionAvatarList from "./components/HoldingOptionAvatarList";
import OnboardingOverlay from "./components/OnboardingOverlay";
import { useGetPlacesQuery } from "@/apis/place/PlaceApi.query";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { useIsClient } from "usehooks-ts";
import useRoomUid from "@/hooks/useRoomUid";
import { useRouter } from "next/navigation";
import { useCastVote } from "@/apis/vote/VoteApi.mutation";
import useUserUid from "@/hooks/useUserUid";
import { VoteCastResultDto, VoteSaveRequestDto } from "@/apis/vote/types/dto";

export default function Page() {
  const router = useRouter();
  const isClient = useIsClient();
  const roomUid = useRoomUid();
  const userUid = useUserUid();

  const {
    data: placeData,
    isLoading,
    isError,
  } = useGetPlacesQuery({
    variables: {
      roomUid: roomUid ?? "",
    },
    options: { enabled: !!roomUid },
  });

  const { mutate: castVote } = useCastVote({
    options: {
      onSuccess: (data) => {
        console.log("onSuccess", data);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    },
  });

  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(true);
  const [curScheduleIndex, setCurStageIndex] = useState<number>(0);

  const [resultData, setResultData] = useState<PlaceVoteResult>({
    likeList: [],
    dislikeList: [],
    holdList: [],
  });

  const resultDataLen = useMemo(
    () =>
      resultData.likeList.length +
      resultData.dislikeList.length +
      resultData.holdList.length,
    [resultData]
  );

  const [tempHoldOptions, setTempHoldOptions] = useState<PlaceOption[]>([]);
  const [tempPendingOptions, setTempPendingOptions] = useState<PlaceOption[]>(
    []
  );

  const voteState = useMemo(() => {
    const pendingOptionsLen = tempPendingOptions.length;

    if (pendingOptionsLen === 0 && resultDataLen === 0) {
      return VoteType.VOTE_PENDING;
    }

    if (resultDataLen !== pendingOptionsLen) {
      return VoteType.VOTE_PENDING;
    } else if (
      resultDataLen === pendingOptionsLen &&
      resultData.holdList.length > 0
    ) {
      return VoteType.VOTE_HOLD;
    } else if (
      resultDataLen === pendingOptionsLen &&
      resultData.holdList.length === 0
    ) {
      return VoteType.VOTE_DONE;
    }

    return VoteType.NONE;
  }, [resultData.holdList.length, resultDataLen, tempPendingOptions.length]);

  // Handlers
  const handleUpdatePendingOption = (nextOption: any) => {
    if (nextOption.state === CategoryChoiceState.LIKE) {
      setResultData((prev: any) => ({
        ...prev,
        likeList: [...prev.likeList, nextOption],
      }));
    }

    if (nextOption.state === CategoryChoiceState.DISLIKE) {
      setResultData((prev: any) => ({
        ...prev,
        dislikeList: [...prev.dislikeList, nextOption],
      }));
    }

    if (nextOption.state === CategoryChoiceState.HOLD) {
      setResultData((prev: any) => ({
        ...prev,
        holdList: [...prev.holdList, nextOption],
      }));

      setTempHoldOptions((prev) =>
        [...prev, nextOption].map((option, index) => ({
          ...option,
          index,
        }))
      );
    }
  };

  const handleUpdateHoldOption = (nextOption: any) => {
    const updatedHoldList = resultData.holdList.filter(
      (option: any) => option.id !== nextOption.id
    );

    if (nextOption.state === CategoryChoiceState.LIKE) {
      setResultData((prev: any) => ({
        ...prev,
        holdList: updatedHoldList,
        likeList: [...prev.likeList, nextOption],
      }));
    }

    if (nextOption.state === CategoryChoiceState.DISLIKE) {
      setResultData((prev: any) => ({
        ...prev,
        holdList: updatedHoldList,
        dislikeList: [...prev.dislikeList, nextOption],
      }));
    }
  };

  useEffect(() => {
    if (!userUid || !roomUid) {
      router.replace("/vote-start");
    }
  }, [roomUid, router, userUid]);

  useEffect(() => {
    const handleCastVote = async (
      roomUid: string,
      payload: VoteSaveRequestDto
    ) => {
      castVote({
        roomUid,
        payload,
      });
    };

    if (!placeData || !roomUid || !userUid) return;

    if (voteState === VoteType.VOTE_DONE) {
      const votes = [
        ...resultData.dislikeList.map((option) => ({
          placeId: option.id,
          voteResult: "DISAGREE" as VoteCastResultDto,
        })),
        ...resultData.likeList.map((option) => ({
          placeId: option.id,
          voteResult: "AGREE" as VoteCastResultDto,
        })),
      ];

      // NOTE: to be removed
      console.log("VOTE DONE", {
        resultData,
        payloadData: {
          roomUid,
          payload: {
            userUid,
            votes,
          },
        },
      });

      handleCastVote(roomUid, {
        userUid,
        votes,
      });

      setResultData({
        likeList: [],
        dislikeList: [],
        holdList: [],
      });

      setTempHoldOptions([]);

      if (placeData.length - 1 === curScheduleIndex) {
        router.push("/vote-progress");
      } else {
        setCurStageIndex((prev) => prev + 1);
      }
    }
  }, [
    castVote,
    curScheduleIndex,
    placeData,
    resultData,
    roomUid,
    router,
    userUid,
    voteState,
  ]);

  useEffect(() => {
    if (placeData) {
      setTempPendingOptions(
        placeData[curScheduleIndex].places.map((place, index) => ({
          ...place,
          state: CategoryChoiceState.PENDING,
          index,
        }))
      );
    }
  }, [curScheduleIndex, placeData]);

  if (isLoading || isError || !isClient || !placeData)
    return <FullScreenLoader />;

  return (
    <div className="h-dvh bg-primary-100 pt-[8px] flex flex-col justify-start relative">
      {/* Header */}
      <div className="relative px-[20px]" style={{ zIndex: Z_INDEX.HEADER }}>
        {/* Step */}
        <Step curStep={curScheduleIndex} totalSteps={placeData.length} />

        <div className="h-[77px] flex items-start mt-[31px]">
          {/* Title */}
          {resultData.holdList.length === 0 ? (
            <Title
              title={
                <span className="text-neutral-700">
                  <span className="text-primary-700">
                    {placeData[curScheduleIndex].scheduleName}
                  </span>
                  을 투표해주세요
                </span>
              }
              titleClassName="text-black-22"
              subtitle="카드를 좌우로 밀어보세요"
              subtitleClassName="text-neutral-600"
            />
          ) : (
            /**
             * NOTE: 홀드된 아이템이 있을 경우 홀드된 아이템 리스트를 보여준다
             * - resultData.holdList와 tempHoldList는 다른 용도로 사용이 됌
             */
            <HoldingOptionAvatarList list={resultData.holdList} />
          )}
        </div>
      </div>

      {/* Card Section */}
      <div className="flex justify-center items-center w-full flex-col">
        {/* Vote Pending Cards */}
        {voteState === VoteType.VOTE_PENDING && (
          <MotionCardContainer
            voteType={VoteType.VOTE_PENDING}
            optionList={tempPendingOptions}
            onUpdateOption={handleUpdatePendingOption}
          />
        )}

        {/* Vote Hold Cards */}
        {voteState === VoteType.VOTE_HOLD && (
          <MotionCardContainer
            voteType={VoteType.VOTE_HOLD}
            optionList={tempHoldOptions}
            onUpdateOption={handleUpdateHoldOption}
          />
        )}
      </div>

      {/* Onboarding Overlay */}
      {isOverlayVisible && (
        <OnboardingOverlay onStartVote={() => setIsOverlayVisible(false)} />
      )}
    </div>
  );
}
