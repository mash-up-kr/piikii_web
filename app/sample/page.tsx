import NavigationBar from "@/components/common/Navigation/NavigationBar";
import Step from "@/components/common/Step";

export default function SamplePage() {
  return (
    <div>
      <NavigationBar
        title="샘플"
        leftSlot={<div>LEFT</div>}
        rightSlot={<div>RIGHT</div>}
      />

      <div className="pt-[60px]">
        <Step curStep={1} totalSteps={4} />
      </div>
    </div>
  );
}
