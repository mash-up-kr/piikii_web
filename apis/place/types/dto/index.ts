/**
 * API Response
 */
export interface PlaceResponseDto {
  id: number;
  roomUid: string;
  scheduleId: number;
  name: string;
  url?: string;
  placeImageUrls: {
    contents: string[];
  };
  address?: string;
  phoneNumber?: string;
  starGrade?: number;
  origin: "AVOCADO" | "LEMON" | "MANUAL";
  memo?: string;
  reviewCount?: number;
}

export interface ScheduleTypeGroupResponse {
  scheduleId: number;
  scheduleName: string;
  places: PlaceResponseDto[];
}

export interface SuccessPlaceTypeGroupResponse {
  data: ScheduleTypeGroupResponse[];
  timestamp: number;
}

/**
 * API Payloads
 */
export interface AddPlaceRequestDto {
  scheduleId: number;
  type: string;
  name: string;
  url?: string;
  address?: string | null;
  reviewCount?: number | null;
  phoneNumber?: string | null;
  starGrade?: number | null;
  memo: string;
  voteLikeCount?: number | null;
  voteDislikeCount?: number | null;
  longitude?: number | null;
  latitude?: number | null;
}

export interface CreatePlacePayloadDto {
  addPlaceRequest: AddPlaceRequestDto;
  placeImages?: string[];
}

export interface ModifyPlaceRequestDto {
  scheduleId: number;
  scheduleType: string;
  name: string;
  url: string;
  deleteTargetUrls: string[];
  address: string;
  phoneNumber: string;
  starGrade: number;
  memo: string;
  voteLikeCount: number;
  voteDislikeCount: number;
}
