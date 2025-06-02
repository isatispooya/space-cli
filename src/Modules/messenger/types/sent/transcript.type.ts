import internalOptions from "../../data/sent/transcript.data";

export interface ITranscriptResponseType {
  id: number;
  read_at: string | null;
  transcript_for: "notification" | "security" | string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number | null;
  correspondence: number;
  user_external?: string;
  name?: string;
  isExternal?: boolean;
}

export interface ReferenceDetailType {
  id: string;
  user?: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  name?: string;
  transcript_for?: string;
  position?: string;
  company_name?: string;
  company_detail?: {
    name: string;
  };
}

export interface TranscriptPropsType {
  transcript: ITranscriptResponseType[];
  selectedTranscript: string[];
  setSelectedTranscript: (value: string[]) => void;
  handleAddTranscript: (text?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  setTranscriptDirection: (id: number, value: string) => void;
  onDeleteTranscript?: (id: number) => void;
  data?: {
    transcript?: ITranscriptResponseType[];
    sender?: {
      reference_details?: ReferenceDetailType[];
      subject?: string;
      text?: string;
      description?: string;
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
      published?: boolean;
      sender_details?: {
        id: number;
      };
      receiver_internal_details?: {
        id: number;
      };
      receiver_external?: string;
      receiver_external_details?: {
        name: string;
      };
    };
  };
  is_internal?: boolean;
}

export interface TranscriptDetailsType {
  id: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
}

export interface TranscriptDataType {
  id?: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number | null;
  correspondence: number | null;
  user_external?: string;
}

export interface TranscriptAPIDataType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number | null;
  correspondence: number | null;
  user_external?: string;
}

export interface TranscriptListPropsType {
  displayTranscript: ITranscriptResponseType[];
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  handleDirectionChange: (id: number, value: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalOptions: { label: string; value: string }[];
}

export interface TranscriptListItemPropsType {
  item: ITranscriptResponseType;
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  handleDirectionChange: (id: number, value: string) => void;
  handleTranscriptToggle: (id: number, newValue?: boolean) => void;
  internalOptions: typeof internalOptions;
  handleExternalTextUpdate?: (id: number, text: string | string[]) => void;
  onDelete?: (id: number) => void;
}

export interface TranscriptSectionPropsType {
  transcriptItems: ITranscriptResponseType[];
  selectedTranscript: string[];
  transcriptDirections: { [id: number]: string };
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: number) => string;
  setSelectedTranscript: (transcripts: string[]) => void;
  handleAddTranscript: (text?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  setTranscriptDirection: (id: number, direction: string) => void;
  is_internal?: boolean;
}

export interface ExtendedTranscriptListItemPropsType
  extends TranscriptListItemPropsType {
    onAddExternalRecipient?: (id: number, newRecipient: string) => void;
    onDelete: (id: number) => void;
  }
