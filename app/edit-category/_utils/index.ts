import { ScheduleResponse } from "@/apis/schedule/types/model";
import { OrderType2 } from "../_components/DragAndDropArea";

export const extractNumberFromTitle = (title: string) => {
  const match = title.match(/(\d+)차$/);
  return match ? parseInt(match[1], 10) : null;
};

export const generateUniqueTitles = (
  columns: ScheduleResponse[],
  updateTitles: boolean = true
): ScheduleResponse[] => {
  if (!updateTitles) return columns;

  const groupedByType = columns.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<OrderType2, ScheduleResponse[]>);

  return columns.map((item) => {
    const itemsOfType = groupedByType[item.type];

    const sortedItems = itemsOfType
      .map((i) => ({
        ...i,
        number: extractNumberFromTitle(i.name) || 0,
      }))
      .sort((a, b) => a.number - b.number);

    const newNumber =
      sortedItems.length > 1
        ? sortedItems.findIndex((i) => i.scheduleId === item.scheduleId) + 1
        : 0;

    const existingItem = columns.find((i) => i.scheduleId === item.scheduleId);
    const shouldUpdateTitle =
      existingItem && existingItem.sequence !== item.sequence;

    console.log(item, "item", newNumber, "newnumber");
    return {
      ...item,
      name: shouldUpdateTitle
        ? newNumber > 0
          ? `${item.name.split(" ")[0]}${newNumber}차`
          : item.name.split(" ")[0]
        : item.name,
    };
  });
};

export const reorder = (
  list: ScheduleResponse[],
  startIndex: number,
  endIndex: number
): ScheduleResponse[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  // return result;
  return result.map((item, index) => ({
    ...item,
    sequence: index + 1,
  }));
};

export const removeOrderSuffix = (name: string): string => {
  // 이름에서 "N차" 제거
  return name.replace(/\d+차$/, "").trim();
};

export const generateTempKey = () => {
  // 1,000,000 ~ 9,999,999 범위의 값을 생성
  return Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
};

export const isTempKey = (id: number) => {
  //  1,000,000 ~ 9,999,999 범위의 값을 가진 `scheduleId`는 임시 키로 간주
  return id >= 1000000 && id <= 9999999;
};
