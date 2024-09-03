"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
interface InputWithEditImageProps {
  id: string;
  type: string;
  onFilesChange: (formData: FormData) => void;
  onDeleteImageUrlsChange: (deleteImageUrls: string[]) => void;
  multiple?: boolean;
  initialImages?: string[];
}

const InputWithEditImage: React.FC<InputWithEditImageProps> = ({
  id,
  type,
  onFilesChange,
  onDeleteImageUrlsChange,
  multiple = false,
  initialImages = [],
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(initialImages);

  useEffect(() => {
    if (initialImages.length) {
      setImages(initialImages);
    }
  }, [initialImages]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newFiles = Array.from(files).slice(0, 3 - uploadedFiles.length); // 최대 3개의 파일
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);

        // FormData 생성 및 파일 추가
        const formData = new FormData();
        updatedFiles.forEach((file) => formData.append("newPlaceImages", file));
        console.log(formData);

        if (onFilesChange) {
          onFilesChange(formData);
        }
      }
    },
    [uploadedFiles, onFilesChange]
  );

  const handleRemoveImage = (index: number, isInitialImage: boolean) => {
    if (isInitialImage) {
      const imageToRemove = images[index];
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((_, i) => i !== index);
        const updatedDeleteUrls = [...deleteImageUrls, imageToRemove];
        setDeleteImageUrls(updatedDeleteUrls);
        onDeleteImageUrlsChange(updatedDeleteUrls);
        return updatedImages;
      });
    } else {
      setUploadedFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter((_, i) => i !== index);
        return updatedFiles;
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <input
        id={id}
        type={type}
        onChange={handleFileChange}
        multiple={multiple}
        className="hidden"
      />
      {images.length < 3 && (
        <label htmlFor={id} className="cursor-pointer">
          <div className="rounded-lg w-[80px] h-[80px] bg-gray-100 flex items-center justify-center">
            <span className="text-red-500">+</span>
          </div>
        </label>
      )}
      <div className="flex flex-row items-center justify-center gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative w-[80px] h-[80px]">
            <Image
              src={image}
              width={80}
              height={80}
              alt={`uploaded-image-${index}`}
              className="rounded-lg w-[80px] h-[80px] object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index, true)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
        {uploadedFiles.map((file, index) => (
          <div key={`uploaded-${index}`} className="relative w-[80px] h-[80px]">
            <Image
              src={URL.createObjectURL(file)}
              width={80}
              height={80}
              alt={`uploaded-image-${index}`}
              className="rounded-lg w-[80px] h-[80px] object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index, false)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[20px] h-[20px] flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputWithEditImage;
