import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "./DraggableItem";

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="flex flex-col">
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col w-full gap-y-[20px]"
          >
            {list.map((item, index) => (
              <Item key={item} item={item} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
