import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { usePosition } from "@/Modules/positions/hooks";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { useSentFormStore } from "../../store/sent/sent.store";

import toast from "react-hot-toast";

import { PositionType } from "@/Modules/positions/types";
import {
  CorrespondenceAttachmentType,
  CorrespondenceAttachmentsType,
  APIFormDataType,
  ITranscriptResponseType,
} from "../../types/sent/sent.type";

import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";
import { useReceive } from "../receive";

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
    setTranscriptDirection,
    setFormData,
  } = useSentFormStore();

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

  const { mutate: updateCorrespondence } =
    useCorrespondenceAttachment.useUpdateCorrespondence();

  const resetForm = () => {
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
    });
    setUseInternalReceiver(true);
    toast.success("اطلاعات با موفقیت ثبت شد");
  };

  const { mutate: postCorrespondence } =
    useCorrespondenceAttachment.usePostCorrespondence({
      onSuccess: resetForm,
      onError: () => {
        toast.error("خطایی رخ داد");
      },
    });

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
          position.name
        }  | ${position.company_detail?.name || "بدون سمت"}`,
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
    return (formData.reference || []).map((ref) => {
      const refNum = Number(ref);
      const referenceItem = formData.referenceData?.find(
        (item) => item.id === refNum
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
    if (id && data?.sender) {
      setFormData({
        ...data.sender,
        sender: data.sender.sender_details?.id.toString(),
        receiver_internal: data.sender.receiver_internal_details?.id.toString(),
        receiver_external:
          data.sender.receiver_external_details?.name ||
          data.sender.receiver_external,
      });
      setUseInternalReceiver(data.sender.is_internal);
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
      });
      setUseInternalReceiver(true);
    }
  }, [setFormData, data, id]);

  useEffect(() => {
    setUseInternalReceiver(formData.is_internal ?? true);
  }, [formData.is_internal]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const { ...restFormData } = formData;

    const apiTranscripts =
      formData.reference?.map((ref) => {
        const refNum = Number(ref);
        const referenceItem = formData.referenceData?.find(
          (item) => item.id === refNum
        );
        const isVisible = referenceItem?.enabled !== false;

        const isExternalTranscript = refNum < 0 || referenceItem?.external_text;

        return {
          position: refNum,
          transcript_for: transcriptDirectionsTyped[refNum] || "notification",
          security: !isVisible,
          correspondence: null,
          read_at: new Date().toISOString(),
          external_text: isExternalTranscript
            ? referenceItem?.external_text
            : undefined,
        };
      }) || [];

    const finalData: APIFormDataType = {
      ...restFormData,
      attachments: restFormData.attachments.map(Number),
      receiver_internal: Number(restFormData.receiver_internal) || null,
      transcript: apiTranscripts,
    };

    if (id) {
      updateCorrespondence({ ...finalData, id: Number(id) });
    } else {
      postCorrespondence(finalData);
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
            position.user.uniqueIdentifier
          } | ${position.name || "بدون سمت"} `
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
    setTranscriptDirection,
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
