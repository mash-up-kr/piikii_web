import { roomUidStorage } from "@/utils/web-storage/room-uid";
import { useMemo } from "react";

export default function useRoomUid() {
  const roomUid = useMemo(() => roomUidStorage?.get()?.roomUid, []);
  return roomUid;
}
