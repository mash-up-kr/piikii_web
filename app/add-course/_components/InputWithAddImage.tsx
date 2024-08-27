import * as React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesChange?: (formData: FormData) => void;
}

const InputWithAddImage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onFilesChange, ...props }, ref) => {
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
      <div className="flex flex-row items-center gap-x-[9px] gap-y-2 w-full">
        {uploadedFiles.length < 3 && (
          <input
            type="file"
            className={cn("flex rounded-lg border", className)}
            onChange={handleFileChange}
            ref={ref}
            multiple
            {...props}
          />
        )}
        <div className="flex gap-x-[9px] flex-wrap">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative w-[80px] h-[80px]">
              <Image
                src={URL.createObjectURL(file)}
                width={80}
                height={80}
                alt={`uploaded-image-${index}`}
                className="object-cover w-full h-full rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteFile(index)}
                className="absolute top-0 left-0 text-[#FF601C] rounded-full w-4 h-4 flex items-center justify-center text-sm"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

InputWithAddImage.displayName = "InputWithAddImage";

export { InputWithAddImage };
