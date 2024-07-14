import { useToast } from "@/components/common/Toast/use-toast";
import { ChangeEvent, useMemo, useState } from "react";

const useInvitation = () => {
  const toast = useToast();
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isPasswordConfirmSheetOpen, setIsPasswordConfirmSheetOpen] =
    useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("일치");
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
    handleName,
    handleMessage,
    onSubmit,
    handlePassword,
    handlePasswordConfirm,
  };
};

export default useInvitation;
