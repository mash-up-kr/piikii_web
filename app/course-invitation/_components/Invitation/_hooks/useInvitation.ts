import { useToast } from "@/components/common/Toast/use-toast";
import { ChangeEvent, useMemo, useState } from "react";

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
  const toast = useToast();
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isPasswordConfirmSheetOpen, setIsPasswordConfirmSheetOpen] =
    useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState<(typeof CARD_IMAGES)[number]>({
    id: 0,
    src: "invitation_image.png",
  });

  const updateThumbnail = ({ id, src }: (typeof CARD_IMAGES)[number]) => {
    setThumbnail({ id, src });
  };

  const isButtonDisabled = useMemo(() => {
    return !name;
  }, [name]);

  const isPasswordCorrect = (passwordConfirm: string[]) => {
    return password === JSON.stringify(passwordConfirm);
  };

  const handlePassword = (_password: string[]) => {
    setPassword(JSON.stringify(_password));
  };

  const handlePasswordConfirm = (_password: string[]) => {
    if (isPasswordCorrect(_password)) {
      onPasswordConfirmSheetClose();
      alert(JSON.stringify(_password));
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
