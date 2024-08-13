export type PlaceAutoCompleteResponse = {
  data: {
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
  timestamp: number;
};
