"use client";
import Image from "next/image";
import React, { forwardRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import demoImage from "@/assets/category/fantasy.webp";

const AdminFileUploader = function AdminFileUploaderBase({
  id,
  label = "Enter your label",
  required = true,
  info,
  error,
  maxWidth = "50rem",
  onDrop,
  maxSize = 1000000,
  previewImg,
  setPreviewImg,
}) {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      const files = acceptedFiles;

      if (files.length && files[0]) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImg(reader.result);
          onDrop(acceptedFiles);
        };

        reader.readAsDataURL(files[0]);
      } else {
        setPreviewImg(null);
      }
    },
    [onDrop, setPreviewImg]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxSize: maxSize,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const handleChange = () => {
    console.log("value change");
  };

  return (
    <div
      style={{
        maxWidth,
      }}
    >
      <label className="text-[#222222] text-sm s380:text-base duration-150">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>

      {info ? (
        <p className="text-[#444444] text-xs select-none">
          Please upload a image for your category.
        </p>
      ) : null}

      {/* drag and drop zone */}
      <div className="flex items-center justify-center w-full mt-1">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center w-full aspect-square border-2  border-dashed cursor-pointer  hover:bg-gray-100 relative bg-gray-50 ${
            error ? "border-red-600" : "border-gray-300"
          }`}
        >
          {previewImg && (
            <div className="absolute left-0 top-0 w-full h-full opacity-50">
              <Image
                width={500}
                height={500}
                alt="img"
                src={previewImg}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
            <MdOutlineFileUpload className="text-5xl text-gray-500" />
            {isDragActive ? (
              <p className="mb-2 text-sm text-gray-500 text-center">
                <span className="font-semibold">Drag the file here</span>
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 text-center">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            )}
            <p className="text-xs text-gray-500 text-center">
              PNG, JPG, Webp (Ratio 800x800px), Size under 1MB
            </p>
          </div>

          <input {...getInputProps()} id={id} type="file" className="hidden" />
        </div>
      </div>
      {error ? (
        <p className="text-red-600 text-xs mt-1">{error?.message}</p>
      ) : null}
    </div>
  );
};

export default AdminFileUploader;
