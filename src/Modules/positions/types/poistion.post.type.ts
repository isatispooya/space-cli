import { User } from "./postions.type";

export interface PositionPostTypes {
  name: string | null;
  company: number | null;
  user: number | User["id"];
  parent: number | null;
  type_of_employment: string | null;
  description: string;
  start_date: string;
  end_date: string;
  id?: number;
}
