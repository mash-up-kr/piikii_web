export enum Size {
  small = "small",
  large = "large",
}

export interface CardSizeProps {
  size: Size;
}

export interface CardInfoProps {
  place: string;
  link: string;
  rating: string;
  numberOfReviews: number;
  images: string[];
  info: { label: string; value: string }[];
}

export interface ImgProps {
  width: number;
  height: number;
}

export interface IconAndDesc {
  icon: string;
  desc: string;
}

export interface CardIconProps {
  iconAndDesc: IconAndDesc[];
}
