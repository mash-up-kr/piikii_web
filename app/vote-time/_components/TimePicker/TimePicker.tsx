import { memo } from "react";
import Picker from "react-mobile-picker";

interface Selections {
  hour: string[];
  minute: string[];
  ampm: string[];
}

interface TimePickerProps {
  value: {
    hour: string;
    minute: string;
    ampm: string;
  };
  onChange: (newValue: { hour: string; minute: string; ampm: string }) => void;
}

const selections: Selections = {
  ampm: ["오전", "오후"],
  hour: Array.from({ length: 12 }, (_, i) => String(i + 1)),
  minute: Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")),
};

const TimePicker = ({ value, onChange }: TimePickerProps) => {
  return (
    <Picker
      value={value}
      onChange={(newValue) => onChange(newValue)}
      wheelMode="normal"
      height={252}
    >
      {Object.keys(selections).map((name) => (
        <Picker.Column
          key={name}
          name={name as keyof Selections}
          className="z-[99] !flex-initial"
        >
          {(selections[name as keyof Selections] as string[]).map((option) => (
            <Picker.Item key={option} value={option} className="w-[80px]">
              {({ selected }) => (
                <div
                  className={selected ? "text-neutral-900" : "text-neutral-300"}
                >
                  {option}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
      <div className="absolute w-full h-[36px] bg-neutral-100 z-[9] top-[50%] mt-[-18px] rounded-[9px]" />
    </Picker>
  );
};

export default memo(TimePicker);
