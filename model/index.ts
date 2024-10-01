import { ScheduleTypeGroupResponse } from "@/apis/place/types/dto";
import { VoteResultByScheduleResponseDto } from "@/apis/vote/types/dto";
import {
  ColumnsType,
  OrderType,
} from "@/app/edit-category/_components/DragAndDropArea";

export enum Size {
  small = "small",
  large = "large",
}

export interface CardSizeProps {
  size: Size;
}

export interface CardInfoProps {
  origin: "AVOCADO" | "LEMON" | "MANUAL";
  place: string;
  link?: string;
  rating?: number;
  reviewCount?: number;
  voteCount?: number;
  totalVoteCount?: number;
  images: string[];
  openingHours?: string;
  info?: { label: string; value: string }[];
  onButtonClick?: () => void;
  noShadow?: boolean;
  cardClassName?: string;
  cardDividerClassName?: string;
  cardButtonClassName?: string;
  selected?: boolean;
  category?: number | string;
  customStyle?: Record<string, string>;
}

export interface ImgProps {
  width: number;
  height: number;
}

export interface IconInfo {
  icon: string;
  label: string;
  type: OrderType;
  iconImage?: React.ReactNode;
}

export interface CardIconProps {
  iconInfo: IconInfo[];
}

export interface PendingCardListProps {
  cards: { place: string; images: string[] }[];
  type: OrderType;
}

export interface VoteAreaProps {
  schedules: {
    scheduleId: number;
    scheduleName: string;
  }[];
  selectedSchedule: VoteResultByScheduleResponseDto;
  onClickSchedule: (scheduleId: number) => void;
}

export interface EditOptionAreaProps {
  schedules: {
    scheduleId: number;
    scheduleName: string;
  }[];
  selectedSchedule: VoteResultByScheduleResponseDto;
  selectedPlaces: Record<number, number>;
  onClickSchedule: (scheduleId: number) => void;
  onClickPlaceCard: (scheduleId: number, placeId: number) => void;
}
