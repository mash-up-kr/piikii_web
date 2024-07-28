export type SaveRoomResponse = {
  roomUid: string;
};

export type SuccessSaveRoomResponse = {
  data: SaveRoomResponse;
  timestamp: number;
};

export type RoomResponse = {
  name: string;
  message?: string;
  thumbnailLinks: string;
  voteDeadline?: string;
  roomUid: string;
};

export type SuccessRoomResponse = {
  data: RoomResponse;
  timestamp: number;
};
