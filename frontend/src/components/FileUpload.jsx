import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";
import { notify } from "../utils/toast";
import { validateFile } from "../utils/validation";

export const FileUpload = ({ onFileChange }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    try {
      console.log("Accepted files:", acceptedFiles);
      console.log("Rejected files:", rejectedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(file =>
          notify.error(`${file.file.name}: Unsupported file type or size.`)
        );
        return;
      }

      if (acceptedFiles.length === 0) {
        notify.error("No valid files to process.");
        console.warn("No files in acceptedFiles array.");
        return;
      }

      const file = acceptedFiles[0];
      console.log("Processing file:", file);

      const errors = validateFile(file);
      if (errors.length > 0) {
        errors.forEach(error => notify.error(error));
        return;
      }

      onFileChange(file);
    } catch (error) {
      notify.error("Error handling file upload. Please try again.");
      console.error("File upload error:", error);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragReject ? "border-red-500 bg-red-50" :
            isDragActive ? "border-blue-500 bg-blue-50" : 
            "border-gray-300 hover:border-blue-400"}`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt
          className={`mx-auto h-12 w-12 ${
            isDragReject ? "text-red-400" :
            isDragActive ? "text-blue-400" : 
            "text-gray-400"
          }`}
        />
        <p
          className={`mt-2 text-sm ${
            isDragReject ? "text-red-600" :
            isDragActive ? "text-blue-600" : 
            "text-gray-600"
          }`}
        >
          {isDragReject
            ? "Invalid file type. Only PDF files are accepted."
            : isDragActive
            ? "Drop the file here..."
            : "Drag 'n' drop your brand document, or click to select"}
        </p>
        <p className="mt-1 text-xs text-gray-500">Supports PDF files up to 10MB</p>
      </div>
    </motion.div>
  );
};
