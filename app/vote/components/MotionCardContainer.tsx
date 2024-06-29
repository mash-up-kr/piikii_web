"use client";

import { useCallback, useState } from "react";
import MotionCard from "./MotionCard";
import { AnimatePresence } from "framer-motion";
import { SwipeDirection } from "../model";

interface Props {
  cardList: any[];
  onUpdateCardList: (cardList: any[]) => void;
}

export default function MotionCardContainer({ cardList }: Props) {
  const [curIndex, setCurIndex] = useState(0);

  const handleSwipeCard = useCallback(
    (direction: SwipeDirection) => {
      setCurIndex(curIndex + 1);
    },
    [curIndex]
  );

  return (
    <div className="flex h-[450px] justify-center pt-[20px] relative overflow-x-hidden">
      {curIndex <= cardList.length && (
        <AnimatePresence initial={false}>
          <MotionCard
            key={curIndex + 2}
            index={curIndex + 2}
            onSwipeCard={handleSwipeCard}
            data={cardList[curIndex + 2] ?? null}
            hideShadow={false}
          />
          <MotionCard
            key={curIndex + 1}
            index={curIndex + 1}
            onSwipeCard={handleSwipeCard}
            data={cardList[curIndex + 1] ?? null}
            hideShadow={true}
          />
          <MotionCard
            key={curIndex}
            index={curIndex}
            onSwipeCard={handleSwipeCard}
            data={cardList[curIndex] ?? null}
            hideShadow={true}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
