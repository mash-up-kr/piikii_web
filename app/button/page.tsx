import { Button } from "@/components/common/Button/Button";
import React from "react";

const ButtonComponentPage = () => {
  return (
    <div className="mt-10 mx-10">
      <Button>버튼</Button>
      <Button variant={"secondary"}>삭제하기</Button>
      <Button variant={"natural"}>투표시작</Button>
    </div>
  );
};

export default ButtonComponentPage;
