export * from './correspondence_data.type';
export * from './create_correspondence.type';
export * from './deleteCorrenpondence.delete.type';
export * from './UpdateCorrespondenceResponse.update';

export interface ICorrespondence {
  sender: number;
  subject: string;
  text: string;
  description: string;
  receiver_external: number | null;
  is_internal: boolean;
  postcript: string;
  uuid: string;
  binding: boolean;
  confidentiality_level: 'normal' | 'confidential' | 'secret';
  priority: 'normal' | 'immediate' | 'urgent';
  kind_of_correspondence: 'request' | 'response' | 'letter';
  authority_type: 'new' | 'previous';
  signature_placement: boolean;
  seal_placement: boolean;
  draft: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  received_at: string | null;
  read_at: string | null;
  number: string | null;
  seal: number | null;
  signature: number | null;
  letterhead: number | null;
  authority_correspondence: number | null;
  attachments: number[];
  reference: number[];
}

export type CreateCorrespondenceDTO = Omit<
  ICorrespondence,
  'created_at' | 'updated_at' | 'uuid' | 'number'
>;

