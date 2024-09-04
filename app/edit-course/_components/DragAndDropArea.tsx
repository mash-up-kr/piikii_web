"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import CardWithCourse from "@/components/common/Cards/CardWithCourse";
import { SheetWithCourse } from "@/components/common/BottomSheet/SheetWithCourse";

import { StrictModeDroppable } from "./Droppable";
import { Button } from "@/components/common/Button/Button";
import { useToast } from "@/components/common/Toast/use-toast";
import { useCourseContext } from "@/providers/course-provider";
import { ScheduleResponse } from "@/apis/schedule/types/model";
import scheduleApi from "@/apis/schedule/ScheduleApi";
import { useRouter, useSearchParams } from "next/navigation";
import { RegisterSchedulesRequest } from "@/apis/schedule/types/dto";
import { iconInfo } from "@/lib/utils";
import { ModalWithCategory } from "@/components/common/Modal/ModalWithCategory";
import { update } from "lodash-es";

export type OrderType = "food" | "dessert" | "beer" | "play";
export type OrderType2 = "DISH" | "DESSERT" | "ALCOHOL" | "ARCADE";

export type ValueType = {
  globalIndex: number;
  title: string;
  type: OrderType;
  icon: string;
};

export type ColumnsType = {
  course: {
    id: "course";
    list: Record<OrderType, ValueType[]>;
  };
};

const extractNumberFromTitle = (title: string) => {
  const match = title.match(/(\d+)차$/);
  return match ? parseInt(match[1], 10) : null;
};

const generateUniqueTitles = (
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

const reorder = (
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

const DragAndDropArea: React.FC = () => {
  const [selectedSequence, setSelectedSequence] = useState<number | null>(null);
  const [selectedItemText, setSelectedItemText] = useState<string | null>("");
  const [selectedPlaceNumber, setSelectedPlaceNumber] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roomPlacesInfo, categoryList, setCategoryList } = useCourseContext();
  const [columns, setColumns] = useState<ScheduleResponse[]>([]);
  const [itemCount, setItemCount] = useState(
    categoryList ? categoryList.length : 0
  );
  const [copyColumns, setCopyColumns] = useState<ScheduleResponse[]>(columns);
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const searchParams = useSearchParams();
  const roomUid = searchParams.get("roomUid") || "";
  const router = useRouter();
  const modalText =
    selectedPlaceNumber > 0 ? (
      <>
        &apos;{selectedItemText}&apos; 카테고리를 삭제하면
        <br />
        {`등록한 ${selectedPlaceNumber}개 후보지 모두 사라져요`}
      </>
    ) : (
      <>&apos;{selectedItemText}&apos; 카테고리를 삭제할까요?</>
    );

  useEffect(() => {
    setColumns(categoryList ?? []);
    setCopyColumns(categoryList ?? []); // copyColumns를 초기화
    setItemCount((categoryList ?? []).length);
  }, [categoryList]);

  const handleClickDisabledButton = () => {
    if (isDisabled) {
      toast.toast({
        title: "카테고리를 1개 이상 추가해주세요",
        duration: 500,
      });
    }
    return;
  };

  const generateTempKey = () => {
    // 1,000,000 ~ 9,999,999 범위의 값을 생성
    return Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  };

  const isTempKey = (id: number) => {
    //  1,000,000 ~ 9,999,999 범위의 값을 가진 `scheduleId`는 임시 키로 간주
    return id >= 1000000 && id <= 9999999;
  };

  const prepareSchedulesForApi = (
    roomUid: string,
    schedules: ScheduleResponse[]
  ): RegisterSchedulesRequest => {
    return {
      roomUid: roomUid,
      schedules: schedules.map((schedule) => ({
        scheduleId: isTempKey(schedule.scheduleId as number)
          ? null
          : schedule.scheduleId,
        name: schedule.name,
        type: schedule.type,
        sequence: schedule.sequence,
      })),
    };
  };

  const changeSchedule = async (roomUid: string) => {
    try {
      const requestPayload = prepareSchedulesForApi(roomUid, copyColumns);
      const response = await scheduleApi.createSchedules(requestPayload);

      if (response) {
        router.back();
      }
    } catch (error) {
      console.error("Error changing schedules:", error);
      return null;
    }
  };

  useEffect(() => {
    setColumns(categoryList ?? []);
    setItemCount((categoryList ?? []).length);
  }, [categoryList]);

  useEffect(() => {
    setIsDisabled(itemCount === 0);
  }, [itemCount]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedItems = reorder(copyColumns, sourceIndex, destinationIndex);

    const updatedList = generateUniqueTitles(reorderedItems, false);

    setCopyColumns(updatedList);
  };

  const onDeleteButtonClick = (item: ScheduleResponse) => {
    setSelectedSequence(item.sequence);
    setSelectedItemText(item.name);

    const matchedSchedule = roomPlacesInfo?.find(
      (place) => place.scheduleId === item.scheduleId
    );

    if (matchedSchedule) {
      setSelectedPlaceNumber(matchedSchedule.places.length);
    } else {
      setSelectedPlaceNumber(0);
    }

    setIsModalOpen(true);
  };
  const onConfirmDelete = () => {
    if (selectedSequence !== null) {
      const selectedItem = copyColumns.find(
        (item) => item.sequence === selectedSequence
      );
      if (selectedItem) {
        handleItemDelete(selectedSequence, selectedItem.type);
      }
    }
    setIsModalOpen(false);
  };
  const onCancelDelete = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);

  const findLabelForType = (type: OrderType2): string => {
    const icon = iconInfo.find((icon) => icon.type === type);
    return icon ? icon.label : type;
  };
  const handleItemClick = (type: OrderType2) => {
    const label = findLabelForType(type);

    // 해당 타입에 속한 기존 아이템들 필터링
    const itemsOfType = copyColumns.filter((item) => item.type === type);

    // 새로운 아이템의 sequence를 결정 (기존 아이템 수 + 1)
    const newSequence = itemsOfType.length + 1;

    const newItem: ScheduleResponse = {
      scheduleId: generateTempKey(),
      type,
      name: newSequence > 1 ? `${label} ${newSequence}차` : `${label}`,
      sequence: newSequence,
    };

    // 아이템 리스트에 새로운 아이템 추가 후 순서에 맞게 라벨링
    const updatedList = generateUniqueTitles([...copyColumns, newItem]);

    setCopyColumns(updatedList);
    setItemCount(updatedList.length);
  };
  const handleItemDelete = (sequence: number, type: OrderType2) => {
    // 삭제할 항목을 제외한 리스트를 생성
    const filteredList = copyColumns.filter(
      (item) => !(item.sequence === sequence && item.type === type)
    );

    // 삭제하고  -동일한 타입의 항목들의 sequence만 골라서 조정
    const updatedList = filteredList.map((item) => {
      if (item.type === type && item.sequence > sequence) {
        return {
          ...item,
          sequence: item.sequence - 1,
          name:
            item.sequence > 2
              ? `${item.name.split(" ")[0]}${item.sequence - 1}차`
              : item.name.split(" ")[0],
        };
      }
      return item;
    });

    setCopyColumns(updatedList);
    setItemCount(updatedList.length);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-y-[16px]"
            >
              {copyColumns.map((item: ScheduleResponse, index: number) => (
                <Draggable
                  key={item.scheduleId}
                  draggableId={`item-${item.type}-${item.scheduleId}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="flex flex-row items-center justify-center w-[335px] h-[56px] gap-x-[16px]"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Image
                        src="/svg/ic_x.svg"
                        alt="x"
                        width={16}
                        height={16}
                        priority
                        unoptimized
                        onClick={() => onDeleteButtonClick(item)}
                      />
                      <CardWithCourse item={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {isModalOpen && (
        <ModalWithCategory
          modalText={modalText}
          onLeftButtonText="취소"
          onRightButtonText="네, 삭제할래요"
          onLeftButtonClick={onCancelDelete}
          onRightButtonClick={onConfirmDelete}
        />
      )}
      {itemCount < 5 && <SheetWithCourse handleItemClick={handleItemClick} />}
      <div className="flex mt-auto justify-center w-[375px] h-[86px]">
        <Button
          className={`w-[335px] h-[56px] rounded-[14px] ${
            isDisabled ? "opacity-40" : ""
          }`}
          onClick={() => {
            if (isDisabled) {
              handleClickDisabledButton();
              return;
            } else {
              changeSchedule(roomUid);
            }
          }}
        >
          바꿨어요
        </Button>
      </div>
    </>
  );
};

export default DragAndDropArea;
