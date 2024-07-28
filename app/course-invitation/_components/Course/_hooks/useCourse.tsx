import { useMemo } from "react";
import Image from "next/image";
import { useBadgeContext } from "@/providers/badge-store-provider";
import { useToast } from "@/components/common/Toast/use-toast";
import { StepType } from "../../_hooks/useCourseInvitation";

export type BadgeInfoType = {
  icon?: string;
  label?: string;
  type?: string;
  id?: number;
  iconImage?: React.ReactNode;
};

export type BadgeType = BadgeInfoType;

export type BadgeMapKeyType = "food" | "dessert" | "beer" | "play";

export type BadgeMapType = Map<BadgeMapKeyType, BadgeType[]>;

export interface UseCourseProps {
  handleStep: (step: StepType) => void;
}

const BADGE_INIT_DATA: BadgeType = {
  id: 0,
  iconImage: (
    <Image
      src="/gif/question_mark.gif"
      width={16}
      height={16}
      alt="question_mark.gif"
    />
  ),
};

const useCourse = ({ handleStep }: UseCourseProps) => {
  const toast = useToast();
  const { badgeList, list, addBadge, removeBadge } = useBadgeContext();

  const isAllCategoriesEmpty = useMemo(() => {
    return Array.from(badgeList.values()).every((value) => value.length === 0);
  }, [badgeList]);

  const handleNext = () => {
    if (list.length === 0) {
      toast.toast({
        title: "약속 순서를 선택하세요",
        duration: 500,
      });
      return;
    }
    handleStep("invitation");
  };

  return {
    badgeList,
    BADGE_INIT_DATA,
    list,
    isAllCategoriesEmpty,
    addBadge,
    removeBadge,
    handleNext,
  };
};

export default useCourse;
