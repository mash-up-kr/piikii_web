import { RegisterSchedulesRequest } from "@/apis/schedule/types/dto";
import { useToast } from "@/components/common/Toast/use-toast";
import { useBadgeContext } from "@/providers/badge-provider";
import { ChangeEvent, useMemo, useState } from "react";
import { transformBadgesToSchedule } from "../_utils";
import { useCreateRoom } from "@/apis/room/RoomApi.mutation";
import { useCreateSchedules } from "@/apis/schedule/ScheduleApi.mutation";
import { RoomSaveRequestForm } from "@/apis/room/types/dto";
import { roomUidStorage } from "@/utils/web-storage/room-uid";
import { useRouter } from "next/navigation";

export type CardImageType = {
  id: number;
  src: string;
};

export const CARD_IMAGES: CardImageType[] = [
  {
    id: 0,
    src: "invitation_image.png",
  },
  {
    id: 1,
    src: "invitation_image_1.png",
  },
  {
    id: 2,
    src: "invitation_image_2.png",
  },
  {
    id: 3,
    src: "invitation_image_3.png",
  },
  {
    id: 4,
    src: "invitation_image_4.png",
  },
];

const useInvitation = () => {
  const router = useRouter();
  const toast = useToast();

  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isPasswordConfirmSheetOpen, setIsPasswordConfirmSheetOpen] =
    useState(false);

  const { list } = useBadgeContext();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState<(typeof CARD_IMAGES)[number]>({
    id: 0,
    src: "invitation_image.png",
  });

  const isButtonDisabled = useMemo(() => {
    return !name;
  }, [name]);

  const { mutate: createRoomMutate } = useCreateRoom({
    options: {
      onSuccess: (res) => {
        const {
          data: { roomUid },
        } = res;
        if (roomUid) {
          roomUidStorage?.set({ roomUid });
          requestCreateSchedules(roomUid);
        } else throw Error("roomUid not found");
      },
      onError: (err) => {
        toast.toast({ title: err.message });
      },
    },
  });

  const { mutate: createSchedulesMutate } = useCreateSchedules({
    options: {
      onSuccess: () => {
        router.push(`add-course?roomUid=${roomUidStorage?.get()?.roomUid}`);
      },
      onError: (err) => {
        toast.toast({ title: err.message });
      },
    },
  });

  const getRoomCreateData = (): RoomSaveRequestForm => {
    return {
      name,
      message,
      thumbnailLink: `${process.env.NEXT_PUBLIC_DNS_URL}/png/${thumbnail.src}`,
      password,
    };
  };

  const getCreateSchedulesData = (): Pick<
    RegisterSchedulesRequest,
    "schedules"
  > => {
    return {
      schedules: transformBadgesToSchedule(list),
    };
  };

  const requestCreateRoom = () => {
    createRoomMutate({
      ...getRoomCreateData(),
    });
  };

  const requestCreateSchedules = (roomUid: string) => {
    createSchedulesMutate({
      ...getCreateSchedulesData(),
      roomUid,
    });
  };

  const updateThumbnail = ({ id, src }: (typeof CARD_IMAGES)[number]) => {
    setThumbnail({ id, src });
  };

  const isPasswordCorrect = (passwordConfirm: string[]) => {
    return password === passwordConfirm.join("");
  };

  const handlePassword = (_password: string[]) => {
    setPassword(_password.join(""));
  };

  const handlePasswordConfirm = (_password: string[]) => {
    if (isPasswordCorrect(_password)) {
      onPasswordConfirmSheetClose();
      requestCreateRoom();
    } else {
      toast.toast({ title: "비밀번호가 일치하지 않아요", duration: 500 });
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
  };

  const onPasswordSheetOpen = () => {
    setIsPasswordSheetOpen(true);
  };

  const onPasswordSheetClose = () => {
    setIsPasswordSheetOpen(false);
  };

  const onPasswordConfirmSheetOpen = () => {
    setIsPasswordConfirmSheetOpen(true);
  };

  const onPasswordConfirmSheetClose = () => {
    setIsPasswordConfirmSheetOpen(false);
  };

  const onSubmit = () => {
    if (isButtonDisabled) {
      toast.toast({ title: "모임 이름을 적어주세요.", duration: 500 });
      return;
    }
    onPasswordSheetOpen();
  };

  return {
    CARD_IMAGES,
    name,
    message,
    isButtonDisabled,
    isPasswordSheetOpen,
    passwordSheet: {
      isOpen: isPasswordSheetOpen,
      onClose: onPasswordSheetClose,
      onOpen: onPasswordSheetOpen,
    },
    passwordConfirmSheet: {
      isOpen: isPasswordConfirmSheetOpen,
      onClose: onPasswordConfirmSheetClose,
      onOpen: onPasswordConfirmSheetOpen,
    },
    thumbnail,
    updateThumbnail,
    handleName,
    handleMessage,
    onSubmit,
    handlePassword,
    handlePasswordConfirm,
  };
};

export default useInvitation;
