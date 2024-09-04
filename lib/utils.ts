import {
  ColumnsType,
  ValueType,
} from "@/app/edit-category/_components/DragAndDropArea";
import { Size } from "@/model";
import {
  BadgeInfoType,
  BadgeMapType,
  BadgeType,
} from "@/providers/badge-provider";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const SMALL_CARD_SIZE_CLASS = "w-[268px] h-[298px]" as const;
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

export const flattenColumns = (columns: ColumnsType): ValueType[] => {
  return Object.values(columns.course.list).flat();
};

export const iconInfo = [
  { icon: "🍔", label: "음식", type: "DISH" },
  { icon: "🥨", label: "디저트", type: "DESSERT" },
  { icon: "🍺", label: "술", type: "ALCOHOL" },
  { icon: "🕹️", label: "놀거리", type: "ARCADE" },
];

export const categoryImageMap: { [key: string]: string } = {
  DISH: "/png/default_food.png",
  DESSERT: "/png/default_dessert.png",
  ALCOHOL: "/png/default_alcohol.png",
  ARCADE: "/png/default_arcade.png",
};

export const createFileFromImagePath = async (
  imagePath: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
};
