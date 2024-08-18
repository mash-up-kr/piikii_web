import { PlaceResponseDto } from "@/apis/place/types/dto";
import { ScheduleType } from "@/apis/schedule/types/model";
import { Z_INDEX } from "@/lib/constants";
import { ClassValue } from "clsx";

export enum SwipeDirection {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  NONE = "none",
}

export enum CategoryChoiceState {
  LIKE = "like",
  DISLIKE = "dislike",
  HOLD = "hold",
  PENDING = "pending",
}

export enum VoteType {
  VOTE_PENDING = "pending",
  VOTE_HOLD = "hold",
  VOTE_DONE = "done",
  NONE = "none",
}

export interface PlaceOption extends PlaceResponseDto {
  state: CategoryChoiceState;
  index: number;
}

export interface PlaceVoteResult {
  likeList: PlaceOption[];
  dislikeList: PlaceOption[];
  holdList: PlaceOption[];
}

export interface ColorTheme {
  classname: {
    bgActive: ClassValue;
    bgInactive: ClassValue;
    textActive: ClassValue;
    avatarImg: ClassValue;
  };
  style: {
    background: string;
    buttonBoxShadow: string;
    avatarImgZIndex: number;
  };
  img: {
    avatarUrl: string;
  };
}

export const VoteColorTheme: Record<ScheduleType, ColorTheme> = {
  DISH: {
    classname: {
      bgActive: "bg-primary-700",
      bgInactive: "bg-primary-200",
      textActive: "text-primary-700",
      avatarImg: "absolute w-[140px] h-[108px] right-[24px] top-[45px]",
    },
    style: {
      background:
        "linear-gradient(180deg, #FFE6DC 42.74%, #FDC6AE 69.6%, #F8AC8B 78.91%)",
      buttonBoxShadow: "0px 5px 10px 0px #CE9983, 0px 0px 60px 0px #E58A64",
      avatarImgZIndex: Z_INDEX.BACKGROUND,
    },
    img: {
      avatarUrl: "/png/dish-avatar.png",
    },
  },
  DESSERT: {
    classname: {
      bgActive: "bg-[#BF37FF] bg-opacity-[0.8]",
      bgInactive: "bg-[#BF37FF] bg-opacity-[0.1]",
      textActive: "text-[#BF37FF]",
      avatarImg: "absolute w-[140px] h-[108px] right-[24px] top-[45px]",
    },
    style: {
      background:
        "linear-gradient(180deg, #F7E5FF 42.74%, #DAB3EC 69.6%, #D4AAE7 78.91%)",
      buttonBoxShadow: "0px 5px 10px 0px #B683CE, 0px 0px 60px 0px #BD81D9",
      avatarImgZIndex: Z_INDEX.AVATAR_BACKGROUND,
    },
    img: {
      avatarUrl: "/png/dessert-avatar.png",
    },
  },
  ALCOHOL: {
    classname: {
      bgActive: "bg-[#009CF3] bg-opacity-[0.8]",
      bgInactive: "bg-[#009CF3] bg-opacity-[0.1]",
      textActive: "text-[#009CF3]",
      avatarImg: "absolute w-[140px] h-[108px] right-[24px] top-[45px]",
    },
    style: {
      background:
        "linear-gradient(180deg, #E5F5FF 42.74%, #A0D1ED 69.6%, #9DD2F1 78.91%)",
      buttonBoxShadow: "0px 5px 10px 0px #83B2CE, 0px 0px 60px 0px #6EB4DC",
      avatarImgZIndex: Z_INDEX.BACKGROUND,
    },
    img: {
      avatarUrl: "/png/alcohol-avatar.png",
    },
  },
  ARCADE: {
    classname: {
      bgActive: "bg-[#4C54FF] bg-opacity-[0.8]",
      bgInactive: "bg-[#4C54FF] bg-opacity-[0.1]",
      textActive: "text-[#4C54FF]",
      avatarImg: "absolute w-[140px] h-[108px] right-[24px] top-[45px]",
    },
    style: {
      background:
        "linear-gradient(180deg, #E5E6FF 42.74%, #B5B7F3 69.6%, #ACAEF1 78.91%)",
      buttonBoxShadow: "0px 5px 10px 0px #8386CE, 0px 0px 60px 0px #8085E9",
      avatarImgZIndex: Z_INDEX.AVATAR_BACKGROUND,
    },
    img: {
      avatarUrl: "/png/arcade-avatar.png",
    },
  },
} as const;
