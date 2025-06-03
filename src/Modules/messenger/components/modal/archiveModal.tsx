import { TextAreaInput } from "@/components";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import useReceive from "../../hooks/receive/useReceive";
import {
  ArchiveCreateReqType,
  ArchiveModalProps,
} from "../../types/receive/archive";
import { ArchiveReqType } from "../../types/receive/archive";

const ArchiveModal = ({
  open,
  onClose,
  existingDescription = "",
  targetId,
  correspondence,
  correspondenceRefetch,
}: ArchiveModalProps) => {
  const { mutate: postArchive } = useReceive.usePostArchive();
  const { mutate: deleteArchive } = useReceive.useDeleteArchive();

  const [description, setDescription] = useState("");

  const receiverArray = correspondence?.receiver as
    | ArchiveReqType[]
    | undefined;

  const receiverItem = receiverArray?.find((item) => item.id === targetId);

  useEffect(() => {
    if (open) {
      const newText =
        existingDescription || receiverItem?.archive_details?.text || "";
      setDescription(newText);
    }
  }, [open, existingDescription, correspondence, receiverItem]);

  const handleConfirm = () => {
    if (!targetId) return;

    const payload: ArchiveCreateReqType = {
      correspondence: targetId,
      text: description,
    };

    postArchive(payload as any);

    onClose();
    correspondenceRefetch();
  };

  const handleDelete = () => {
    const archiveId = receiverItem?.archive_details?.id;
    if (!archiveId) {
      console.warn("آیتمی برای حذف پیدا نشد.");
      return;
    }
    deleteArchive({ id: archiveId });
    onClose();
    correspondenceRefetch();
  };

  if (!correspondence || !receiverItem) return null;

  const isAlreadyArchived = !!receiverItem.archive_details;

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
          {isAlreadyArchived
            ? "این نامه قبلاً بایگانی شده است. آیا می‌خواهید آن را حذف کنید؟"
            : "آیا می‌خواهید این نامه را بایگانی کنید؟"}
        </Typography>

        <TextAreaInput
          label="توضیحات (اختیاری)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md w-full"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button
            variant={isAlreadyArchived ? "outlined" : "contained"}
            color={isAlreadyArchived ? "error" : "primary"}
            onClick={isAlreadyArchived ? handleDelete : handleConfirm}
          >
            {isAlreadyArchived ? "حذف" : "بایگانی"}
          </Button>
          <Button variant="text" onClick={onClose}>
            انصراف
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ArchiveModal;
