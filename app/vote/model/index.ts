import { PlaceResponseDto } from "@/apis/place/types/dto";

export enum SwipeDirection {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  NONE = "none",
}

export enum CategoryChoiceState {
  LIKE = "like",
  DISLIKE = "dislike",
  HOLD = "hold",
  PENDING = "pending",
}

export enum VoteType {
  VOTE_PENDING = "pending",
  VOTE_HOLD = "hold",
  VOTE_DONE = "done",
  NONE = "none",
}

export interface PlaceOption extends PlaceResponseDto {
  state: CategoryChoiceState;
  index: number;
}

export interface PlaceVoteResult {
  likeList: PlaceOption[];
  dislikeList: PlaceOption[];
  holdList: PlaceOption[];
}
