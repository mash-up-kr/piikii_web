"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import CardWithCourse from "@/components/common/Cards/CardWithCourse";
import { SheetWithCourse } from "@/components/common/BottomSheet/SheetWithCourse";
import { flattenColumns, iconInfo } from "@/lib/utils";
import { StrictModeDroppable } from "./Droppable";
import { Button } from "@/components/common/Button/Button";
import { useToast } from "@/components/common/Toast/use-toast";

export type OrderType = "food" | "dessert" | "beer" | "play";

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

const addItemToColumns = (
  prevColumns: ColumnsType,
  newItem: ValueType
): ColumnsType => {
  const updatedColumns = {
    ...prevColumns,
    course: {
      ...prevColumns.course,
      list: {
        ...prevColumns.course.list,
        [newItem.type]: [...prevColumns.course.list[newItem.type], newItem],
      },
    },
  };
  return generateUniqueTitles(updatedColumns);
};

const updateColumnsOnDelete = (
  prevColumns: ColumnsType,
  globalIndexToDelete: number
): ColumnsType => {
  const updatedList: ValueType[] = flattenColumns(prevColumns).filter(
    (item) => item.globalIndex !== globalIndexToDelete
  );

  const newList: Record<OrderType, ValueType[]> = {
    food: [],
    dessert: [],
    beer: [],
    play: [],
  };

  updatedList.forEach((item, index) => {
    const newIndex =
      item.globalIndex > globalIndexToDelete
        ? item.globalIndex - 1
        : item.globalIndex;
    newList[item.type].push({ ...item, globalIndex: newIndex });
  });

  return {
    ...prevColumns,
    course: {
      ...prevColumns.course,
      list: newList,
    },
  };
};

const reorder = (
  list: ValueType[],
  startIndex: number,
  endIndex: number
): ValueType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);
  return result;
};

const generateUniqueTitles = (columns: ColumnsType): ColumnsType => {
  const updatedColumns = { ...columns };
  Object.keys(updatedColumns.course.list).forEach((category) => {
    updatedColumns.course.list[category as OrderType].forEach((item, index) => {
      if (updatedColumns.course.list[category as OrderType].length > 1) {
        item.title = `${item.title.split(" ")[0]} ${index + 1}차`;
      } else {
        item.title = item.title.split(" ")[0];
      }
    });
  });
  return updatedColumns;
};

const DragAndDropArea: React.FC = () => {
  // 사용자가 설정한 데이터라고 가정
  const initialColumns: ColumnsType = {
    course: {
      id: "course",
      list: {
        food: [
          { globalIndex: 0, title: "음식", type: "food", icon: "🍔" },
          { globalIndex: 1, title: "음식", type: "food", icon: "🍔" },
        ],
        dessert: [
          { globalIndex: 2, title: "디저트", type: "dessert", icon: "🥨" },
        ],
        beer: [],
        play: [],
      },
    },
  };
  const updatedInitialColumns = generateUniqueTitles(initialColumns);
  const [columns, setColumns] = useState(updatedInitialColumns);
  const [itemCount, setItemCount] = useState(
    flattenColumns(updatedInitialColumns).length
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

  useEffect(() => {
    setColumns(updatedInitialColumns);
  }, []);

  useEffect(() => {
    setIsDisabled(itemCount === 0);
  }, [itemCount]);

  const allItems = useMemo(() => {
    return flattenColumns(columns).sort(
      (a, b) => a.globalIndex - b.globalIndex
    );
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const reorderedItems = reorder(allItems, sourceIndex, destinationIndex);

    const newColumns = { ...columns };
    const newList: Record<OrderType, ValueType[]> = {
      food: [],
      dessert: [],
      beer: [],
      play: [],
    };

    reorderedItems.forEach((item, index) => {
      item.globalIndex = index;
      newList[item.type].push(item);
    });

    newColumns.course.list = newList;
    setColumns(newColumns);
  };

  const handleItemDelete = (globalIndexToDelete: number) => {
    setColumns((prevColumns) => {
      const updatedColumns = updateColumnsOnDelete(
        prevColumns,
        globalIndexToDelete
      );
      return generateUniqueTitles(updatedColumns);
    });
    setItemCount(itemCount - 1);
  };

  const handleItemClick = (type: OrderType) => {
    const icon = iconInfo.find((item) => item.type === type);
    if (!icon) return;

    const newItem: ValueType = {
      globalIndex: itemCount,
      title: `${icon.label}`,
      type: type,
      icon: icon.icon,
    };

    setColumns((prevColumns) => addItemToColumns(prevColumns, newItem));
    setItemCount(itemCount + 1);
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
              {allItems.map((item: ValueType, index: number) => (
                <Draggable
                  key={index}
                  draggableId={`item-${item.type}-${item.globalIndex}`}
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
                        onClick={() => handleItemDelete(item.globalIndex)}
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
              console.log(isDisabled);
              toast.toast({
                title: "카테고리를 1개 이상 추가해주세요",
                duration: 500,
              });
              return;
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
