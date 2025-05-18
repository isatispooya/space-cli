import React from "react";

export interface AttachmentDetailType {
  id: number;
  name: string;
  file: string;
  size: number;
}

export interface ReferenceDetailType {
  id: number;
  position: number;
}

export interface TranscriptDetailType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number;
  user_external?: string;
}

export interface TranscriptDirectionsType {
  [key: number]: string;
}

export interface CorrespondenceAttachmentType {
  id: number;
  name: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export type CorrespondenceAttachmentsType = CorrespondenceAttachmentType[];

export interface ITranscriptResponseType {
  id?: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number;
  created_at?: string;
  updated_at?: string;
  external_text?: string;
}

export interface TranscriptType {
  position: number;
  transcript_for: string;
  security: boolean;
  correspondence: number | null;
  read_at: string;
  external_text?: string;
}

export type FormValueType = string | number | boolean | string[] | null | undefined;

export interface ReferenceDataItemType {
  id: number;
  enabled?: boolean;
  transcript_for?: string;
  external_text?: string;
}

export interface SentFormDataType {
  subject?: string;
  text?: string;
  description?: string;
  attachments?: string[];
  receiver?: (string | number)[];
  sender?: number;
  receiver_internal?: number | null;
  receiver_external?: string;
  is_internal?: boolean;
  postcript?: string;
  seal?: boolean;
  signature?: boolean;
  letterhead?: boolean;
  binding?: boolean;
  confidentiality_level?: string;
  priority?: string;
  kind_of_correspondence?: string;
  authority_type?: string;
  authority_correspondence?: number | null;
  reference?: (string | number)[];
  transcript?: TranscriptType[];
  published?: boolean;
  referenceData?: ReferenceDataItemType[];
  [key: string]: string[] | string | number | boolean | ReferenceDataItemType[] | TranscriptType[] | (string | number)[] | null | undefined;
}

export interface APIFormDataType {
  subject?: string;
  text?: string;
  description?: string;
  attachments: number[];
  receiver?: number[];
  sender?: number;
  receiver_internal?: number | null;
  receiver_external?: string;
  is_internal?: boolean;
  postcript?: string;
  seal?: boolean;
  signature?: boolean;
  letterhead?: boolean;
  binding?: boolean;
  confidentiality_level?: string;
  priority?: string;
  kind_of_correspondence?: string;
  authority_type?: string;
  authority_correspondence?: number | null;
  reference?: number[];
  transcript?: unknown[];
  published?: boolean;
  id?: number;
}

// تایپ‌های ساختگی برای هماهنگی با store
export type StoreHandleChangeType = (name: string, value: unknown) => void;
export type StoreHandleAddTranscriptType = (externalTranscriptText?: string) => void;
export type StoreHandleTranscriptToggleType = (transcripts: string[]) => void;
export type StoreSetSelectedTranscriptType = (transcripts: string[]) => void;

export interface SentFormLogicReturnType {
  formData: SentFormDataType;
  openFileDialog: boolean;
  selectedTranscript: number | null;
  transcriptDirections: Record<number, string>;
  useInternalReceiver: boolean;
  handleChange: StoreHandleChangeType;
  handleAttachmentAdd: (attachment: CorrespondenceAttachmentType) => void;
  handleAddTranscript: StoreHandleAddTranscriptType;
  handleTranscriptToggle: StoreHandleTranscriptToggleType;
  setOpenFileDialog: (open: boolean) => void;
  setSelectedTranscript: StoreSetSelectedTranscriptType;
  setTranscriptDirection: (id: number, direction: string) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  handleReceiverTypeChange: (type: "internal" | "external") => void;
  senderUserOptions: { label: string; value: string }[];
  senderUserOptionsOut: { label: string; value: string }[];
  internalUserOptions: { label: string; value: string }[];
  attachmentOptions: { label: string; value: string }[];
  getTranscriptName: (id: number) => string;
  transcriptItems: ITranscriptResponseType[];
  data: Record<string, unknown>;
  priorityOptions: { label: string; value: string }[];
  departmentOptions: { label: string; value: string }[];
  letterTypeOptions: { label: string; value: string }[];
}

export interface ReferenceItemType {
  id: number;
  enabled?: boolean;
  external_text?: string;
  transcript_for?: string;
}

export interface FormDataType {
  subject?: string;
  text?: string;
  description?: string;
  attachments: number[];
  receiver: number[];
  sender?: number;
  receiver_internal?: number | null;
  receiver_external?: string;
  is_internal?: boolean;
  postcript?: string;
  seal?: boolean;
  signature?: boolean;
  letterhead?: boolean;
  binding?: boolean;
  confidentiality_level?: string;
  priority?: string;
  kind_of_correspondence?: string;
  authority_type?: string;
  authority_correspondence?: number | null;
  reference?: number[];
  transcript?: unknown[];
  published?: boolean;
  referenceData?: ReferenceItemType[];
} 