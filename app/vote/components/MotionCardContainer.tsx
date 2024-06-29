"use client";

import { useCallback, useState } from "react";
import MotionCard from "./MotionCard";
import { AnimatePresence } from "framer-motion";
import { SwipeDirection } from "../model";

const TEMP_CARD_LIST = [1, 2, 3, 4, 5];

export default function MotionCardContainer() {
  const [curIndex, setCurIndex] = useState(0);

  const handleCardSwipe = useCallback(
    (direction: SwipeDirection) => {
      setCurIndex(curIndex + 1);
    },
    [curIndex]
  );

  return (
    <div className="flex h-[450px] justify-center pt-[20px] relative overflow-x-hidden">
      {curIndex <= TEMP_CARD_LIST.length && (
        <AnimatePresence initial={false}>
          <MotionCard
            key={curIndex + 2}
            index={curIndex + 2}
            onCardSwipe={handleCardSwipe}
            data={TEMP_CARD_LIST[curIndex + 2] ?? null}
          />
          <MotionCard
            key={curIndex + 1}
            index={curIndex + 1}
            onCardSwipe={handleCardSwipe}
            data={TEMP_CARD_LIST[curIndex + 1] ?? null}
          />
          <MotionCard
            key={curIndex}
            index={curIndex}
            onCardSwipe={handleCardSwipe}
            data={TEMP_CARD_LIST[curIndex] ?? null}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
