import { BoursType, CrowdType, BimeType } from "./index";

export interface StatsType {
  bourse: BoursType;
  companies: {
    logo: string;
    name: string;
    shares: number;
  }[];
  crowd: CrowdType;
  pishkar: BimeType;
  status: "success";
  status_code: number;
}
