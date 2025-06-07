import { ReceiveMessageType } from "./ReceiveMessage.type";

export interface ArchiveCreateReqType {
  correspondence: string;
  text: string;
}

export interface ArchiveModalProps {
  open: boolean;
  onClose: () => void;
  existingDescription?: string;
  targetId: string | null;
  correspondence: ReceiveMessageType | null;
  correspondenceRefetch: any;
}
export interface ArchiveReqType {
  correspondence: string;
  text: string;
  id: string;
  archive_details: any;
}