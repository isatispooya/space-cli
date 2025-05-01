import { useState, useEffect, useMemo, useCallback } from "react";
import { usePosition } from "@/Modules/positions/hooks";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { useSentFormStore } from "../../store/sent/sent.store";
import { useReceiveById } from "../../hooks/receive/useReceive";

import { PositionTypes } from "@/Modules/positions/types";
import {
  CorrespondenceAttachment,
  CorrespondenceAttachments,
  APIFormDataType,
} from "../../types/sent/sent.type";

import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";

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
      data: CorrespondenceAttachments;
    };

  const { data } = useReceiveById(id || "");

  const { mutate: updateCorrespondence } =
    useCorrespondenceAttachment.useUpdateCorrespondence();
  const { mutate: postCorrespondence } =
    useCorrespondenceAttachment.usePostCorrespondence();

  const attachmentOptions = useMemo(() => 
    Attache?.map((attachment: CorrespondenceAttachment) => ({
      label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
      value: attachment.id.toString(),
    })) || [], [Attache]
  );

  const internalUserOptions = useMemo(() => 
    (PositionAll as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [], [PositionAll]
  );

  const senderUserOptions = useMemo(() => 
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [], [Position]
  );

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

    const {...restFormData } = formData;

    const apiTranscripts = formData.reference?.map(ref => ({
      position: Number(ref),
      transcript_for: transcriptDirections[ref.toString()] || "notification",
      security: false,
      correspondence: null,
      read_at: new Date().toISOString(),
    })) || [];

    if (formData.sender && !apiTranscripts.find(t => t.position === formData.sender)) {
      apiTranscripts.unshift({
        position: formData.sender,
        transcript_for: "notification",
        security: false,
        correspondence: null,
        read_at: new Date().toISOString(),
      });
    }

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

  const getTranscriptName = useCallback((id: string): string => {
    const recipient = internalUserOptions.find((option) => option.value === id);
    return recipient ? recipient.label : "";
  }, [internalUserOptions]);

  const transcriptItems = useMemo(() => 
    formData.reference?.map((ref) => ({
      id: ref.toString(),
      enabled: true,
      transcript_for: transcriptDirections[ref.toString()],
    })) || [], [formData.reference, transcriptDirections]
  );

  return {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections,
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