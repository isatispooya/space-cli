import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FormInput } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import React, { useState, useRef } from "react";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { AttachmentResponse } from "../../types/sent/CorrespondenceAttache.type";

interface AttachmentDialogProps {
  open: boolean;
  onClose: () => void;
  onAttachmentAdd: (attachmentData: { name: string; file: string; id: number }) => void;
}

const AttachmentDialog: React.FC<AttachmentDialogProps> = ({
  open,
  onClose,
  onAttachmentAdd,
}) => {
  const [attachmentName, setAttachmentName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: postAttache } = useCorrespondenceAttachment.usePostAttache();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length > 0 && attachmentName) {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", `${attachmentName}`);

        postAttache(formData as unknown as AttachmentResponse, {
          onSuccess: (response) => {
            onAttachmentAdd({
              name: `${attachmentName}`,
              file: response.file,
              id: response.id,
            });
          },
        });
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setAttachmentName("");
    setSelectedFiles([]);
    onClose();
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>انتخاب فایل پیوست</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: "300px",
            my: 2,
          }}
        >
          <FormInput
            label="نام پیوست"
            value={attachmentName}
            onChange={(e) => setAttachmentName(e.target.value)}
            placeholder="نام فایل پیوست را وارد کنید"
          />
          <Box>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonBase
                label="انتخاب فایل‌ها"
                onClick={() => fileInputRef.current?.click()}
                bgColor="#1976d2"
                hoverColor="#1565c0"
              />
            </Box>
          </Box>
          {selectedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                فایل‌های انتخاب شده ({selectedFiles.length}):
              </Typography>
              {selectedFiles.map((file, index) => (
                <Box
                  key={index}
                  sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1, mb: 1 }}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {file.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    حجم: {(file.size / 1024).toFixed(2)} کیلوبایت
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <ButtonBase
                      label="دانلود"
                      onClick={() => handleDownload(file)}
                      bgColor="#10b981"
                      hoverColor="#059669"
                    />
                    <ButtonBase
                      label="حذف"
                      onClick={() => removeFile(index)}
                      bgColor="#ef4444"
                      hoverColor="#dc2626"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonBase
          label="تایید"
          onClick={handleSubmit}
          bgColor="#1976d2"
          hoverColor="#1565c0"
        />
        <ButtonBase
          label="انصراف"
          onClick={handleClose}
          bgColor="#94a3b8"
          hoverColor="#64748b"
        />
      </DialogActions>
    </Dialog>
  );
};

export default AttachmentDialog;
