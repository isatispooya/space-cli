export interface CorrespondencePostType {
  sender: string | null;
  receiver_internal: string | null;
  receiver_external: string | null;
  subject: string;
  kind_of_correspondence: "request" | "response" | "letter";
  confidentiality_level: "normal" | "confidential" | "secret";
}
