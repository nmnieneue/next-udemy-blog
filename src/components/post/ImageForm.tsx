"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineClose } from "react-icons/ai";

interface ImageUploaderProps {
  imagePreview: string | null;
  error?: string[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
}

export default function ImageUploader({
  imagePreview,
  error,
  fileInputRef,
  onImageChange,
  onImageDelete,
}: ImageUploaderProps) {
  return (
    <div>
      <Label htmlFor="topImage" className="mb-2">
        トップ画像
      </Label>
      <Input
        type="file"
        id="topImage"
        accept="image/*"
        name="topImage"
        ref={fileInputRef}
        onChange={onImageChange}
      />
      {imagePreview && (
        <div className="mt-2 relative w-[200px]">
          <Image
            src={imagePreview}
            alt="プレビュー画像"
            width={0}
            height={0}
            sizes="200px"
            className="w-full h-auto"
            priority
          />
          <Button
            type="button"
            className="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-opacity-75"
            onClick={onImageDelete}
          >
            <AiOutlineClose size={16} />
          </Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
