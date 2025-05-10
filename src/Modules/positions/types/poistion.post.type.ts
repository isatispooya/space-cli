import { UserType } from "./postions.type";

export interface PositionPostType {
  name: string | null;
  company: number | null;
  user: number | UserType["id"];
  parent: number | null;
  type_of_employment: string | null;
  description: string;
  start_date: string;
  end_date: string;
  id?: number;
}
