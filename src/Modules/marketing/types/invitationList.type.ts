export interface InvitedUserDetail {
  first_name: string;
  last_name: string;
  mobile: string;
  uniqueIdentifier?: string;
}

export interface InvitationListType {
  id: number;
  invited_user_detail: InvitedUserDetail;
  invitation_code_detail: {
    code: string;
  };
  created_at: string;
}
