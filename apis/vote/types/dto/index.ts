import { PlaceDto } from "@/apis/place/types/dto";

export enum VoteCastResultDto {
  AGREE = "AGREE",
  DISAGREE = "DISAGREE",
}

/**
 * API Responses
 */
export interface VoteResultResponseDto {
  result: {
    scheduleId: number;
    scheduleName: string;
    places: PlaceDto[];
  };
}

export interface VoteStatusResponseDto {
  voteFinished: boolean;
}

/**
 * API Payloads
 */
export interface VoteCastPayloadDto {
  userUid: string;
  votes: {
    placeId: number;
    voteResult: VoteCastResultDto;
  }[];
}

export interface VoteDeadlinePayloadDto {
  voteDeadline: string;
  password: string;
}
