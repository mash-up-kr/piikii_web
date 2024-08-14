import { SyncedStorageFactory } from "./helper/synced-storage-factory";

export type UserUidType = {
  userUid: string;
};

export const { connector: userUidConnector, storage: userUidStorage } =
  SyncedStorageFactory.createLocal<UserUidType>("userUid");
