import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
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
  const [selectedDate, setSelectedDate] = useState<DateInfo['date'] | null>(null);
  const dates = getNextSixDays();

  const handleDateClick = (date: DateInfo['date']) => {
    setSelectedDate(date);
  };

  return {
    dates,
    selectedDate,
    handleDateClick,
  };
};

export default useVoteTime;
