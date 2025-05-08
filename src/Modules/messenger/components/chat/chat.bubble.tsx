import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ChatType } from "../../types";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState } from "react";

const MessageBubble = ({ message }: ChatType["MessageBubbleProps"]) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFileIcon = () => {
    if (message.attachDetails) {
      const fileExtension = message.attachDetails.name
        .split(".")
        .pop()
        ?.toLowerCase();

      if (
        fileExtension &&
        ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
      ) {
        return <ImageIcon fontSize="small" />;
      } else if (fileExtension === "pdf") {
        return <PictureAsPdfIcon fontSize="small" />;
      } else {
        return <InsertDriveFileIcon fontSize="small" />;
      }
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return <AttachFileIcon fontSize="small" />;
    }

    const fileExtension =
      message.attachmentType ||
      message.attachment.split(".").pop()?.toLowerCase();

    if (
      fileExtension &&
      ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
    ) {
      return <ImageIcon fontSize="small" />;
    } else if (fileExtension === "pdf") {
      return <PictureAsPdfIcon fontSize="small" />;
    } else {
      return <InsertDriveFileIcon fontSize="small" />;
    }
  };

  const isImage = () => {
    if (message.attachDetails) {
      const fileExtension = message.attachDetails.name
        .split(".")
        .pop()
        ?.toLowerCase();
      return (
        fileExtension &&
        ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
      );
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return false;
    }

    const fileExtension =
      message.attachmentType ||
      message.attachment.split(".").pop()?.toLowerCase();
    return (
      fileExtension &&
      ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)
    );
  };

  const handleDownload = () => {
    if (message.attachDetails) {
      try {
        const fileUrl = message.attachDetails.file.startsWith("http")
          ? message.attachDetails.file
          : `${window.location.origin}${message.attachDetails.file}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = message.attachDetails.name || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("خطا در دانلود فایل:", error);
        alert("خطا در دانلود فایل. لطفاً دوباره تلاش کنید.");
      }
      return;
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return;
    }

    try {
      const fileUrl = message.attachment.startsWith("http")
        ? message.attachment
        : `${window.location.origin}${message.attachment}`;

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = message.attachmentName || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("خطا در دانلود فایل:", error);
    }
  };

  const getFileUrl = () => {
    if (message.attachDetails) {
      return message.attachDetails.file.startsWith("http")
        ? message.attachDetails.file
        : `${window.location.origin}${message.attachDetails.file}`;
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return "";
    }

    return message.attachment.startsWith("http")
      ? message.attachment
      : `${window.location.origin}${message.attachment}`;
  };

  const getFileName = () => {
    if (message.attachDetails) {
      return message.attachDetails.name;
    }

    return (
      message.attachmentName || message.attachment?.split("/").pop() || "فایل"
    );
  };

  const getFileSize = () => {
    if (message.attachDetails) {
      const sizeInKB = message.attachDetails.size / 1024;
      if (sizeInKB < 1024) {
        return `${Math.round(sizeInKB)} KB`;
      } else {
        return `${(sizeInKB / 1024).toFixed(2)} MB`;
      }
    }

    if (message.attachmentSize) {
      const sizeInKB = message.attachmentSize / 1024;
      if (sizeInKB < 1024) {
        return `${Math.round(sizeInKB)} KB`;
      } else {
        return `${(sizeInKB / 1024).toFixed(2)} MB`;
      }
    }

    return "";
  };

  return (
    <Box
      className={`flex mb-4 ${
        message.isCurrentUser ? "justify-end" : "justify-start"
      }`}
      sx={{
        marginBottom: "16px",
        animation: "fadeIn 0.3s ease-in-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {!message.isCurrentUser && (
        <Avatar
          className="h-9 w-9 ml-2"
          sx={{
            bgcolor: "#5677BC",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            border: "2px solid #f1f5f9",
          }}
        >
          {message.sender.charAt(0)}
        </Avatar>
      )}
      <Box
        className={`max-w-[70%] p-3 rounded-2xl ${
          message.isCurrentUser ? "text-white" : "bg-white"
        }`}
        sx={{
          boxShadow: message.isCurrentUser
            ? "0 4px 12px rgba(86,119,188,0.2)"
            : "0 2px 10px rgba(0,0,0,0.05)",
          borderRadius: message.isCurrentUser
            ? "18px 4px 18px 18px"
            : "4px 18px 18px 18px",
          transition: "all 0.3s ease",
          padding: "12px 16px",
          background: message.isCurrentUser
            ? "linear-gradient(135deg, #5677BC 0%, #09193C 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: message.isCurrentUser
              ? "0 6px 16px rgba(86,119,188,0.25)"
              : "0 4px 14px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Typography
          variant="body1"
          className="leading-relaxed"
          sx={{
            fontWeight: 400,
            display:
              message.text === "فایل پیوست" && message.attachment
                ? "none"
                : "block",
          }}
        >
          {message.text}
        </Typography>

        {/* نمایش فایل پیوست اگر وجود داشته باشد */}
        {(message.attachment || message.attachDetails) && (
          <Box
            sx={{
              marginTop: message.text !== "فایل پیوست" ? "10px" : "0",
              borderRadius: "8px",
              width: "fit-content",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {message.attachment === "در حال آپلود..." ? (
              <Box
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: message.isCurrentUser
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                }}
              >
                {getFileIcon()}
                <Box sx={{ flex: 1, overflow: "hidden" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 500,
                    }}
                  >
                    {getFileName()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: message.isCurrentUser
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.5)",
                    }}
                  >
                    در حال آپلود...
                  </Typography>
                </Box>
                <CircularProgress
                  size={20}
                  thickness={5}
                  sx={{
                    color: message.isCurrentUser ? "white" : "#5677BC",
                    animationDuration: "1s",
                  }}
                />
              </Box>
            ) : isImage() && !imageError ? (
              <Box sx={{ position: "relative", width: "100%" }}>
                {!imageLoaded && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      width: "100%",
                      backgroundColor: message.isCurrentUser
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)",
                      borderRadius: "8px",
                    }}
                  >
                    <CircularProgress
                      size={30}
                      sx={{
                        color: message.isCurrentUser ? "white" : "#5677BC",
                      }}
                    />
                  </Box>
                )}
                <Box
                  component="img"
                  src={getFileUrl()}
                  alt={getFileName()}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sx={{
                    display: imageLoaded ? "block" : "none",
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    objectFit: "contain",
                    backgroundColor: message.isCurrentUser
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    cursor: "pointer",
                  }}
                  onClick={handleDownload}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: message.isCurrentUser
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.5)",
                    }}
                  >
                    {getFileName()}
                    {getFileSize() && ` (${getFileSize()})`}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleDownload}
                    sx={{
                      color: message.isCurrentUser ? "white" : "#5677BC",
                      opacity: 0.8,
                      "&:hover": {
                        opacity: 1,
                        backgroundColor: message.isCurrentUser
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box
                  sx={{
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: message.isCurrentUser
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: message.isCurrentUser
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.08)",
                    },
                  }}
                  onClick={handleDownload}
                >
                  {getFileIcon()}
                  <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: 500,
                      }}
                    >
                      {getFileName()}
                    </Typography>
                    {getFileSize() && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: message.isCurrentUser
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.5)",
                        }}
                      >
                        {getFileSize()}
                      </Typography>
                    )}
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                    sx={{
                      color: message.isCurrentUser ? "white" : "#5677BC",
                      opacity: 0.8,
                      "&:hover": {
                        opacity: 1,
                        backgroundColor: message.isCurrentUser
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: message.isCurrentUser ? "left" : "right",
            color: message.isCurrentUser
              ? "rgba(255,255,255,0.6)"
              : "rgba(0,0,0,0.4)",
            marginTop: "4px",
            fontSize: "0.7rem",
          }}
        >
          {message.timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
