import {
  SectionPropsType,
  SelectOptionType,
} from "../../types/sent/SenderSection.Type";
import { BaseUserType } from "./sent.type";

export interface CorrespondenceAttachmentType {
  id: number;
  user: BaseUserType;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}
export interface AttachmentType {
  id: number;
  user: BaseUserType;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface AttachmentsPropsType {
  attachments: CorrespondenceAttachmentType[];
}

export interface AttachmentResponseType {
  id: number;
  name: string;
  file: string;
  size: number;
}

export interface AttachmentDialogPropsType {
  open: boolean;
  onClose: () => void;
  onAttachmentAdd: (attachmentData: {
    name: string;
    file: string;
    id: number;
  }) => void;
}

export interface AttachmentSectionPropsType extends SectionPropsType {
  setOpenFileDialog: (open: boolean) => void;
  attachmentOptions: SelectOptionType[];
}

export type CorrespondenceAttachmentsType = CorrespondenceAttachmentType[];
