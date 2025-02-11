import { useState } from "react";
import Accordion from "../../../components/accordian";
import { useCrowdPoints } from "../hooks";
import { motion } from "framer-motion";

const CrowdPoints = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useCrowdPoints.useGetPlans();
  const [isAccordion, setIsAccordion] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleAccordionClick = (plan: string) => {
    setIsAccordion(!isAccordion);
    setSelectedPlan(plan);
  };

  const handleItemClick = (item: string) => {
    console.log(item);
  };
  console.log(data);
  return (
    <div>
      <Accordion
        title="طرح ها"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        {data?.map((item: string) => (
          <motion.li
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-2 border-b cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            {item.plan.persian_name}
          </motion.li>
        ))}
      </Accordion>
    </div>
  );
};

export default CrowdPoints;
