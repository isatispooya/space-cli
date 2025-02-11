import { useState } from "react";
import Accordion from "../../../components/accordian";
import { useCrowdPoints } from "../hooks";

const CrowdPoints = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useCrowdPoints.useGetPlans();

  console.log(data);
  return (
    <div>
      <Accordion
        title="طرح ها"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <div>
          <h1>طرح ها</h1>
        </div>
      </Accordion>
    </div>
  );
};

export default CrowdPoints;
