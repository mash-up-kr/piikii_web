import * as React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";

export interface InputWithAddImageProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onFilesChange?: (formData: FormData) => void;
}

const InputWithAddImage = React.forwardRef<
  HTMLInputElement,
  InputWithAddImageProps
>(({ className, id, onFilesChange, ...props }, ref) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files).slice(0, 3 - uploadedFiles.length); // 최대 3개의 파일
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);

        // FormData 생성 및 파일 추가
        const formData = new FormData();
        updatedFiles.forEach((file) => formData.append("placeImages", file));

        if (onFilesChange) {
          onFilesChange(formData);
        }
      }
    },
    [uploadedFiles, onFilesChange]
  );

  const handleDeleteFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);

    const formData = new FormData();
    updatedFiles.forEach((file) => formData.append("placeImages", file));

    if (onFilesChange) {
      onFilesChange(formData);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={ref}
        multiple
        {...props}
      />
      {uploadedFiles.length < 3 && (
        <label htmlFor={id} className="cursor-pointer">
          <div className="rounded-lg w-[80px] h-[80px] bg-gray-100 flex items-center justify-center">
            <span className="text-red-500">+</span>
          </div>
        </label>
      )}
      <div className="flex gap-x-[9px] flex-wrap">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="relative w-[80px] h-[80px]">
            <Image
              src={URL.createObjectURL(file)}
              width={80}
              height={80}
              alt={`uploaded-image-${index}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleDeleteFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

InputWithAddImage.displayName = "InputWithAddImage";

export { InputWithAddImage };
