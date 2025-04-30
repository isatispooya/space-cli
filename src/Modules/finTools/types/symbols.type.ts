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
}

export interface SymbolResponse {
  [index: number]: Symbol;
}
