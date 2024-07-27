import { useToast } from "@/components/common/Toast/use-toast";
import { ChangeEvent, useMemo, useState } from "react";

const useCloseVote = () => {
  const toast = useToast();

  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [password, setPassword] = useState("");

  const isPasswordCorrect = (passwordConfirm: string[]) => {
    return password === JSON.stringify(passwordConfirm);
  };

  const handlePassword = (_password: string[]) => {
    if (isPasswordCorrect(_password)) {
      alert(JSON.stringify(_password));
    } else {
      toast.toast({ title: "비밀번호가 일치하지 않아요", duration: 500 });
    }
  };

  const onPasswordSheetOpen = () => {
    setIsPasswordSheetOpen(true);
  };

  const onPasswordSheetClose = () => {
    setIsPasswordSheetOpen(false);
  };

  const onSubmit = () => {
    onPasswordSheetOpen();
  };

  return {
    isPasswordSheetOpen,
    passwordSheet: {
      isOpen: isPasswordSheetOpen,
      onClose: onPasswordSheetClose,
      onOpen: onPasswordSheetOpen,
    },

    onSubmit,
    handlePassword,
  };
};

export default useCloseVote;
