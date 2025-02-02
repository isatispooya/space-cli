import { BoursTypes, CrowdTypes, BimeTypes } from "./index";

export interface StatsTypes {
  bourse: BoursTypes;
  companies: {
    logo: string;
    name: string;
    shares: number;
  }[];
  crowd: CrowdTypes;
  pishkar: BimeTypes;
  status: "success";
  status_code: number;
}
