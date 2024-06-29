import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { Card, CardContent } from "../../ui/card";

interface IconInfo {
  icon: string;
  label: string;
}

interface ItemProps {
  item: string;
  index: number;
}

const Item: React.FC<ItemProps> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    isVisible && (
      <Draggable draggableId={item} index={index}>
        {(provided) => (
          <div
            className="flex flex-row w-[335px] h-[56px] gap-x-[16px] items-center justify-center"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Image
              src="/png/ic_x_16.png"
              alt="x"
              width={16}
              height={16}
              className="flex items-start justify-start"
              priority
              onClick={() => setIsVisible(false)}
            />
            <div>
              <Card className="flex flex-row w-[303px] h-[56px] rounded-[12px] px-[24px] py-[16px]">
                <CardContent className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row w-full items-center justify-between">
                    <div className="flex flex-row items-center justify-center w-full max-w-[59px] h-[24px] gap-x-[6px]">
                      <div className="w-[300px] h-[21px] text-[14px]">
                        {item} {index}
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-[16px] h-[16px]">
                      <Image
                        src="/png/ic_arrow_up_down_16.png"
                        alt="arrow"
                        width={16}
                        height={16}
                        priority
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Draggable>
    )
  );
};
export default Item;
