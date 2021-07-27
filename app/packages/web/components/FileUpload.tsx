import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export type ChangeFn = (files: File[]) => void
export const FileUpload = (props: {
  children?: React.ReactNode
  accept?: string;
  onChange?: ChangeFn;
}) => {
  const { onChange, accept } = props;
  const onDrop = useCallback((acceptedFiles) => {
    onChange && onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
    >
      <input {...getInputProps()} accept={accept} />
      { props.children }
    </div>
  );
}
export default FileUpload
