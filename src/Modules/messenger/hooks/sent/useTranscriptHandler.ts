import { PositionType } from "@/Modules/positions/types";
import { ITranscriptResponseType, ReferenceItemType } from "../../types/sent/sentForm.types";

export const useTranscriptHandler = (
  formData: {
    reference?: number[];
    referenceData?: ReferenceItemType[];
  },
  transcriptDirections: Record<number, string>,
  id?: string
) => {
  const transcriptItems = (formData.reference || []).map((ref: number) => {
    const refNum = Number(ref);
    const referenceItem = formData.referenceData?.find(
      (item: ReferenceItemType) => item.id === refNum
    );
    const isVisible = referenceItem?.enabled !== false;

    const baseItem = {
      id: refNum,
      read_at: null,
      transcript_for: transcriptDirections[refNum] || "notification",
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
  }) as ITranscriptResponseType[];

  const getTranscriptName = (positions: PositionType[], id: number) => {
    const position = positions?.find((p) => p.id === id);
    return position
      ? `${position.user.first_name} ${position.user.last_name} | ${
          position.name || "بدون سمت"
        } | ${position.company_detail?.name || "-"}`
      : "";
  };

  return {
    transcriptItems,
    getTranscriptName,
  };
}; 