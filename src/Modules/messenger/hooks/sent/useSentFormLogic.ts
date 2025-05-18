import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { usePosition } from "@/Modules/positions/hooks";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { useSentFormStore } from "../../store/sent/sent.store";
import { PositionType } from "@/Modules/positions/types";

interface CorrespondenceAttachmentType {
  id: number;
  name: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

type CorrespondenceAttachmentsType = CorrespondenceAttachmentType[];

interface ReferenceItemType {
  id: number;
  enabled?: boolean;
  external_text?: string;
  transcript_for?: string;
}

interface ITranscriptResponseType {
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

// واردسازی داده‌های مورد نیاز
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";
import { useReceive } from "../receive";

interface AttachmentDetailType {
  id: number;
  name: string;
  file: string;
  size: number;
}

interface ReferenceDetailType {
  id: number;
  position: number;
}

interface TranscriptDetailType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number;
  user_external?: string;
}

interface TranscriptDirectionsType {
  [key: number]: string;
}

// تعریف نوع استور فرم
interface FormDataType {
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

export const useSentFormLogic = (id: string | undefined) => {
  const {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections,
    handleChange,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,

    setFormData,
    setAttachmentOptions,
  } = useSentFormStore() as unknown as {
    formData: FormDataType;
    openFileDialog: boolean;
    selectedTranscript: number | null;
    transcriptDirections: Record<number, string>;
    handleChange: (name: string, value: unknown) => void;
    handleAttachmentAdd: (attachment: { id: number; name: string }) => void;
    handleAddTranscript: (id: number) => void;
    handleTranscriptToggle: (id: number) => void;
    setOpenFileDialog: (open: boolean) => void;
    setSelectedTranscript: (transcript: string[] | number[] | []) => void;
    setFormData: (data: FormDataType) => void;
    setAttachmentOptions: (options: { label: string; value: string }[]) => void;
  };

  const [useInternalReceiver, setUseInternalReceiver] = useState(
    formData.is_internal ?? true
  );

  const { data: Position } = usePosition.useGet();
  const { data: PositionAll } = usePosition.useGetAll();
  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachmentsType;
    };

  const { data } = useReceive.useGetById(id || "");
  const attachmentOptions = useMemo(
    () =>
      Attache?.map((attachment: CorrespondenceAttachmentType) => ({
        label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
        value: attachment.id.toString(),
      })) || [],
    [Attache]
  );

  const internalUserOptions = useMemo(
    () =>
      (PositionAll as PositionType[])?.map((position) => ({
        label: `${position.user.first_name} ${position.user.last_name} | ${
          position.name || "بدون سمت"
        } | ${position.company_detail?.name || "-"}`,
        value: position.id.toString(),
      })) || [],
    [PositionAll]
  );

  const senderUserOptions = useMemo(
    () =>
      (Position as PositionType[])?.map((position) => ({
        label: `${position.user.first_name} ${position.user.last_name}  | ${
          position.name
        } | ${position.company_detail?.name || "بدون سمت"}`,
        value: position.id.toString(),
      })) || [],
    [Position]
  );

  const senderUserOptionsOut = useMemo(
    () =>
      (Position as PositionType[])?.map((position) => ({
        label: `${position.company_detail?.name || "بدون سمت"}`,
        value: position.id.toString(),
      })) || [],
    [Position]
  );

  const transcriptDirectionsTyped = transcriptDirections as Record<
    number,
    string
  >;

  const transcriptItems = useMemo<ITranscriptResponseType[]>(() => {
    return (formData.reference || []).map((ref: number) => {
      const refNum = Number(ref);
      const referenceItem = formData.referenceData?.find(
        (item: ReferenceItemType) => item.id === refNum
      );
      const isVisible = referenceItem?.enabled !== false;

      const baseItem = {
        id: refNum,
        read_at: null,
        transcript_for: transcriptDirectionsTyped[refNum] || "notification",
        security: !isVisible,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        position: refNum,
        correspondence: Number(id || 0),
      };

      if (refNum < 0 || referenceItem?.external_text) {
        return {
          ...baseItem,
          external_text: referenceItem?.external_text,
        };
      }

      return baseItem;
    });
  }, [
    formData.reference,
    formData.referenceData,
    transcriptDirectionsTyped,
    id,
  ]);

  useEffect(() => {
    if (id && data) {
      const attachmentIds =
        data.attachments_details?.length > 0
          ? data.attachments_details.map((att: AttachmentDetailType) => att.id)
          : data.attachments || [];

      if (data.attachments_details?.length > 0) {
        const attachmentOptions = data.attachments_details.map(
          (att: AttachmentDetailType) => ({
            label: att.name,
            value: att.id.toString(),
          })
        );
        setAttachmentOptions(attachmentOptions);
      }

      const transformedData = {
        subject: data.subject || "",
        text: data.text || "",
        description: data.description || "",
        attachments: attachmentIds,
        receiver: Array.isArray(data.receiver) ? data.receiver : [],
        sender: data.sender_details?.id || 0,
        receiver_internal: data.receiver_internal_details?.id || null,
        receiver_external:
          data.receiver_external_details?.name || data.receiver_external || "",
        is_internal: data.is_internal ?? true,
        postcript: data.postcript || "",
        seal: data.seal ?? false,
        signature: data.signature ?? false,
        letterhead: data.letterhead ?? false,
        binding: data.binding ?? false,
        confidentiality_level: data.confidentiality_level || "",
        priority: data.priority || "",
        kind_of_correspondence: data.kind_of_correspondence || "",
        authority_type: data.authority_type || "new",
        authority_correspondence: data.authority_correspondence || null,
        reference: Array.isArray(data.reference_details)
          ? data.reference_details.map((ref: ReferenceDetailType) => ref.id)
          : Array.isArray(data.reference)
          ? data.reference
          : [],
        transcript: Array.isArray(data.transcript_details)
          ? data.transcript_details.map((t: TranscriptDetailType) => ({
              read_at: t.read_at,
              transcript_for: t.transcript_for || "notification",
              security: t.security ?? false,
              position: t.position,
              correspondence: t.correspondence,
              external_text: t.user_external || undefined,
            }))
          : [],
        published: data.published ?? false,
        referenceData: Array.isArray(data.transcript_details)
          ? data.transcript_details.map((t: TranscriptDetailType) => ({
              id: t.position,
              enabled: !t.security,
              transcript_for: t.transcript_for || "notification",
              external_text: t.user_external,
            }))
          : [],
      };

      setFormData(transformedData);
      setUseInternalReceiver(data.is_internal ?? true);

      // Handle transcript directions
      if (Array.isArray(data.transcript_details)) {
        const directions = data.transcript_details.reduce(
          (acc: TranscriptDirectionsType, t: TranscriptDetailType) => ({
            ...acc,
            [t.position]: t.transcript_for || "notification",
          }),
          {}
        );

        Object.entries(directions).forEach(([id, direction]) => {
          if (typeof direction === "string") {
            console.log(id);
          }
        });
      }
    } else if (!id) {
      setFormData({
        subject: "",
        text: "",
        description: "",
        attachments: [],
        receiver: [],
        sender: undefined as unknown as number,
        receiver_internal: undefined as unknown as number,
        receiver_external: "",
        is_internal: true,
        postcript: "",
        seal: false,
        signature: false,
        letterhead: false,
        binding: false,
        confidentiality_level: "",
        priority: "",
        kind_of_correspondence: "",
        authority_type: "new",
        authority_correspondence: null,
        reference: [],
        transcript: [],
        published: false,
        referenceData: [],
      });
      setUseInternalReceiver(true);
    }
  }, [setFormData, data, id, setAttachmentOptions]);

  useEffect(() => {
    setUseInternalReceiver(formData.is_internal ?? true);
  }, [formData.is_internal]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
  };

  const handleReceiverTypeChange = (type: "internal" | "external") => {
    setUseInternalReceiver(type === "internal");
    handleChange("is_internal", type === "internal");
    if (type === "internal") {
      handleChange("receiver_external", "");
    } else {
      handleChange("receiver_internal", "");
    }
  };

  const getTranscriptName = useCallback(
    (id: number) => {
      const position = (PositionAll as PositionType[])?.find(
        (p) => p.id === id
      );
      return position
        ? `${position.user.first_name} ${position.user.last_name} | ${
            position.name || "بدون سمت"
          } | ${position.company_detail?.name || "-"}`
        : "";
    },
    [PositionAll]
  );

  return {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections: transcriptDirectionsTyped,
    useInternalReceiver,
    handleChange,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
    handleSubmit,
    handleReceiverTypeChange,
    senderUserOptions,
    senderUserOptionsOut,
    internalUserOptions,
    attachmentOptions,
    getTranscriptName,
    transcriptItems,
    data,
    priorityOptions,
    departmentOptions,
    letterTypeOptions,
  };
};
