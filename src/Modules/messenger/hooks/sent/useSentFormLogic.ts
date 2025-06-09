import React from "react";
import { useEffect, useMemo, useCallback } from "react";
import { usePosition } from "@/Modules/positions/hooks";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import { useSentFormStore } from "../../store/sent/sent.store";
import toast from "react-hot-toast";
import { PositionType } from "@/Modules/positions/types";
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";
import { useReceive } from "../receive";
import {
  CorrespondenceAttachmentsType,
  CorrespondenceAttachmentType,
} from "../../types/sent/attachment.type";
import { ITranscriptResponseType } from "../../types/sent/transcript.type";
import { APIFormDataType } from "../../types/sent/sent.type";
import { useLocation } from "react-router-dom";
import {
  ResponseDataType,
  TranscriptDetailType,
  TranscriptDirectionsType,
} from "../../types/logic.type";

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
    setAttachmentOptions,
  } = useSentFormStore();

  const { data: Position } = usePosition.useGet();
  const { data: PositionAll } = usePosition.useGetAll();
  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachmentsType;
    };

  const { data } = useReceive.useGetById(id || "") as {
    data: ResponseDataType;
  };

  const { mutate: updateCorrespondence } =
    useCorrespondenceAttachment.useUpdateCorrespondence();

  const location = useLocation();
  const isInternal = location.pathname !== "/letter/Outform";

  const resetForm = () => {
    setFormData({
      subject: "",
      text: "",
      description: "",
      attachments: [],
      receiver: [],
      sender: 0,
      sender_external: "",
      receiver_internal: 0,
      receiver_external: null,
      is_internal: isInternal ? false : true,
      postcript: "",
      seal: false,
      signature: false,
      letterhead: false,
      binding: false,
      confidentiality_level: "normal",
      priority: "normal",
      kind_of_correspondence: "request",
      authority_type: "new",
      authority_correspondence: null,
      transcript: [],
      published: false,
      referenceData: [],
      reference: [],
      owner: 0,
      transcript_details: [],
    });

    Object.keys(transcriptDirections).forEach((key) => {
      setTranscriptDirection(Number(key), "notification");
    });

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

  const senderSignerOptions = useMemo(
    () =>
      (PositionAll as PositionType[])
        ?.filter((position) => position.signature_holder)
        .map((position) => ({
          label: `${position.user.first_name} ${position.user.last_name}  | ${
            position.name
          } | ${position.company_detail?.name || "بدون سمت"}`,
          value: position.id.toString(),
        })) || [],
    [PositionAll]
  );

  const ownerSignerOptions = useMemo(
    () =>
      (PositionAll as PositionType[])
        ?.filter((position) => position.signature_holder)
        .map((position) => ({
          label: `${position.user.first_name} ${position.user.last_name}  | ${
            position.name
          } | ${position.company_detail?.name || "بدون سمت"}`,
          value: position.user.id.toString(),
        })) || [],
    [PositionAll]
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
    if (id && data?.transcript_details) {
      const currentTimestamp = new Date().toISOString();
      return data.transcript_details.map((detail) => ({
        id: detail.position,
        read_at: detail.read_at,
        transcript_for: detail.transcript_for || "notification",
        security: detail.security ?? false,
        position: detail.position,
        correspondence: detail.correspondence,
        user_external: detail.user_external || undefined,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
      }));
    }
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
        position: referenceItem?.user_external ? null : refNum,
        correspondence: Number(id || 0),
      };

      if (refNum < 0 || referenceItem?.user_external) {
        return {
          ...baseItem,
          id: refNum,
          user_external: referenceItem?.user_external,
        };
      }

      return baseItem;
    });
  }, [
    formData.reference,
    formData.referenceData,
    transcriptDirectionsTyped,
    id,
    data?.transcript_details,
  ]);

  useEffect(() => {
    if (id && data) {
      const attachmentIds =
        data.attachments_details && data.attachments_details.length > 0
          ? data.attachments_details.map((att) => att.id)
          : data.attachments || [];

      if (data.attachments_details && data.attachments_details.length > 0) {
        const attachmentOptions = data.attachments_details.map((att) => ({
          label: att.name,
          value: att.id.toString(),
        }));
        setAttachmentOptions(attachmentOptions);
      }

      const transformedData = {
        subject: data.subject || "",
        text: data.text || "",
        description: data.description || "",
        attachments: attachmentIds,
        receiver: Array.isArray(data.receiver) ? data.receiver : [],
        sender: data.sender_details?.id || 0,
        sender_external: data.sender_external,
        owner: data.owner?.id || 0,
        receiver_internal: data.receiver_internal_details?.id || null,
        receiver_external:
          data.receiver_external_details?.name ||
          data.receiver_external ||
          null,
        is_internal: data.is_internal ?? false,
        postcript: data.postcript || "",
        seal: data.seal ?? false,
        signature: data.signature ?? false,
        letterhead: data.letterhead ?? false,
        binding: data.binding ?? false,
        confidentiality_level: data.confidentiality_level || "normal",
        priority: data.priority || "normal",
        kind_of_correspondence: data.kind_of_correspondence || "request",
        authority_type: data.authority_type || "new",
        authority_correspondence: data.authority_correspondence || null,
        transcript: Array.isArray(data.transcript_details)
          ? data.transcript_details.map((t: TranscriptDetailType) => ({
              read_at: t.read_at,
              transcript_for: t.transcript_for || "notification",
              security: t.security ?? false,
              position: t.position,
              correspondence: t.correspondence,
              user_external: t.user_external || undefined,
            }))
          : [],
        published: data.published ?? false,
        referenceData: Array.isArray(data.transcript_details)
          ? data.transcript_details.map((t: TranscriptDetailType) => ({
              id: t.position,
              enabled: !t.security,
              transcript_for: t.transcript_for || "notification",
              user_external: t.user_external,
            }))
          : [],
      };

      setFormData(transformedData as any);

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
            setTranscriptDirection(Number(id), direction);
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
        sender_external: undefined as unknown as string,
        receiver_internal: undefined as unknown as number,
        receiver_external: null,
        is_internal: isInternal ? false : true,
        postcript: "",
        seal: false,
        signature: false,
        letterhead: false,
        binding: false,
        confidentiality_level: "normal",
        priority: "normal",
        kind_of_correspondence: "request",
        authority_type: "new",
        authority_correspondence: null,
        transcript: [],
        published: false,
        referenceData: [],
        owner: undefined as unknown as number,
      });
    }
  }, [setFormData, data, id, setTranscriptDirection, setAttachmentOptions]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const { ...restFormData } = formData;

    const existingTranscripts = data?.transcript_details || [];

    const existingTranscriptMap = new Map(
      existingTranscripts.map((t) => [t.position, t])
    );

    const apiTranscripts =
      formData.reference
        ?.filter((ref) => {
          const refNum = Number(ref);
          const referenceItem = formData.referenceData?.find(
            (item) => item.id === refNum
          );
          return referenceItem?.enabled !== false;
        })
        .map((ref) => {
          const refNum = Number(ref);
          const referenceItem = formData.referenceData?.find(
            (item) => item.id === refNum
          );
          const isVisible = referenceItem?.enabled !== false;
          const isExternalTranscript =
            refNum < 0 || referenceItem?.user_external;

          const existingTranscript = existingTranscriptMap.get(refNum);

          if (
            existingTranscript &&
            existingTranscript.transcript_for ===
              (transcriptDirectionsTyped[refNum] || "notification") &&
            existingTranscript.security === !isVisible &&
            existingTranscript.user_external ===
              (isExternalTranscript ? referenceItem?.user_external : undefined)
          ) {
            return null;
          }

          return {
            position: isExternalTranscript ? null : refNum,
            transcript_for: transcriptDirectionsTyped[refNum] || "notification",
            security: !isVisible,
            correspondence: Number(id || 0),
            read_at: new Date().toISOString(),
            user_external: isExternalTranscript
              ? referenceItem?.user_external
              : undefined,
          } as TranscriptDetailType;
        })
        .filter((item): item is TranscriptDetailType => item !== null) || [];

    const finalData: APIFormDataType = {
      ...restFormData,
      attachments: restFormData.attachments.map(Number),
      receiver_internal: Number(restFormData.receiver_internal) || null,
      receiver_external: restFormData.receiver_external || null,
      transcript: apiTranscripts,
      owner: Number(restFormData.owner) || null,
      is_internal: location.pathname !== "/letter/Outform",
      sender:
        location.pathname === "/letter/Outform" ? null : restFormData.sender,
    };

    if (id) {
      updateCorrespondence({ ...finalData, reference: [], id: Number(id) });
    } else {
      postCorrespondence(finalData);
    }
  };

  const handleReceiverTypeChange = (type: "internal" | "external") => {
    handleChange("is_internal", type === "internal");
    if (type === "internal") {
      handleChange("receiver_external", null);
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
    setFormData,
    senderSignerOptions,
    ownerSignerOptions,
  };
};
