import MotionCard from "./components/MotionCard";
import MotionCardContainer from "./components/MotionCardContainer";

export default function Page() {
  return (
    <div className="h-dvh">
      {/* Header Progress */}
      {/* - 차수 기준 */}

      {/* Title Section */}
      {/* - 현 차수 기준으로 타이틀 렌더링 */}

      {/* Card Section */}
      {/* - 카드는 현 차수 기준으로 로드 후 보류가 있으면 그 다음 보류 처리 */}
      <MotionCardContainer />

      {/* Action Buttons */}
      {/* - X, 보류, O */}
    </div>
  );
}
