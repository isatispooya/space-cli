export interface ReferenceDetailType {
  id: number;
  position: number;
}

export interface TranscriptDetailType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number;
  user_external?: string;
}

export interface TranscriptDirectionsType {
  [key: number]: string;
}

export interface ResponseDataType {
  sender_details?: { id: number; user?: Record<string, unknown> };
  receiver_internal_details?: { id: number };
  receiver_external_details?: { name: string };
  receiver_external?: string | null;
  attachments_details?: Array<{
    id: number;
    name: string;
    file: string;
    size: number;
  }>;
  attachments?: number[];
  receiver?: number[];
  reference_details?: ReferenceDetailType[];
  reference?: number[];
  transcript_details?: TranscriptDetailType[];
  is_internal?: boolean;
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
  owner?: { id: number };
  sender_external?: string;
}
