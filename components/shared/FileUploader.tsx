import { Dispatch, SetStateAction, useCallback } from "react";

interface FileUploadProps {
  onFieldChange: (value: string) => void;
  photoUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import { FileWithPath } from "@uploadthing/react";
import Image from "next/image";

const FileUploader = ({
  onFieldChange,
  photoUrl,
  setFiles,
}: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  // Define file types
  const fileTypes = "image/*";

  //   accept file types
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept([fileTypes]) : undefined,
  });

  return (
    <>
      {/* <div className="flex gap-10"> */}
      <div
        {...getRootProps()}
        className="h-[150px] w-[150px] flex items-center rounded-full"
      >
        <input {...getInputProps()} />
        {/* <input {...getInputProps()} /> */}

        <div className="group w-full h-full flex items-center justify-center bg-dark-4/70 rounded-full cursor-pointer relative">
          <div className="w-full h-full bg-dark-1/30 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 absolute transition-opacity duration-75" />
          <div className="w-full h-full flex items-center justify-center rounded-full">
            <Image
              src="/assets/icons/camera.svg"
              alt="camera"
              width={25}
              height={25}
              style={{ borderRadius: "100%" }}
              className="object-contain absolute flex items-center justify-center group-hover:opacity-80 opacity-0 filter brightness-[10]"
            />
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt="image"
                width={250}
                height={250}
                style={{ borderRadius: "100%" }}
              />
            ) : (
              <Image
                src="/assets/icons/profile.svg"
                alt="profile"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div className="mt-6"></div>
      </div> */}
    </>
  );
};

export default FileUploader;
