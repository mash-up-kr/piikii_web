export interface PlaceDto {
  placeId: number;
  name: string;
  url: string;
  thumbnailLinks: {
    contents: string[];
  };
  address: string;
  phoneNumber: string;
  starGrade: number;
  origin: string;
  memo: string;
  countOfAgree: number;
}
