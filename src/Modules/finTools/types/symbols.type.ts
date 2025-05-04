/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SymbolDetail {
  id: number;
  symbol: string;
  name: string;
  code: string;
  created_at: string;
  description: string | null;
  is_active: boolean;
  market: string | null;
  orgin: boolean;
  type: string;
  updated_at: string;
}

export interface HistoryData {
  date: string;
  closing_price_value: number;
}

export interface Symbol {
  id: number;
  chart_data: any[];
  created_at: string;
  description: string;
  link: string;
  photo: string;
  symbol: number;
  symbol_detail: SymbolDetail;
  updated_at: string;
  history_data: HistoryData[];
  last_price: number;
  last_change: number;
}

export type SymbolResponse = Symbol[];
