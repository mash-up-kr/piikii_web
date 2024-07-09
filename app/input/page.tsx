import { Input } from "@/components/common/Input/Input";
import PasswordKeypad from "@/components/common/PasswordKeypad/PasswordKeypad";
import React from "react";

const InputPage = () => {
  return (
    <div>
      {/* <Input placeholder="모임 날짜와 지역 등 자유롭게 기재하세요" />
      <Input
        placeholder="모임 날짜와 지역 등 자유롭게 기재하세요"
        leftSlot={<div>as</div>}
      /> */}

      <PasswordKeypad />
    </div>
  );
};

export default InputPage;
