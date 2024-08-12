"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesChange?: (files: string[]) => void;
}

const InputWithImage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onFilesChange, ...props }, ref) => {
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [pendingFiles, setPendingFiles] = useState<string[]>([]);

    useEffect(() => {
      if (pendingFiles.length > 0 && onFilesChange) {
        onFilesChange([...uploadedFiles, ...pendingFiles]);
        setUploadedFiles((prevFiles) =>
          [...prevFiles, ...pendingFiles].slice(0, 3)
        );
        setPendingFiles([]);
      }
    }, [pendingFiles, onFilesChange, uploadedFiles]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setPendingFiles(newFiles);
      }
    };

    const handleDeleteFile = (index: number) => {
      setUploadedFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter((_, i) => i !== index);
        if (onFilesChange) {
          onFilesChange(updatedFiles);
        }
        return updatedFiles;
      });
    };

    return (
      <div className="flex flex-row items-center gap-x-[9px] gap-y-2 w-full">
        {uploadedFiles.length < 3 && (
          <input
            type={type}
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
