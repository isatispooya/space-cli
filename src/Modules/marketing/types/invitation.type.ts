export interface InvitationTypes {
  id: number;
  invited_user_detail: {
    first_name: string;
    last_name: string;
    mobile: string;
    uniqueIdentifier: string;
    created_at?: string;
  };
  code: string;

  created_at: string;
}
