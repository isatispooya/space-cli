export interface InvitationType {
    id: string;
    code: string;
    created_at: string;
    
    invited_user_detail: {
      first_name: string;
      last_name: string;
      mobile: string;
      uniqueIdentifier: string;
      created_at?: string;
    };
    invitation_code_detail: {
      code?: string;
    };
  } 
