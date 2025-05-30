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

export interface SymbolCalculatorResType {
  annualized_return: number;
  compound_return: number;
  investment: number;
  start_date: string;
  symbol: string;
}
export interface InvestDocumentReqType {
  file_csv: File | null;
}
export interface InvestDocumentResType {
  message: string;
  status: string;
}

export interface BaseReportResType {
  result: {
    is_sejam: number;
    non_deposit_stock_persentage: number;
    std_age: number;
    tradable: number;
    gender: {
      female: number;
      male: number;
      other: number;
    };
    age_avg: number;
    deposit_stock_persentage: number;
  };
}

export interface TransactionsDatesResType {
  dates: {
    created_at: string | null;
    date: string | null;
    id: number | null;
    is_active: boolean | null;
    open_market: boolean | null;
    shamsi_date: string | null;
    updated_at: string | null;
  }[];
}

export interface DateRangeType {
  startId: number | null;
  endId: number | null;
}



export type SymbolsType = {
  symbolRes: SymbolsGetResType[];
  symbolAnalysisRes: SymbolsAnalysisResType[];
  pricingRes: SymbolsPricingResType;
  symbolCalculatorReq: SymbolCalculatorReqType;
  symbolCalculatorRes: SymbolCalculatorResType;
  investDocumentReq: InvestDocumentReqType;
  investDocumentRes: InvestDocumentResType;
  baseReportRes: BaseReportResType;
  transactionsDatesRes: TransactionsDatesResType;
};
