import {
  Avatar,
  Box,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ChatType } from "../../types";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { server } from "@/api";

const MessageBubble = ({ message }: ChatType["MessageBubbleProps"]) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFileExtension = (filename?: string) => {
    if (!filename) return "";
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  const getFileIcon = () => {
    if (message.attachDetails) {
      const fileExtension = getFileExtension(message.attachDetails.name);

      if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
        return <ImageIcon fontSize="small" />;
      } else if (fileExtension === "pdf") {
        return <PictureAsPdfIcon fontSize="small" />;
      }
      return <InsertDriveFileIcon fontSize="small" />;
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return <AttachFileIcon fontSize="small" />;
    }

    const fileExtension = message.attachmentType || getFileExtension(message.attachment);

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
      return <ImageIcon fontSize="small" />;
    } else if (fileExtension === "pdf") {
      return <PictureAsPdfIcon fontSize="small" />;
    }
    return <InsertDriveFileIcon fontSize="small" />;
  };

  const isImage = () => {
    if (message.attachDetails) {
      const fileExtension = getFileExtension(message.attachDetails.name);
      return ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
    }

    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return false;
    }

    const fileExtension = message.attachmentType || getFileExtension(message.attachment);
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
  };

  const getFileUrl = () => {
    if (message.attachDetails) {
      return message.attachDetails.file;
    }
    
    if (!message.attachment || message.attachment === "در حال آپلود...") {
      return "";
    }
    
    return message.attachment;
  };

  const getFileName = () => {
    if (message.attachDetails) {
      return message.attachDetails.name;
    }
    
    return message.attachmentName || message.attachment?.split("/").pop() || "فایل";
  };

  const getFileSize = () => {
    let size = 0;
    
    if (message.attachDetails) {
      size = message.attachDetails.size;
    } else if (message.attachmentSize) {
      size = message.attachmentSize;
    } else {
      return "";
    }
    
    const sizeInKB = size / 1024;
    if (sizeInKB < 1024) {
      return `${Math.round(sizeInKB)} KB`;
    }
    return `${(sizeInKB / 1024).toFixed(2)} MB`;
  };

  const openFileInNewTab = (url: string) => {
    if (url) {
      window.open(server + url, "_blank");
    }
  };

  const downloadFile = (url: string, fileName: string) => {
    if (url) {
      const link = document.createElement("a");
      link.href = server + url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getBubbleStyles = (isCurrentUser: boolean) => ({
    boxShadow: isCurrentUser
      ? "0 4px 12px rgba(86,119,188,0.2)"
      : "0 2px 10px rgba(0,0,0,0.05)",
    borderRadius: isCurrentUser
      ? "18px 4px 18px 18px"
      : "4px 18px 18px 18px",
    transition: "all 0.3s ease",
    padding: "12px 16px",
    background: isCurrentUser
      ? "linear-gradient(135deg, #5677BC 0%, #09193C 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: isCurrentUser
        ? "0 6px 16px rgba(86,119,188,0.25)"
        : "0 4px 14px rgba(0,0,0,0.08)",
    },
  });

  const renderUploadingFile = () => (
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
  );

  const renderImageFile = () => (
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
        onClick={() => openFileInNewTab(getFileUrl())}
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
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="small"
            onClick={() => openFileInNewTab(getFileUrl())}
            sx={{
              color: message.isCurrentUser ? "white" : "#5677BC",
              opacity: 0.8,
              "&:hover": {
                opacity: 1,
                backgroundColor: message.isCurrentUser
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              },
              mr: 0.5,
            }}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => downloadFile(getFileUrl(), getFileName())}
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
    </Box>
  );

  const renderNormalFile = () => (
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
        onClick={() => openFileInNewTab(getFileUrl())}
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
        <Box sx={{ display: "flex" }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              downloadFile(getFileUrl(), getFileName());
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
    </Box>
  );

  const renderAttachment = () => {
    if (!message.attachment && !message.attachDetails) return null;
    
    if (message.attachment === "در حال آپلود...") {
      return renderUploadingFile();
    }
    
    if (isImage() && !imageError) {
      return renderImageFile();
    }
    
    return renderNormalFile();
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
        sx={getBubbleStyles(message.isCurrentUser)}
      >
        {/* متن پیام */}
        {message.text !== "فایل پیوست" || !message.attachment ? (
          <Typography
            variant="body1"
            className="leading-relaxed"
            sx={{ fontWeight: 400 }}
          >
            {message.text}
          </Typography>
        ) : null}

        {/* فایل پیوست */}
        {renderAttachment()}

        {/* زمان پیام */}
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
