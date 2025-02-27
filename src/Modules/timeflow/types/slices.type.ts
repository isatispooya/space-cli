import OtherLog from "./otherLogs.type";
import OwnLog from "./ownLogs.type";

export interface VerifyState {
  ownLogs: OwnLog[];
  otherLogs: OtherLog[];
  isOpenOwn: boolean;
  isOpenAbsense: boolean;
  isOpenOther: boolean;
  selectedOwnTimes: Record<number, Date | null>;
  selectedOtherTimes: Record<number, Date | null>;
}

export type VerifySliceTypes = {
  verifyState: VerifyState;
};

export default VerifySliceTypes;
