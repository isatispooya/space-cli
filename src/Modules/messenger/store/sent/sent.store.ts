import { create } from "zustand";
import { FormDataType, ReferenceData, TranscriptData } from "../../types/sent/sent.type";

type TranscriptDirections = Record<string, string>;

type FormDataValueType = string | number | boolean | number[] | ReferenceData[] | TranscriptData[] | null;

interface SentFormState {
  formData: FormDataType;
  openFileDialog: boolean;
  selectedTranscript: string[];
  transcriptDirections: TranscriptDirections;
  
  // Actions
  setFormData: (data: Partial<FormDataType>) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  setSelectedTranscript: (transcripts: string[]) => void;
  setTranscriptDirection: (id: string, direction: string) => void;
  handleChange: (name: keyof FormDataType, value: FormDataValueType) => void;
  handleReceiverTypeChange: (type: string) => void;
  handleAttachmentAdd: (attachmentData: { name: string; file: string; id: number }) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  resetForm: () => void;
}

const createDefaultTranscript = (position = 0): TranscriptData => ({
  read_at: new Date().toISOString(),
  transcript_for: "notification",
  security: false,
  position,
  correspondence: null
});

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
  transcript: [createDefaultTranscript()],
  published: false,
};

export const useSentFormStore = create<SentFormState>((set) => ({
  formData: initialFormData,
  openFileDialog: false,
  selectedTranscript: [],
  transcriptDirections: {},

  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),

  setOpenFileDialog: (isOpen) => set(() => ({
    openFileDialog: isOpen,
  })),

  setSelectedTranscript: (transcripts) => set(() => ({
    selectedTranscript: transcripts,
  })),
    
  setTranscriptDirection: (id, direction) => set((state) => ({
    transcriptDirections: { ...state.transcriptDirections, [id]: direction },
    formData: direction ? {
      ...state.formData,
      transcript: state.formData.transcript.map(t => ({
        ...t,
        transcript_for: direction
      }))
    } : state.formData
  })),

  handleChange: (name: keyof FormDataType, value: FormDataValueType) => set((state) => {
    const newState = { ...state.formData };

    if (name === "attachments" && Array.isArray(value)) {
      const attachmentValues = (value as unknown) as string[];
      if (attachmentValues.includes("add_attachment")) {
        state.setOpenFileDialog(true);
        newState.attachments = attachmentValues.filter(v => v !== "add_attachment").map(Number);
      }
    } else if (name === "sender" && typeof value === "string") {
      const numValue = Number(value);
      newState.sender = numValue;
      newState.transcript = state.formData.transcript.map(t => ({
        ...t,
        position: numValue
      }));
    } else {
      (newState[name] as FormDataType[typeof name]) = value;
    }

    return { formData: newState };
  }),

  handleReceiverTypeChange: (type) => set((state) => ({
    formData: {
      ...state.formData,
      receiver_external: type,
    },
  })),

  handleAttachmentAdd: () => set((state) => ({
    formData: {
      ...state.formData,
      attachments: [...state.formData.attachments, Date.now()],
    },
  })),

  handleAddTranscript: () => set((state) => {
    if (!state.selectedTranscript.length) return state;

    const newReferences = state.selectedTranscript
      .map(Number)
      .filter(id => !state.formData.reference.includes(id));

    if (!newReferences.length) return state;

    const newReferenceData: ReferenceData[] = newReferences.map(id => ({
      id,
      enabled: true,
      transcript_for: state.transcriptDirections[id.toString()] || ""
    }));
    
    const newTranscripts = newReferences.map(refId => ({
      ...createDefaultTranscript(refId),
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
  }),

  handleTranscriptToggle: (id) => set((state) => {
    const numId = Number(id);
    const referenceData = [...(state.formData.referenceData || [])];
    const existingItemIndex = referenceData.findIndex(item => item.id === numId);
    
    if (existingItemIndex >= 0) {
      referenceData[existingItemIndex] = {
        ...referenceData[existingItemIndex],
        enabled: !referenceData[existingItemIndex].enabled
      };
    } else {
      referenceData.push({
        id: numId,
        enabled: true,
        transcript_for: state.transcriptDirections[id]
      });
    }

    const updatedReference = Array.from(new Set([...state.formData.reference, numId]));
    const transcriptDirection = state.transcriptDirections[id] || "notification";
    
    const transcript = state.formData.transcript.find(t => t.position === numId)
      ? state.formData.transcript.map(t =>
          t.position === numId
            ? { ...t, transcript_for: transcriptDirection }
            : t
        )
      : [...state.formData.transcript, {
          ...createDefaultTranscript(numId),
          transcript_for: transcriptDirection
        }];

    return {
      formData: {
        ...state.formData,
        reference: updatedReference,
        referenceData,
        transcript
      },
    };
  }),

  resetForm: () => set(() => ({
    formData: initialFormData,
    openFileDialog: false,
    selectedTranscript: [],
    transcriptDirections: {},
  })),
}));
