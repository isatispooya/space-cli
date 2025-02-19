interface MissionStoreTypes {
  startTime: Date | null;
  endTime: Date | null;
  setStartTime: (startTime: Date | null) => void;
  setEndTime: (endTime: Date | null) => void;
  approvedItems: number[];
  setApprovedItems: (approvedItems: number[]) => void;
}

export default MissionStoreTypes;
