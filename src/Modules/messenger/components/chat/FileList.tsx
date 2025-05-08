import React from "react";
import { Box } from "@mui/material";

interface FileListProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

// کامپوننت نمایش فایل‌های انتخاب شده
const FileList: React.FC<FileListProps> = ({ files, setFiles }) => {
  if (files.length === 0) return null;
  
  return (
    <Box
      className="p-2 bg-blue-50 flex flex-wrap gap-2"
      sx={{
        borderTop: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {files.map((file: File, index: number) => (
        <div
          key={index}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center"
        >
          {file.name}
          <button
            className="ml-1 text-blue-600 hover:text-blue-800"
            onClick={() =>
              setFiles(files.filter((_: File, i: number) => i !== index))
            }
          >
            ×
          </button>
        </div>
      ))}
    </Box>
  );
};

export default FileList; 