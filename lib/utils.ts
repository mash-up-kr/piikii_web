import { Size } from "@/interface";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//CardWithImage(Large) - size에 따른 카드 및 이미지 크기 계산
export const getSizeClasses = (size: Size) => {
  const isSmall = size === Size.Small;
  const cardSizeClass = isSmall ? "w-[268px] h-[298px]" : "w-[335px] h-[372px]";
  const imageSize = isSmall ? 96 : 120;

  return { cardSizeClass, imageSize };
};
