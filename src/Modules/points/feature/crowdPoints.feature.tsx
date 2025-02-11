import { useState } from "react";
import Accordion from "../../../components/accordian";

const CrowdPoints = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Accordion
        title="طرح ها"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <div>asdfghj</div>
      </Accordion>
    </div>
  );
};

export default CrowdPoints;
