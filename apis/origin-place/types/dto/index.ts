export type PlaceAutoCompleteResponse = {
  name: string;
  url: string;
  placeImageUrls: {
    contents: string[];
  };
  address?: string;
  phoneNumber?: string;
  starGrade?: number;
  reviewCount: number;
  category?: string;
  origin: "AVOCADO" | "LEMON" | "MANUAL";
};
