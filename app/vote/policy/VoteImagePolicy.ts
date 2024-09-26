const DEFAULT_FOOD_IMG_PATH = "default_food.png" as const;
const DEFAULT_DESSERT_IMG_PATH = "default_dessert.png" as const;
const DEFAULT_ALCOHOL_IMG_PATH = "default_alcohol.png" as const;
const DEFAULT_ARCADE_IMG_PATH = "default_arcade.png" as const;

export enum ImgBgType {
  GRAY = "gray",
  COLOR = "color",
}

const FOOD_SQUARE_GRAY_IMG_PATH = (bgType: ImgBgType) =>
  `food_square_${bgType}.png` as const;
const DESSERT_SQUARE_GRAY_IMG_PATH = (bgType: ImgBgType) =>
  `dessert_square_${bgType}.png` as const;
const ALCOHOL_SQUARE_GRAY_IMG_PATH = (bgType: ImgBgType) =>
  `alcohol_square_${bgType}.png` as const;
const ARCADE_SQUARE_GRAY_IMG_PATH = (bgType: ImgBgType) =>
  `arcade_square_${bgType}.png` as const;

export class VoteImagePolicy {
  static readonly defaultImgPaths = [
    DEFAULT_FOOD_IMG_PATH,
    DEFAULT_DESSERT_IMG_PATH,
    DEFAULT_ALCOHOL_IMG_PATH,
    DEFAULT_ARCADE_IMG_PATH,
  ];

  static isDefaultImageUrl(url: string): boolean {
    return VoteImagePolicy.defaultImgPaths.some((path) => url.includes(path));
  }

  static getPublicDefaultImgUrl(url: string, bgType: ImgBgType): string {
    if (url.includes(DEFAULT_FOOD_IMG_PATH)) {
      return `/png/${FOOD_SQUARE_GRAY_IMG_PATH(bgType)}`;
    }

    if (url.includes(DEFAULT_DESSERT_IMG_PATH)) {
      return `/png/${DESSERT_SQUARE_GRAY_IMG_PATH(bgType)}`;
    }

    if (url.includes(DEFAULT_ALCOHOL_IMG_PATH)) {
      return `/png/${ALCOHOL_SQUARE_GRAY_IMG_PATH(bgType)}`;
    }

    if (url.includes(DEFAULT_ARCADE_IMG_PATH)) {
      return `/png/${ARCADE_SQUARE_GRAY_IMG_PATH(bgType)}`;
    }

    return url;
  }
}
