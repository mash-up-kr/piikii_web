import { Input } from "@/components/common/Input/Input";
import React from "react";

const InputPage = () => {
  return (
    <div className="p-20">
      <Input placeholder="모임 날짜와 지역 등 자유롭게 기재하세요" />
      <Input
        placeholder="모임 날짜와 지역 등 자유롭게 기재하세요"
        leftSlot={<div>as</div>}
      />
    </div>
  );
};

export default InputPage;
