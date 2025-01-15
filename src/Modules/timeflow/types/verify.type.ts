export interface VerifyType {
  time: string;
  id: number;
}

export interface VerifyPatchTypes {
  id: number;
  data: {
    self_status: "approved" | "rejected";
  };
}
