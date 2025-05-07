export interface SymbolsGetResType {
  created_at: string;
  description: string;
  history_data: {
    date: string;
    closing_price_value: number;
  }[];
  id: number;
  last_change: number;
  last_price: number;
  link: string;
  photo: string;
  symbol: number;
  updated_at: string;
}

export interface SymbolsAnalysisResType {
  symbol: string;
  last_price: number;
  "7_day_return": number;
  "7_day_rank": number;
  "30_day_return": number;
  "30_day_rank": number;
  "90_day_return": number;
  "90_day_rank": number;
  "180_day_return": number;
  "180_day_rank": number;
  "365_day_return": number;
  "365_day_rank": number;
}

export type SymbolsType = {
  symbolRes: SymbolsGetResType[];
  symbolAnalysisRes: SymbolsAnalysisResType[];
};
