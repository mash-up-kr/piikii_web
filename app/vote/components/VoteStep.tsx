import { ScheduleTypeGroupResponse } from "@/apis/place/types/dto";
import Step from "@/components/common/Step";
import { ColorTheme } from "../model";

interface Props {
  curScheduleIndex: number;
  colorTheme: ColorTheme;
  placeData: ScheduleTypeGroupResponse[];
}

export default function VoteStep({
  curScheduleIndex,
  colorTheme,
  placeData,
}: Props) {
  return (
    <Step
      curStep={curScheduleIndex}
      totalSteps={placeData.length}
      stepActiveClassName={colorTheme.classname.bgActive}
      stepInactiveClassName={colorTheme.classname.bgInactive}
    />
  );
}
