/**
 * API Response
 */
export interface PlaceResponseDto {
  id: number;
  roomUid: string;
  scheduleId: number;
  name: string;
  url: string;
  placeImageUrls: {
    contents: string[];
  };
  address: string;
  phoneNumber: string;
  starGrade: number;
  origin: string;
  memo: string;
}

export interface ScheduleTypeGroupResponse {
  scheduleId: number;
  scheduleName: string;
  places: PlaceResponseDto[];
}

/**
 * API Payloads
 */
export interface AddPlaceRequestDto {
  scheduleId: number;
  type: string;
  name: string;
  url: string;
  address: string;
  phoneNumber: string;
  starGrade: number;
  memo: string;
  voteLikeCount: number;
  voteDislikeCount: number;
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
