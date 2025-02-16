export interface PlanByTraceCodeType {
  fulname: string;
  plan_name: string;
  refrence: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
  user: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
  value: number;
}
