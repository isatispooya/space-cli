export interface BoursTypes {
  bourse: {
    protfolio: {
      Symbol: string;
      VolumeInPrice: number;
    }[];
  };
  value: number;
  status: string;
  status_code: number;
}
