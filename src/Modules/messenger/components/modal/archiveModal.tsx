import { TextAreaInput } from "@/components";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";

const ArchiveModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [description, setDescription] = useState("");

  const handleConfirm = () => {
    console.log(description);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          minWidth: 400,
        }}
      >
        <Typography variant="body2" mb={2} textAlign="center">
          آیا می‌خواهید این نامه را بایگانی کنید؟
        </Typography>

        <TextAreaInput
          label="توضیحات (اختیاری)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md w-full"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            بایگانی
          </Button>
          <Button variant="outlined" color="error" onClick={onClose}>
            انصراف
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ArchiveModal;
