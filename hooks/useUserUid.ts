import { userUidStorage } from "@/utils/web-storage/user-uid";
import { useMemo } from "react";

export default function useUserUid() {
  const userUid = useMemo(() => userUidStorage?.get()?.userUid, []);
  return userUid;
}
