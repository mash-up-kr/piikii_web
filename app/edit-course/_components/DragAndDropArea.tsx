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
  const { categoryList, setCategoryList } = useCourseContext();
  const [columns, setColumns] = useState<ScheduleResponse[]>([]);
  const [itemCount, setItemCount] = useState(
    categoryList ? categoryList.length : 0
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const toast = useToast();

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

  const createNewSchedule = async (roomUid: string) => {
    try {
      const createdSchedule = await scheduleApi.readSchedules(roomUid);
      setCategoryList(createdSchedule.data.schedules);
      return;
    } catch (error) {
      console.error("Error creating schedules:", error);
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

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);

  // const handleItemClick = (newItem: ScheduleResponse) => {
  //   const updatedList = generateUniqueTitles([
  //     ...columns,
  //     {
  //       ...newItem,
  //       sequence: columns.length + 1,
  //     },
  //   ]);

  //   setCategoryList(updatedList);
  // };

  const handleItemClick = (type: OrderType2) => {
    const lastItem = columns[columns.length - 1];
    const newScheduleId = lastItem.scheduleId + 1;
    const newItem: ScheduleResponse = {
      scheduleId: newScheduleId,
      type,
      name: `${type} ${columns.length + 1}차`,
      sequence: columns.length + 1,
    };

    const existingItems = columns.filter((item) => item.type === type);

    if (existingItems.length > 0) {
      newItem.name = `${type} ${existingItems.length + 1}차`;
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
                        onClick={() => handleItemDelete(item.sequence)}
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
              // createNewSchedule()
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
