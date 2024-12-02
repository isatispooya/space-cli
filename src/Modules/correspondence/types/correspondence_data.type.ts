export interface CorrespondenceData {
  id: number;
  title: string;
  sender: string;
  receiver: string;
  date: string;
  subject: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'sent' | 'received';
  category: string;
  reference_number: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
} 