import { create } from 'zustand';
import { FormDataType } from '../../types/sent/CorrespondenceAttache.type';

interface SentFormState {
  formData: FormDataType;
  openFileDialog: boolean;
  selectedTranscript: string[];
  setFormData: (data: Partial<FormDataType>) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  setSelectedTranscript: (transcripts: string[]) => void;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  handleReceiverTypeChange: (type: string) => void;
  handleAttachmentAdd: (attachmentData: { name: string; file: string ,id:number}) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  resetForm: () => void;
}

const initialFormData: FormDataType = {
  subject: "",
  text: "",
  description: "",
  attachments: [],
  receiver_internal: 0,
  receiver_external: "",
  receiver: [],
  sender: [],
  is_internal: true,
  postcript: "",
  seal: false,
  signature: false,
  letterhead: false,
  binding: false,
  confidentiality_level: "",
  priority: "",
  kind_of_correspondence: "",
  authority_type: "",
  authority_correspondence: 0,
  reference: [],
  published: false,
};

export const useSentFormStore = create<SentFormState>((set) => ({
  formData: initialFormData,
  openFileDialog: false,
  selectedTranscript: [],

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
          return {
            formData: {
              ...state.formData,
              reference: [...state.formData.reference, ...newReferences],
            },
          };
        }
      }
      return state;
    }),

  handleTranscriptToggle: (id) =>
    set((state) => {
      const numId = Number(id);
      return {
        formData: {
          ...state.formData,
          reference: state.formData.reference.includes(numId)
            ? state.formData.reference.filter((ref) => ref !== numId)
            : [...state.formData.reference, numId],
        },
      };
    }),

  resetForm: () =>
    set(() => ({
      formData: initialFormData,
      openFileDialog: false,
      selectedTranscript: [],
    })),
}));

