import { Button } from "../Button/Button";

interface ModalWithCategoryProps {
  onButtonClick: () => void;
}

export const ModalWithVote = ({ onButtonClick }: ModalWithCategoryProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col rounded-[16px] items-center justify-center w-[335px] h-[168px] bg-white p-[12px]">
        <div className="flex items-center justify-center w-full h-[104px]">
          <p className="flex text-center items-center justify-center w-[311px] ">
            후보지가 없는 카테고리가 있어요.
            <br />
            추가 후 다시 눌러주세요!
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-[7px] w-full h-[64px]">
          <Button
            className="w-[152px] h-[52px] bg-[#F0F1F5] hover:bg-[#F0F1F5] active:bg-[#F0F1F5]"
            onClick={onButtonClick}
          >
            <p className="text-[#747B89]">취소</p>
          </Button>
          <Button className="w-[152px] h-[52px]" onClick={onButtonClick}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};
