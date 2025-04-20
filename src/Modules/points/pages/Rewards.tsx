import RewardsTable from "../feature/RewardsTable/rewardstable";
import { RewardsCategory } from "../feature";
import useWelfare from "../hooks/useWelfare";
import { useState } from "react";
import { PrivilegesTypes } from "../types/RewardsTable.type";

const Rewards = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { data: Welfare } = useWelfare();
  const category = Welfare?.map((item: PrivilegesTypes) => item.category);
  const filteredCategory = category?.filter((item: string) => item !== null);
  const fiterSelected = filteredCategory?.filter(
    (item: string) => item === selected
  );
  return (
    <div>
      <RewardsCategory setSelected={setSelected} selected={selected} />
      <RewardsTable fiterSelected={fiterSelected} />
    </div>
  ); 
};
export default Rewards;
