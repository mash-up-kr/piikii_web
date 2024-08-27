import React, { useState } from "react";

interface InputWithEditImageProps {
  id: string;
  type: string;
  onFilesChange: (formData: FormData) => void;
  multiple?: boolean;
  initialImages?: string[];
}

const InputWithEditImage: React.FC<InputWithEditImageProps> = ({
  id,
  type,
  onFilesChange,
  multiple = false,
  initialImages = [],
}) => {
  const [images, setImages] = useState<string[]>(initialImages);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);

      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append(id, file));
      onFilesChange(formData);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <input
        id={id}
        type={type}
        onChange={handleImageChange}
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
          <div key={index} className="relative">
            <img
              src={image}
              alt={`upload-${index}`}
              className="rounded-lg w-[80px] h-[80px] object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
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
