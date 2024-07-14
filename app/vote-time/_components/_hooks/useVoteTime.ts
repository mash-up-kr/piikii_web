import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useToast } from "@/components/common/Toast/use-toast";
dayjs.locale("ko");

interface DateInfo {
  date: dayjs.Dayjs;
  dayOfWeek: string;
}

const getNextSixDays = (): DateInfo[] => {
  const today = dayjs();
  const dates: DateInfo[] = [];

  for (let i = 0; i < 6; i++) {
    const nextDay = today.add(i, "day");
    dates.push({
      date: nextDay,
      dayOfWeek: nextDay.format("dd"),
    });
  }

  return dates;
};
const useVoteTime = () => {
  const toast = useToast();
  const dates = getNextSixDays();
  const [selectedDate, setSelectedDate] = useState<DateInfo["date"] | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isPasswordConfirmSheetOpen, setIsPasswordConfirmSheetOpen] =
    useState(false);

  const [selectedTime, setSelectedTime] = useState({
    hour: "1",
    minute: "00",
    ampm: "오전",
  });

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

  const handleDateClick = (date: DateInfo["date"]) => {
    setSelectedDate(date);
  };

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

  const onSubmit = () => {
    onPasswordSheetOpen();
  };

  const handleTimeChange = (newTime: { hour: string; minute: string; ampm: string }) => {
    setSelectedTime(newTime);
  };

  return {
    dates,
    selectedDate,
    selectedTime,
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
    onSubmit,
    handleTimeChange,
    handlePassword,
    handleDateClick,
    handlePasswordConfirm,
  };
};

export default useVoteTime;
