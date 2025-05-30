export interface InvitationType {
  id: number;
  invited_user_detail: {
    first_name: string;
    last_name: string;
    mobile: string;
    uniqueIdentifier: string;
    created_at?: string;
  };
  code?: string;
  invitation_code_detail: {
    code: string;
    description: string;
    introducer_user_detail: {
      first_name: string;
      last_name: string;
    };
  };
  introducer_user_detail: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  created_at: string;
  invited_users_count: number;
}
