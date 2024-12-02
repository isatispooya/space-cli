import { CorrespondenceData } from "./correspondence_data.type";

export interface UpdateCorrespondenceResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CorrespondenceData[];
  }