import * as React from "react";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./DraggableColumn";
import { Columns } from "@/app/test/page";

export default function CardWithSelectedCourse({ data }: { data: Columns }) {
  const [columns, setColumns] = useState(data);

  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log("onDragEnd", data);

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (!start || !end) return;

    if (start === end) {
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );
      const [movedItem] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, movedItem);

      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
    } else {
      const startList = Array.from(start.list);
      const [movedItem] = startList.splice(source.index, 1);

      const endList = Array.from(end.list);
      endList.splice(destination.index, 0, movedItem);

      const newStartCol = {
        id: start.id,
        list: startList,
      };

      const newEndCol = {
        id: end.id,
        list: endList,
      };

      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {Object.values(columns).map((col) => (
          <Column col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
}

// interface RowProps {
//   col: {
//     id: string;
//     list: string[];
//   };
// }

// //list: id / info : list로 치환 필요
// export const CardWithSelectedCourse: React.FC<RowProps> = ({
//   col: { id, list },
// }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   return (
//     isVisible && (
//       <div className="flex flex-row w-[335px] h-[56px] gap-x-[16px] items-center justify-center">
//         <Image
//           src="/png/ic_x_16.png"
//           alt="x"
//           width={16}
//           height={16}
//           className="flex items-start justify-start"
//           priority
//           onClick={() => setIsVisible(false)}
//         />
//         {list.map((icon, label) => (
//           <Card className="flex flex-row w-[303px] h-[56px] rounded-[12px] px-[24px] py-[16px]">
//             <CardContent className="flex flex-row w-full items-center justify-between">
//               <div className="flex flex-row w-full items-center justify-between">
//                 <div className="flex flex-row items-center justify-center w-[47px] h-[24px] gap-x-[6px]">
//                   <div key={id} className="w-[16px] h-full">
//                     {icon}
//                   </div>
//                   <div className="w-[25px] h-[21px] text-[14px]">{label}</div>
//                 </div>
//                 <div className="flex items-center justify-center w-[16px] h-[16px]">
//                   <Image
//                     src="/png/ic_arrow_up_down_16.png"
//                     alt="arrow"
//                     width={16}
//                     height={16}
//                     priority
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     )
//   );
// };

// export default CardWithSelectedCourse;
