export interface FishPaymentType {
  id: number;
  document: File;
  document_track_id: string;
  kind_of_payment: string;
  insurance_name?: string;
  price?: number;

}

