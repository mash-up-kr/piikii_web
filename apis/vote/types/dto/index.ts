export enum VoteCastResultDto {
  AGREE = "AGREE",
  DISAGREE = "DISAGREE",
}

/**
 * API Responses
 */
export interface VotePlaceResponseDto {
  placeId: number;
  name: string;
  url: string;
  thumbnailLinks: {
    contents: string[];
  };
  address: string;
  phoneNumber: string;
  starGrade: number;
  origin: "AVOCADO" | "LEMON" | "MANUAL";
  memo: string;
  countOfAgree: number;
}

export interface VoteResultByScheduleResponseDto {
  scheduleId: number;
  scheduleName: string;
  places: VotePlaceResponseDto[];
}

export interface VoteResultResponseDto {
  result: VoteResultByScheduleResponseDto[];
}

export interface VoteStatusResponseDto {
  voteFinished: boolean;
}

/**
 * API Payloads
 */

interface PlaceVoteResultDto {
  placeId: number;
  voteResult: VoteCastResultDto;
}
export interface VoteSaveRequestDto {
  userUid: string;
  votes: PlaceVoteResultDto[];
}

export interface VoteDeadlineSetRequestDto {
  voteDeadline: string;
  password: string;
}
