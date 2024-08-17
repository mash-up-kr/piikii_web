"use client";

import { useCallback, useEffect, useState } from "react";
import MotionCard from "./MotionCard";
import { AnimatePresence, motion } from "framer-motion";
import {
  CategoryChoiceState,
  ColorTheme,
  PlaceOption,
  SwipeDirection,
  VoteType,
} from "../model";
import MotionCardActionButtons from "./MotionCardActionButtons";

interface Props {
  voteType: VoteType;
  optionList: PlaceOption[];
  colorTheme: ColorTheme;
  onUpdateOption: (option: any) => void;
}

type SwipedCount = number;
type SwipeState = [SwipeDirection, SwipedCount];

export default function MotionCardContainer({
  voteType,
  optionList,
  colorTheme,
  onUpdateOption,
}: Props) {
  const [swipedDirection, setSwipedDirection] = useState<SwipeState>([
    SwipeDirection.NONE,
    0,
  ]);

  const [curCardIndex, setCurCardIndex] = useState(0);

  const handleSwipeCard = useCallback(
    (index: number, direction: SwipeDirection) => {
      setSwipedDirection((prev) => [direction, prev[1] + 1]);

      onUpdateOption({
        ...optionList[index],
        state:
          direction === SwipeDirection.LEFT
            ? CategoryChoiceState.DISLIKE
            : direction === SwipeDirection.RIGHT
            ? CategoryChoiceState.LIKE
            : CategoryChoiceState.HOLD,
      });
    },
    [onUpdateOption, optionList]
  );

  useEffect(() => {
    if (swipedDirection[0] === SwipeDirection.NONE) return;

    setCurCardIndex((prev) => prev + 1);
  }, [swipedDirection]);

  return (
    <AnimatePresence>
      <motion.div
        key={`motion-card-container-${voteType}`}
        layout
        initial={{ opacity: 0, y: voteType === VoteType.VOTE_HOLD ? -100 : 0 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        className="flex h-[430px] w-full justify-center pt-[24px] pb-[32px] relative"
      >
        {curCardIndex <= optionList.length && (
          <AnimatePresence>
            <MotionCard
              key={`${curCardIndex + 1}`}
              index={curCardIndex + 1}
              direction={swipedDirection[0]}
              onSwipeCard={(direction) =>
                handleSwipeCard(curCardIndex + 1, direction)
              }
              data={
                optionList.find(
                  (option) => option.index === curCardIndex + 1
                ) ?? null
              }
              hideShadow={false}
            />
            <MotionCard
              key={curCardIndex}
              index={curCardIndex}
              direction={swipedDirection[0]}
              onSwipeCard={(direction) =>
                handleSwipeCard(curCardIndex, direction)
              }
              data={
                optionList.find((option) => option.index === curCardIndex) ??
                null
              }
              hideShadow={true}
            />
          </AnimatePresence>
        )}
      </motion.div>

      {/* Action Buttons */}
      <MotionCardActionButtons
        voteType={voteType}
        colorTheme={colorTheme}
        onClickButton={(direction) => handleSwipeCard(curCardIndex, direction)}
      />
    </AnimatePresence>
  );
}
