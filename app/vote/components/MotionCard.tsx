"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { SwipeDirection } from "../model";
import Image from "next/image";

interface Props {
  index: number;
  onCardSwipe: (direction: SwipeDirection) => void;
  data: any;
}

const variants = {
  initial: { y: 0, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: (custom: { exitX: number; exitY: number }) => ({
    x: custom.exitX,
    y: custom.exitX ? 0 : custom.exitY,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export default function MotionCard({ index, onCardSwipe, data }: Props) {
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const y = useTransform(x, [-250, 0, 250], [-30, 0, -30]);

  const rotate = useTransform(x, [-250, 0, 250], [15, 0, -15], {
    clamp: false,
  });

  const opacity = useTransform(x, [-250, 0, 250], [1, 0, 1]);

  function handleDragEnd(_: any, info: { offset: { x: number } }) {
    if (info.offset.x < -50) {
      setExitX(-250);
      onCardSwipe(SwipeDirection.LEFT);
    }

    if (info.offset.x > 50) {
      setExitX(250);
      onCardSwipe(SwipeDirection.RIGHT);
    }
  }

  if (!data) return <></>;

  return (
    <motion.div
      className="w-[335px] h-[372px] bg-primary-150 rounded-lg flex justify-center items-center absolute top-[20px]"
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      custom={{
        exitX,
        exitY: 100,
      }}
      drag="x"
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      variants={variants}
      style={{
        x,
        y,
        rotate,
        zIndex: 500 - index,
        backgroundColor: `hsl(${index * 50}, 100%, 50%)`,
      }}
      whileHover={{ cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
      whileDrag={{ cursor: "grabbing" }}
    >
      카드
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black rounded-lg"
        style={{ opacity }}
      ></motion.div>
    </motion.div>
  );
}
