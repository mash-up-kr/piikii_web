import NavigationBar from "@/components/common/Navigation/NavigationBar";

export default function SamplePage() {
  return (
    <div>
      <NavigationBar
        title="샘플"
        leftSlot={<div>LEFT</div>}
        rightSlot={<div>RIGHT</div>}
      />
    </div>
  );
}
