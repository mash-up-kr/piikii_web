export enum Size {
  small = "small",
  large = "large",
}

export interface CardSizeProps {
  size: Size;
}

export interface CardInfoProps {
  place: string;
  link?: string;
  rating?: string;
  reviewCount?: number;
  images: string[];
  info?: { label: string; value: string }[];
  onButtonClick?: () => void;
}

export interface ImgProps {
  width: number;
  height: number;
}

export interface IconInfo {
  icon: string;
  label: string;
  type?: string;
}

export interface CardIconProps {
  iconInfo: IconInfo[];
}

export interface PendingCardListProps {
  cards: { place: string; images: string[] }[];
}
