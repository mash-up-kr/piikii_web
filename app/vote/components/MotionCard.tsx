"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { SwipeDirection } from "../model";
import Image from "next/image";
import { Z_INDEX } from "@/lib/constants";
import CardWithImage from "@/components/common/Cards/CardWithImage";
import { get } from "http";

interface Props {
  index: number;
  direction: SwipeDirection | null;
  data: any;
  onSwipeCard: (direction: SwipeDirection) => void;
  hideShadow: boolean;
}

const variants = {
  initial: { y: 0, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: (custom: { exitX: number; exitY: number }) => ({
    x: custom.exitX,
    y: custom.exitY,
    opacity: 0,
    transition: { duration: custom.exitX ? 0.3 : 0.6, ease: "easeIn" },
  }),
};

export default function MotionCard({
  index,
  direction,
  onSwipeCard,
  data,
  hideShadow,
}: Props) {
  const x = useMotionValue(0);
  const y = useTransform(x, [-250, 0, 250], [-30, 0, -30]);

  const rotate = useTransform(x, [-250, 0, 250], [15, 0, -15], {
    clamp: false,
  });

  const swipeLeftCardOpacity = useTransform(x, [-100, 0, 100], [1, 0, 0]);
  const swipeRightCardOpacity = useTransform(x, [-100, 0, 100], [0, 0, 1]);

  const swipeCardOverlayOpacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const exitX = useMemo(() => {
    if (direction === SwipeDirection.LEFT) return -250;
    if (direction === SwipeDirection.RIGHT) return 250;
    return 0;
  }, [direction]);

  const exitY = useMemo(() => {
    if (direction === SwipeDirection.UP) return -800;
    return 0;
  }, [direction]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      onSwipeCard(SwipeDirection.LEFT);
    }

    if (info.offset.x > 50) {
      onSwipeCard(SwipeDirection.RIGHT);
    }
  };

  if (!data) return <></>;

  return (
    <>
      {/* Background Overlay */}
      <motion.div
        layout
        className="w-[335px] h-[372px] rounded-[20px] flex justify-center items-center absolute top-[24px] bg-primary-100"
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        style={{
          opacity: swipeCardOverlayOpacity,
          zIndex: Z_INDEX.MOTION_CARD - index - 1, // NOTE: 카드 보다 바로 뒤에 위치
        }}
      />

      {/* Main Motion Card Component */}
      <motion.div
        key={index}
        className="w-[335px] h-[372px] rounded-[20px] flex justify-center items-center absolute top-[24px]"
        layout
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{
          exitX,
          exitY,
        }}
        drag="x"
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onDragEnd={handleDragEnd}
        variants={variants}
        style={{
          x,
          y,
          rotate,
          zIndex: Z_INDEX.MOTION_CARD - index,
        }}
        whileHover={{ cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
        whileDrag={{ cursor: "grabbing" }}
      >
        <CardWithImage
          place={data.name}
          rating={data.rating.toString()}
          reviewCount={100}
          images={data.images}
          info={[
            { label: "음식", value: "한식" },
            { label: "가격대", value: "만원 미만" },
            { label: "위치", value: "강남역" },
          ]}
          noShadow={hideShadow}
        />

        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-neutral-0 rounded-[20px] flex justify-center items-center"
          style={{ opacity: swipeRightCardOpacity }}
        >
          <Image
            src="/png/img_like_120.png"
            width={120}
            height={120}
            alt="like-image"
            className="pointer-events-none"
          />
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-neutral-0 rounded-[20px] flex justify-center items-center"
          style={{ opacity: swipeLeftCardOpacity }}
        >
          <Image
            src="/png/img_dislike_120.png"
            width={120}
            height={120}
            alt="like-image"
            className="pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </>
  );
}
