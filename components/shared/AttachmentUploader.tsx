import { convertFileToUrl } from "@/lib/utils";
import { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

interface AttachmentUploadProps {
  setFiles: Dispatch<SetStateAction<File[]>>;
  onFileSelect: (value: string) => void;
}

const AttachmentUploader = ({
  setFiles,
  onFileSelect,
}: AttachmentUploadProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    // Process each file and call onFileSelect for each file
    acceptedFiles.forEach((file) => {
      onFileSelect(convertFileToUrl(file));
    });
    // onFileSelect(convertFileToUrl(acceptedFiles[0]));
  }, []);

  // Define file types
  const fileTypes = "image/*";

  //   accept file types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept([fileTypes]) : undefined,
  });

  return (
    <div {...getRootProps()} className="">
      <input {...getInputProps()} />

      <Image
        src="/assets/icons/gallery.svg"
        alt="gallery"
        width={22}
        height={22}
        className="object-contain cursor-pointer"
      />
    </div>
  );
};

export default AttachmentUploader;
