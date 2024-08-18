import { setCookie } from "@/app/actions";
import { roomUidStorage } from "@/utils/web-storage/room-uid";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function useRoomUid() {
  const searchParams = useSearchParams();
  const paramsRoomUid = searchParams.get("roomUid") ?? "";

  const roomUid = useMemo(() => roomUidStorage?.get()?.roomUid, []);

  useEffect(() => {
    const setRoomUidCookie = async (roomUid: string) => {
      await setCookie("roomUid", roomUid);
    };

    if (paramsRoomUid) {
      roomUidStorage?.set({ roomUid: paramsRoomUid });
      setRoomUidCookie(paramsRoomUid);
    }
  }, [paramsRoomUid]);

  return paramsRoomUid ? paramsRoomUid : roomUid;
}
