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
  symbol_detail: {
    id: number;
    symbol: string;
    name: string;
    code: string;
    type: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    description: string | null;
    market: string | null;
    cisin: string | null;
    orgin: boolean;
  };
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

export interface SymbolsPricingResType {
  actual_return: number;
  calculation_type: "compound" | "simple";
  current_date: string;
  current_price: number;
  is_achievable: boolean;
  symbol: string;
  target_price: number;
  table: {
    date: string;
    growth_rate: number;
    target_price: number;
  }[];
}

export interface SymbolCalculatorReqType {
  symbol: number | null;
  investment: number | null;
  date: string | null;
}

export type SymbolsType = {
  symbolRes: SymbolsGetResType[];
  symbolAnalysisRes: SymbolsAnalysisResType[];
  pricingRes: SymbolsPricingResType;
  symbolCalculatorReq: SymbolCalculatorReqType;
};
