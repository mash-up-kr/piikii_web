import { Button } from "../Button/Button";

interface ModalWithCategoryProps {
  modalText: string;
  onLeftButtonText: string;
  onRightButtonText: string;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

export const ModalWithCategory = ({
  modalText,
  onLeftButtonText,
  onRightButtonText,
  onLeftButtonClick,
  onRightButtonClick,
}: ModalWithCategoryProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col rounded-[16px] items-center justify-center w-[335px] h-[168px] bg-white p-[12px]">
        <div className="flex items-center justify-center w-full h-[104px]">
          <p className="flex items-center justify-center w-[311px] ">
            {modalText}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-[7px] w-full h-[64px]">
          <Button
            className="w-[152px] h-[52px] bg-[#F0F1F5] hover:bg-[#F0F1F5] active:bg-[#F0F1F5]"
            onClick={onLeftButtonClick}
          >
            <p className="text-[#747B89]">{onLeftButtonText}</p>
          </Button>
          <Button className="w-[152px] h-[52px]" onClick={onRightButtonClick}>
            {onRightButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
