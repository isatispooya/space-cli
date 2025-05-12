import RewardsTable from "../feature/RewardsTable/rewardstable";
import { RewardsCategory } from "../feature";
import useWelfare from "../hooks/useWelfare";
import { useState } from "react";
import { PrivilegesType } from "../types/RewardsTable.type";

const Rewards = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { data: Welfare } = useWelfare();

  // Filter the data based on selected category
  const filteredData = selected
    ? Welfare?.filter((item: PrivilegesType) => item.category === selected)
    : Welfare;

  return (
    <div>
      <RewardsCategory setSelected={setSelected} selected={selected} />
      <RewardsTable data={filteredData} />
    </div>
  );
};

export default Rewards;
