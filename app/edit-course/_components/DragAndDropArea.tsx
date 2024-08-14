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
  columns: ScheduleResponse[]
): ScheduleResponse[] => {
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
      sortedItems.findIndex((i) => i.scheduleId === item.scheduleId) + 1;

    return {
      ...item,
      name:
        sortedItems.length > 1
          ? `${item.name.split(" ")[0]} ${newNumber}차`
          : item.name.split(" ")[0],
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
  return result;
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
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();
  const searchParams = useSearchParams();
  const roomUid = searchParams.get("roomUid") || "";
  const router = useRouter();
  const modalText =
    selectedPlaceNumber > 0 ? (
      <>
        '{selectedItemText}' 카테고리를 삭제하면
        <br />
        {`등록한 ${selectedPlaceNumber}개 후보지 모두 사라져요`}
      </>
    ) : (
      <>'{selectedItemText}' 카테고리를 삭제할까요?</>
    );
  const handleClickDisabledButton = () => {
    if (isDisabled) {
      console.log(isDisabled);
      toast.toast({
        title: "카테고리를 1개 이상 추가해주세요",
        duration: 500,
      });
    }
    return;
  };

  const prepareSchedulesForApi = (
    roomUid: string,
    schedules: ScheduleResponse[]
  ): RegisterSchedulesRequest => {
    return {
      roomUid: roomUid,
      schedules: schedules.map((schedule) => ({
        scheduleId: schedule.scheduleId,
        name: schedule.name,
        type: schedule.type,
        sequence: schedule.sequence,
      })),
    };
  };

  const changeSchedule = async (roomUid: string) => {
    try {
      const requestPayload = prepareSchedulesForApi(roomUid, columns);
      const response = await scheduleApi.createSchedules(requestPayload);

      if (response) {
        //setcategory를
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

    const reorderedItems = reorder(columns, sourceIndex, destinationIndex);

    const updatedList = reorderedItems.map((item, index) => ({
      ...item,
      sequence: index + 1,
    }));

    setCategoryList(updatedList);
  };

  const onDeleteButtonClick = (item: ScheduleResponse) => {
    setSelectedSequence(item.sequence);
    setSelectedItemText(item.name);

    const matchedSchedule = roomPlacesInfo?.filter(
      (place) => place.scheduleId === item.scheduleId
    );

    if (matchedSchedule) {
      setSelectedPlaceNumber(matchedSchedule.length);
    }

    setIsModalOpen(true);
  };

  const handleItemDelete = (sequence: number) => {
    const filteredList = columns.filter((item) => item.sequence !== sequence);

    const updatedList = generateUniqueTitles(
      filteredList.map((item, index) => ({
        ...item,
        sequence: index + 1,
      }))
    );

    setCategoryList(updatedList);
  };

  const onConfirmDelete = () => {
    if (selectedSequence !== null) {
      handleItemDelete(selectedSequence);
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
    const lastItem = columns[columns.length - 1];
    const newScheduleId = lastItem.scheduleId + 1;
    const newItem: ScheduleResponse = {
      scheduleId: newScheduleId,
      type,
      name: `${label} ${columns.length + 1}차`,
      sequence: columns.length + 1,
    };

    const existingItems = columns.filter((item) => item.type === type);

    if (existingItems.length > 0) {
      newItem.name = `${label} ${existingItems.length + 1}차`;
    }

    const updatedList = generateUniqueTitles([...columns, newItem]);

    setCategoryList(updatedList);
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
              {columns.map((item: ScheduleResponse, index: number) => (
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
