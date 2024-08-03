import { RegisterScheduleRequest } from "@/apis/schedule/types/dto";
import { BadgeInfoType, BadgeType } from "@/providers/badge-provider";

export const transformBadge = (
  badge: BadgeInfoType,
  type: "create" | "update" = "create"
): RegisterScheduleRequest => {
  const typeMap: { [key: string]: string } = {
    dessert: "DESSERT",
    beer: "ALCOHOL",
    play: "ARCADE",
    food: "DISH",
  };

  return {
    scheduleId: type === "create" ? undefined : badge.id,
    name: badge.label || "",
    type: typeMap[badge.type || ""] || "UNKNOWN",
    sequence: badge.id || -1,
  };
};

export const transformBadgesToSchedule = (
  badges: BadgeType[],
  index = 0,
  result: RegisterScheduleRequest[] = []
): RegisterScheduleRequest[] => {
  if (index >= badges.length) {
    return result;
  }

  const badge = badges[index];
  const schedule = transformBadge(badge, "create");
  result.push(schedule);

  return transformBadgesToSchedule(badges, index + 1, result);
};
