import { Size } from "@/model";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SMALL_CARD_SIZE_CLASS = "w-[268px] " as const;
export const LARGE_CARD_SIZE_CLASS = "w-[335px] h-[372px]" as const;
export const SMALL_IMAGE_SIZE_CLASS = 96 as const;
export const LARGE_IMAGE_SIZE_CLASS = 120 as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//CardWithImage(Large) - size에 따른 카드 및 이미지 크기 계산
export const getSizeClasses = (size: Size) => {
  const isSmall = size === Size.small;
  const cardSizeClass = isSmall ? SMALL_CARD_SIZE_CLASS : LARGE_CARD_SIZE_CLASS;
  const imageSize = isSmall ? SMALL_IMAGE_SIZE_CLASS : LARGE_IMAGE_SIZE_CLASS;

  return { cardSizeClass, imageSize };
};
