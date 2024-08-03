export type RoomSaveRequestForm = {
  name: string;
  message: string;
  address?: string;
  thumbnailLink: string;
  password: string;
};

export type RoomUpdateRequestForm = {
  roomUid: string;
  name: string;
  message?: string;
  thumbnailLink: string;
  password: string;
  voteDeadLine?: string;
};
