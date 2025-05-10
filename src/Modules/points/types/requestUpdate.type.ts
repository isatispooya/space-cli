

export interface RequestUpdateType {
  id?: number;
  status: "pending" | "delivered" | "cancelled";
}
