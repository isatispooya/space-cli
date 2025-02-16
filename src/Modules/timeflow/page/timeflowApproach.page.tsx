import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  TimeFlowApproachList,
  TimeflowMission,
  TimeflowOvertime,
} from "../featuers";

const TimeFlowApproachPage = () => {
  const [alignment, setAlignment] = useState("timeflow");
  const [isListVisible, setListVisible] = useState<boolean>(true);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setListVisible(newAlignment === "timeflow");
    }
    console.log(event);
  };

  return (
    <div>
      <ToggleButtonGroup
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="timeflow">ثبت تردد</ToggleButton>
        <ToggleButton value="mission"> ثبت ماموریت ها </ToggleButton>
        <ToggleButton value="overtime"> ثبت اضافه کاری ها</ToggleButton>
      </ToggleButtonGroup>

      {isListVisible && <TimeFlowApproachList />}
      {alignment === "mission" && <TimeflowMission />}
      {alignment === "overtime" && <TimeflowOvertime />}
    </div>
  );
};

export default TimeFlowApproachPage;
