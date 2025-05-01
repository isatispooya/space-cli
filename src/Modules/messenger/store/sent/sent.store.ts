import { create } from "zustand";
import { FormDataType, ReferenceData, TranscriptData } from "../../types/sent/CorrespondenceAttache.type";

interface SentFormState {
  formData: FormDataType;
  openFileDialog: boolean;
  selectedTranscript: string[];
  transcriptDirections: { [id: string]: string };
  setFormData: (data: Partial<FormDataType>) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  setSelectedTranscript: (transcripts: string[]) => void;
  setTranscriptDirection: (id: string, direction: string) => void;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  handleReceiverTypeChange: (type: string) => void;
  handleAttachmentAdd: (attachmentData: {
    name: string;
    file: string;
    id: number;
  }) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  resetForm: () => void;
}

const defaultTranscript: TranscriptData = {
  read_at: new Date().toISOString(),
  transcript_for: "notification",
  security: false,
  position: 0,
  correspondence: null
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

export const useSentFormStore = create<SentFormState>((set) => ({
  formData: initialFormData,
  openFileDialog: false,
  selectedTranscript: [],
  transcriptDirections: {},

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setOpenFileDialog: (isOpen) =>
    set(() => ({
      openFileDialog: isOpen,
    })),

  setSelectedTranscript: (transcripts) =>
    set(() => ({
      selectedTranscript: transcripts,
    })),
    
  setTranscriptDirection: (id, direction) =>
    set((state) => {
      if (direction) {
        return {
          transcriptDirections: { ...state.transcriptDirections, [id]: direction },
          formData: {
            ...state.formData,
            transcript: state.formData.transcript.map(t => ({
              ...t,
              transcript_for: direction
            }))
          }
        };
      }
      return {
        transcriptDirections: { ...state.transcriptDirections, [id]: direction }
      };
    }),

  handleChange: (name, value) => {
    set((state) => {
      if (name === "attachments") {
        if (Array.isArray(value) && value.includes("add_attachment")) {
          state.setOpenFileDialog(true);
          const filteredValue = value.filter((v) => v !== "add_attachment");
          return {
            formData: {
              ...state.formData,
              attachments: filteredValue.map(Number),
            },
          };
        }
      }
      
      if (name === "sender" && typeof value === "string") {
        const numValue = Number(value);
        return {
          formData: {
            ...state.formData,
            sender: numValue,
            transcript: state.formData.transcript.map(t => ({
              ...t,
              position: numValue
            }))
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
        receiver_external: type,
      },
    })),

  handleAttachmentAdd: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        attachments: [...state.formData.attachments, Date.now()],
      },
    })),

  handleAddTranscript: () =>
    set((state) => {
      if (state.selectedTranscript.length > 0) {
        const newReferences = state.selectedTranscript
          .filter((id) => !state.formData.reference.includes(Number(id)))
          .map((id) => Number(id));

        if (newReferences.length > 0) {
          const newReferenceData: ReferenceData[] = newReferences.map(id => ({
            id: id,
            enabled: true,
            transcript_for: state.transcriptDirections[id.toString()] || ""
          }));
          
          const newTranscripts = newReferences.map(refId => ({
            ...defaultTranscript,
            position: refId,
            transcript_for: state.transcriptDirections[refId.toString()] || "notification"
          }));
          
          return {
            formData: {
              ...state.formData,
              reference: [...state.formData.reference, ...newReferences],
              referenceData: [...(state.formData.referenceData || []), ...newReferenceData],
              transcript: newTranscripts
            },
          };
        }
      }
      return state;
    }),

  handleTranscriptToggle: (id) =>
    set((state) => {
      const numId = Number(id);
      const referenceData = state.formData.referenceData || [];
      const existingItem = referenceData.find(item => item.id === numId);
      
      let updatedReferenceData;
      if (existingItem) {
        updatedReferenceData = referenceData.map(item =>
          item.id === numId ? { ...item, enabled: !item.enabled } : item
        );
      } else {
        updatedReferenceData = [
          ...referenceData,
          {
            id: numId,
            enabled: true,
            transcript_for: state.transcriptDirections[id]
          }
        ];
      }

      const updatedReference = Array.from(new Set([
        ...state.formData.reference,
        numId
      ]));
      
      const existingTranscript = state.formData.transcript.find(t => t.position === numId);
      let updatedTranscripts;
      
      if (existingTranscript) {
        updatedTranscripts = state.formData.transcript.map(t =>
          t.position === numId
            ? { ...t, transcript_for: state.transcriptDirections[id] || t.transcript_for }
            : t
        );
      } else {
        updatedTranscripts = [
          ...state.formData.transcript,
          {
            ...defaultTranscript,
            position: numId,
            transcript_for: state.transcriptDirections[id] || "notification"
          }
        ];
      }
      
      return {
        formData: {
          ...state.formData,
          reference: updatedReference,
          referenceData: updatedReferenceData,
          transcript: updatedTranscripts
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
