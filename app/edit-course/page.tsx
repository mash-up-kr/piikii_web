import React from "react";
import DragAndDropArea, { ColumnsType } from "./_components/DragAndDropArea";

// 사용자가 설정한 데이터라고 가정
const initialColumns: ColumnsType = {
  course: {
    id: "course",
    list: {
      food: [
        { globalIndex: 0, title: "음식", type: "food", icon: "🍔" },
        { globalIndex: 2, title: "음식", type: "food", icon: "🍔" },
      ],
      dessert: [
        { globalIndex: 1, title: "디저트", type: "dessert", icon: "🥨" },
      ],
      beer: [],
      play: [],
    },
  },
};

const EditCoursePage = () => {
  return <DragAndDropArea initialColumns={initialColumns} />;
};

export default EditCoursePage;
