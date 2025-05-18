import internalOptions from "../../data/sent/transcript.data";
import { ITranscriptResponseType } from "./sentForm.types";

export interface TranscriptItemType {
  position: number;
  id: number;
  transcript_for: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  name: string;
  company_name: string;
  company_detail: {
    name: string;
  };
  security: boolean;
  external_text: string | string[];
}

export interface ReferenceDetailType {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  position: string;
  name: string;
  company_name: string;
  company_detail: {
    name: string;
  };
  transcript_for: string;
}

export interface SenderDataType {
  reference_details: ReferenceDetailType[];
}

export interface TranscriptDataType {
  transcript_details: TranscriptItemType[];
  sender: SenderDataType;
}

export interface TranscriptDirectionsType {
  [key: number]: string;
}

export interface TranscriptListItemPropsType {
  item: TranscriptItemType;
  getTranscriptName: (position: number) => string;
  transcriptDirections: TranscriptDirectionsType;
  handleDirectionChange: (id: number, value: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalOptions: typeof internalOptions;
  handleExternalTextUpdate?: (id: number, text: string | string[]) => void;
}

export interface TranscriptPropsType {
  transcript: TranscriptItemType[];
  selectedTranscript: string[];
  setSelectedTranscript: (values: string[]) => void;
  handleAddTranscript: (externalText?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (position: number) => string;
  transcriptDirections: TranscriptDirectionsType;
  setTranscriptDirection: (id: number, value: string) => void;
  data: TranscriptDataType;
  is_internal: boolean;
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
  is_internal: boolean;
  transcript: TranscriptItemType[];
}
