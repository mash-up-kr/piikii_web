import { SyncedStorageFactory } from "./helper/synced-storage-factory";

export type RoomUidType = {
  roomUid: string;
};

export const { connector: roomUidConnector, storage: roomUidStorage } =
  SyncedStorageFactory.createLocal<RoomUidType>("roomUid");
