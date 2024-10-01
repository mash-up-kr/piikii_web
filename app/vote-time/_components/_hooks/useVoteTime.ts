import "dayjs/locale/ko";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import timezone from "dayjs/plugin/timezone";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/common/Toast/use-toast";
import { useUpdateVoteDeadline } from "@/apis/vote/VoteApi.mutation";

dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);

const KOREA_TIMEZONE = "Asia/Seoul";

interface IDateInfo {
  date: dayjs.Dayjs;
  dayOfWeek: string;
}
interface ITimeObj {
  hour: string; // hh
  minute: string; // mm
  ampm: string; // am/pm
}

interface ITimeObjParam extends ITimeObj {
  date: string; // YYYY-MM-DD
}

const getNextSixDays = (): IDateInfo[] => {
  const today = dayjs();
  const dates: IDateInfo[] = [];

  for (let i = 0; i < 6; i++) {
    const nextDay = today.add(i, "day");
    dates.push({
      date: nextDay,
      dayOfWeek: nextDay.format("dd"),
    });
  }

  return dates;
};

function convertToKoreanTime(obj: ITimeObjParam): string {
  const { date, hour, minute, ampm } = obj;
  let convertedHour = parseInt(hour, 10);
  if (ampm.toLowerCase() === "pm" && convertedHour !== 12) {
    convertedHour += 12;
  } else if (ampm.toLowerCase() === "am" && convertedHour === 12) {
    convertedHour = 0;
  }
  const dateTime = dayjs(`${date} ${convertedHour}:${minute}`).format(
    "YYYY-MM-DDTHH:mm:ss"
  );
  return dateTime;
}

const useVoteTime = () => {
  const router = useRouter();
  const toast = useToast();
  const dates = getNextSixDays();
  const searchParams = useSearchParams();
  const roomUid = searchParams.get("roomUid") || "";
  const [selectedDate, setSelectedDate] = useState<IDateInfo["date"] | null>(
    dayjs().add(2, "day")
  );
  const [password, setPassword] = useState("");
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);
  const [isPasswordConfirmSheetOpen, setIsPasswordConfirmSheetOpen] =
    useState(false);

  const [selectedTime, setSelectedTime] = useState<ITimeObj>({
    hour: "12",
    minute: "00",
    ampm: "am",
  });

  const { mutate: updateVoteDeadlineMutate } = useUpdateVoteDeadline({
    options: {
      onSuccess: () => {
        router.push(`/vote-start/?roomUid=${roomUid}`);
      },
      onError: (error) => {
        toast.toast({
          description: error.response?.data?.message,
        });
      },
    },
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

  const handleDateClick = (date: IDateInfo["date"]) => {
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
      const { ampm, hour, minute } = selectedTime || {};
      if (selectedDate) {
        const voteDeadline = convertToKoreanTime({
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
          hour,
          minute,
          ampm,
        });
        updateVoteDeadlineMutate({
          roomUid,
          payload: {
            password: _password.join(""),
            voteDeadline,
          },
        });
      }
    } else {
      toast.toast({ title: "비밀번호가 일치하지 않아요", duration: 500 });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit = () => {
    onPasswordSheetOpen();
  };

  const handleTimeChange = (newTime: {
    hour: string;
    minute: string;
    ampm: string;
  }) => {
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
    handleBack,
    onSubmit,
    handleTimeChange,
    handlePassword,
    handleDateClick,
    handlePasswordConfirm,
  };
};

export default useVoteTime;
