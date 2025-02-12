export interface PlanByTraceCodeType {
  data_crowd: {
    fulname: string;
    plan_name: string;
    user: string;
    value: number;

    refrence_number: {
      name: string;
      user_id: string;
    };
  };
  refrence_number: {
    name: string;
    user_id: string;
  };

  user_info: string;
}
