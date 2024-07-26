import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputWithImage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setUploadedFiles((prevFiles) =>
          [...prevFiles, ...newFiles].slice(0, 3)
        );
      }
    };

    const handleDeleteFile = (index: number) => {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
      <div className="flex flex-row items-center gap-x-[9px] gap-y-2 w-full">
        {uploadedFiles.length < 3 && (
          <input
            type={type}
            // 수정 필요
            className={cn("flex rounded-lg border", className)}
            onChange={handleFileChange}
            ref={ref}
            {...props}
          />
        )}
        <div className="flex gap-x-[9px] flex-wrap">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative w-[80px] h-[80px]">
              <img
                src={file}
                alt={`${file}`}
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

InputWithImage.displayName = "InputWithImage";

export { InputWithImage };
