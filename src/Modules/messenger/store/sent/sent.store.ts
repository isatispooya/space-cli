import { create } from "zustand";
import {
  FormDataType,
  ReferenceDataType,
  TranscriptDataType,
  SelectOptionType,
} from "../../types/sent/sent.type";

type FormValueType = string | number | boolean | Array<string | number> | null;

interface SentFormStateType {
  formData: FormDataType;
  openFileDialog: boolean;
  selectedTranscript: string[];
  transcriptDirections: Record<number, string>;
  attachmentOptions: SelectOptionType[];
  
  // Actions
  setFormField: <K extends keyof FormDataType>(key: K, value: FormDataType[K]) => void;
  setFormData: (data: Partial<FormDataType>) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  setSelectedTranscript: (transcripts: string[]) => void;
  setTranscriptDirection: (id: number, direction: string) => void;
  setAttachmentOptions: (options: SelectOptionType[]) => void;
  handleFormChange: (name: string, value: FormValueType) => void;
  handleReceiverTypeChange: (type: string) => void;
  handleAttachmentAdd: (attachmentData: { name: string; id: number }) => void;
  handleAddTranscript: (externalTranscriptText?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  resetForm: () => void;
}

const defaultTranscript: TranscriptDataType = {
  read_at: new Date().toISOString(),
  transcript_for: "notification",
  security: false,
  position: 0,
  correspondence: null,
};

const initialFormData: FormDataType = {
  subject: "",
  text: "",
  description: "",
  attachments: [],
  receiver_internal: 0,
  receiver_external: "",
  receiver: [],
  sender: 0,
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
  referenceData: [],
  transcript: [defaultTranscript],
  published: false,
};

export const useSentFormStore = create<SentFormStateType>((set) => ({
  // State
  formData: initialFormData,
  openFileDialog: false,
  selectedTranscript: [],
  transcriptDirections: {},
  attachmentOptions: [],

  setFormField: (key, value) => 
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  setFormData: (data) => 
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setOpenFileDialog: (isOpen) => 
    set(() => ({ openFileDialog: isOpen })),

  setSelectedTranscript: (transcripts) => 
    set(() => ({ selectedTranscript: transcripts })),

  setTranscriptDirection: (id, direction) => 
    set((state) => ({
      transcriptDirections: {
        ...state.transcriptDirections,
        [id]: direction,
      },
    })),

  setAttachmentOptions: (options) => 
    set(() => ({ attachmentOptions: options })),

  handleFormChange: (name, value) => {
    set((state) => {
      if (name === "attachments" && Array.isArray(value) && value.includes("add_attachment")) {
        const filteredValue = value.filter((v) => v !== "add_attachment") as string[];
        
        set((s) => ({ openFileDialog: true }));
        
        return {
          formData: {
            ...state.formData,
            attachments: filteredValue.map(Number),
          },
        };
      }

      if (["sender", "receiver_internal"].includes(name) && typeof value === "string") {
        const numValue = value === "" ? 0 : Number(value);
        
        if (name === "sender") {
          return {
            formData: {
              ...state.formData,
              sender: numValue,
              transcript: state.formData.transcript.map((t: TranscriptDataType) => ({
                ...t,
                position: numValue,
              })),
            },
          };
        }
        
        return {
          formData: {
            ...state.formData,
            [name]: numValue,
          },
        };
      }

      if (["seal", "signature", "letterhead", "binding", "published", "is_internal"].includes(name)) {
        return {
          formData: {
            ...state.formData,
            [name]: Boolean(value),
          },
        };
      }

      if (["reference", "receiver", "attachments"].includes(name)) {
        const arrayValue = Array.isArray(value) ? value : [value];
        return {
          formData: {
            ...state.formData,
            [name]: arrayValue
              .map(v => (typeof v === "string" ? Number(v) : v))
              .filter(Boolean),
          },
        };
      }

      return {
        formData: {
          ...state.formData,
          [name]: value,
        },
      };
    });
  },

  handleReceiverTypeChange: (type) =>
    set((state) => ({
      formData: {
        ...state.formData,
        is_internal: type === "internal",
        receiver_external: type === "external" ? state.formData.receiver_external : "",
        receiver_internal: type === "internal" ? state.formData.receiver_internal : 0,
      },
    })),

  handleAttachmentAdd: (attachmentData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        attachments: [...state.formData.attachments, attachmentData.id],
      },
      openFileDialog: false,
    })),

  handleAddTranscript: (externalTranscriptText) =>
    set((state) => {
      if (state.selectedTranscript.length > 0) {
        const newReferences = state.selectedTranscript
          .filter((id) => !state.formData.reference.includes(Number(id)))
          .map(Number);

        if (newReferences.length > 0) {
          const newReferenceData: ReferenceDataType[] = newReferences.map(
            (id) => ({
              id,
              enabled: true,
              transcript_for: state.transcriptDirections[id] || "",
            })
          );

          const newTranscripts = newReferences.map((refId) => ({
            ...defaultTranscript,
            position: refId,
            transcript_for: state.transcriptDirections[refId] || "notification",
          }));

          return {
            formData: {
              ...state.formData,
              reference: [...state.formData.reference, ...newReferences],
              referenceData: [
                ...(state.formData.referenceData || []),
                ...newReferenceData,
              ],
              transcript: [...state.formData.transcript, ...newTranscripts],
            },
          };
        }
      } 
      else if (externalTranscriptText?.trim()) {
        const externalId = -Date.now(); 

        const newReferenceData: ReferenceDataType = {
          id: externalId,
          enabled: true,
          transcript_for: "notification",
          external_text: externalTranscriptText,
        };

        const newTranscript = {
          ...defaultTranscript,
          position: externalId,
          transcript_for: "notification",
          external_text: externalTranscriptText,
        };

        return {
          formData: {
            ...state.formData,
            reference: [...state.formData.reference, externalId],
            referenceData: [
              ...(state.formData.referenceData || []),
              newReferenceData,
            ],
            transcript: [...state.formData.transcript, newTranscript],
          },
        };
      }

      return state;
    }),

  handleTranscriptToggle: (id) =>
    set((state) => {
      const referenceData = state.formData.referenceData || [];
      const existingItem = referenceData.find((item: ReferenceDataType) => item.id === id);

      const updatedReferenceData = existingItem
        ? referenceData.map((item: ReferenceDataType) =>
            item.id === id ? { ...item, enabled: !item.enabled } : item
          )
        : [
            ...referenceData,
            {
              id,
              enabled: true,
              transcript_for: state.transcriptDirections[id] || "",
            },
          ];

      return {
        formData: {
          ...state.formData,
          referenceData: updatedReferenceData,
        },
      };
    }),

  resetForm: () =>
    set(() => ({
      formData: initialFormData,
      openFileDialog: false,
      selectedTranscript: [],
      transcriptDirections: {},
    })),
}));
