"use client";

import { useCallback, useEffect, useState } from "react";
import MotionCard from "./MotionCard";
import { AnimatePresence } from "framer-motion";
import { SwipeDirection } from "../model";
import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { cn } from "@/lib/utils";
import MotionCardActionButtons from "./MotionCardActionButtons";

interface Props {
  cardList: any[];
  onUpdateCardList: (cardList: any[]) => void;
}

type SwipedCount = number;
type SwipeState = [SwipeDirection, SwipedCount];

export default function MotionCardContainer({
  cardList,
  onUpdateCardList,
}: Props) {
  const [swipedDirection, setSwipedDirection] = useState<SwipeState>([
    SwipeDirection.NONE,
    0,
  ]);

  const [curCardIndex, setCurCardIndex] = useState(0);

  const handleSwipeCard = useCallback((direction: SwipeDirection) => {
    setSwipedDirection((prev) => [direction, prev[1] + 1]);
  }, []);

  useEffect(() => {
    if (swipedDirection[0] === SwipeDirection.NONE) return;

    setCurCardIndex((prev) => prev + 1);
  }, [swipedDirection]);

  return (
    <>
      <div className="flex h-[430px] w-full justify-center pt-[24px] pb-[32px] relative">
        {curCardIndex <= cardList.length && (
          <AnimatePresence initial={false}>
            <MotionCard
              key={curCardIndex + 1}
              index={curCardIndex + 1}
              direction={swipedDirection[0]}
              onSwipeCard={handleSwipeCard}
              data={cardList[curCardIndex + 1] ?? null}
              hideShadow={false}
            />
            <MotionCard
              key={curCardIndex}
              index={curCardIndex}
              direction={swipedDirection[0]}
              onSwipeCard={handleSwipeCard}
              data={cardList[curCardIndex] ?? null}
              hideShadow={true}
            />
          </AnimatePresence>
        )}
      </div>

      {/* Action Buttons */}
      <MotionCardActionButtons
        onClickButton={(direction) => handleSwipeCard(direction)}
      />
    </>
  );
}
