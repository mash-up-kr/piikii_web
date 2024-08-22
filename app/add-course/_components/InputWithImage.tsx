"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesChange?: (files: string[]) => void;
}

const InputWithImage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onFilesChange, ...props }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    useEffect(() => {
      if (onFilesChange) {
        onFilesChange(uploadedFiles);
      }
    }, [uploadedFiles, onFilesChange]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files)
          .slice(0, 3 - uploadedFiles.length) // 최대 3개의 파일만 업로드
          .map(
            (file) =>
              `${process.env.NEXT_PUBLIC_DNS_URL}/${URL.createObjectURL(file)}`
          );

        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    };

    const handleDeleteFile = (index: number) => {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
