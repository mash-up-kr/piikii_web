import { CategoryChoiceState } from "./model";

const TEST_OPTION_DATA = {
  rating: 4.5,
  images: [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ],
  state: CategoryChoiceState.PENDING,
};

export const TEMP_ROOM_CATEGORIES = [
  {
    id: 1,
    stageName: "1차 식당",
    options: [
      {
        id: 1,
        index: 0,
        name: "한식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 2,
        index: 1,
        name: "중식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 3,
        index: 2,
        name: "양식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 4,
        index: 3,
        name: "일식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 5,
        index: 4,
        name: "분식",
        ...TEST_OPTION_DATA,
      },
    ],
  },
  {
    id: 2,
    stageName: "2차 술집",
    options: [
      {
        id: 1,
        index: 0,
        name: "한식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 2,
        index: 1,
        name: "중식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 3,
        index: 2,
        name: "양식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 4,
        index: 3,
        name: "일식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 5,
        index: 4,
        name: "분식",
        ...TEST_OPTION_DATA,
      },
    ],
  },
  {
    id: 3,
    stageName: "3차 카페",
    options: [
      {
        id: 1,
        index: 0,
        name: "한식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 2,
        index: 1,
        name: "중식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 3,
        index: 2,
        name: "양식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 4,
        index: 3,
        name: "일식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 5,
        index: 4,
        name: "분식",
        ...TEST_OPTION_DATA,
      },
    ],
  },
  {
    id: 4,
    stageName: "4차 멍멍",
    options: [
      {
        id: 1,
        index: 0,
        name: "한식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 2,
        index: 1,
        name: "중식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 3,
        index: 2,
        name: "양식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 4,
        index: 3,
        name: "일식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 5,
        index: 4,
        name: "분식",
        ...TEST_OPTION_DATA,
      },
    ],
  },
  {
    id: 5,
    stageName: "5차 냥냥",
    options: [
      {
        id: 1,
        index: 0,
        name: "한식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 2,
        index: 1,
        name: "중식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 3,
        index: 2,
        name: "양식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 4,
        index: 3,
        name: "일식",
        ...TEST_OPTION_DATA,
      },
      {
        id: 5,
        index: 4,
        name: "분식",
        ...TEST_OPTION_DATA,
      },
    ],
  },
];
