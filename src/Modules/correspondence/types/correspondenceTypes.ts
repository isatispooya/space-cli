import { PositionData } from "../../positions/types/postions.type";

export interface CorrespondenceTypes {
  id?: number;
  uuid?: string;
  sender: PositionData | null;
  receiver_internal: string | null;
  receiver_external: string | null;
  subject: string;
  text: string;
  description?: string;
  postcript?: string;
  kind_of_correspondence: "request" | "response" | "letter";
  confidentiality_level: "normal" | "confidential" | "secret";
  priority: "normal" | "immediate";
  authority_type: "new";
  authority_correspondence: null;
  reference: string[];
  is_internal: boolean;
  binding: boolean;
  draft: boolean;
  published: boolean;
  attachments: string[];
  letterhead: string | null;
  number: string | null;
  seal: string | null;
  seal_placement: boolean;
  signature: string | null;
  signature_placement: boolean;
  created_at?: string;
  updated_at?: string;
  read_at?: string | null;
  received_at?: string | null;
}
