export type { ITranscriptResponseType } from "./sent/sent.type";
import { ITranscriptResponseType } from "./sent/sent.type";

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
  data?: {
    transcript_details?: ITranscriptResponseType[];
    sender?: {
      reference_details?: ReferenceDetailType[];
      subject?: string;
      text?: string;
      description?: string;
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
}

export interface TranscriptListPropsType {
  displayTranscript: ITranscriptResponseType[];
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  handleDirectionChange: (id: number, value: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalOptions: { label: string; value: string }[];
}
