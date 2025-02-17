import Accordion from "../../../components/common/accordian/accordian";
import { useCrowdPoints } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";
import { PlansView } from "../../components";
import { formatNumber } from "../../../../utils";
import { PlansType } from "../../types";
import { useCrowdPointsStore } from "../../store";
import { LoaderLg } from "../../../../components";

const CrowdPoints = () => {
  const {
    isOpen,
    selectedPlan,
    searchQuery,
    visibleItems,
    setIsOpen,
    setSelectedPlan,
    setTraceCode,
    setSearchQuery,
    setVisibleItems,
  } = useCrowdPointsStore();
  const { data, isPending } = useCrowdPoints.useGetPlans();

  const filteredPlans = Array.isArray(data)
    ? data.filter((item: PlansType) =>
        item.plan.persian_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data
    ? [data].filter((item: PlansType) =>
        item.plan.persian_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleBack = () => {
    setSelectedPlan(null);
  };

  const handleShowMore = () => {
    setVisibleItems(visibleItems + 10);
  };

  const handleItemClick = (item: PlansType) => {
    setSelectedPlan(item);
    setTraceCode(item?.plan?.trace_code);
    setIsOpen(false);
  };

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <div className="p-6  min-h-screen">
      {!selectedPlan ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg shadow-lg bg-white p-4"
        >
          <Accordion
            title="طرح‌های تأمین مالی جمعی"
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <input
                      type="text"
                      placeholder="جستجوی طرح..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                  </motion.div>

                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 mt-4"
                  >
                    {filteredPlans?.length > 0 ? (
                      <>
                        {filteredPlans
                          .slice(0, visibleItems)
                          .map((item: PlansType, index: number) => (
                            <motion.li
                              key={index}
                              layout
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() => handleItemClick(item)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-800">
                                  {item.plan.persian_name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  مبلغ تامین مالی:{" "}
                                  {formatNumber(item.plan.total_price)}
                                </span>
                              </div>
                            </motion.li>
                          ))}

                        {filteredPlans.length > visibleItems && (
                          <motion.button
                            onClick={handleShowMore}
                            className="w-full mt-4 px-4 py-2 bg-[#5677BC] text-white rounded-lg  transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            مشاهده بیشتر
                          </motion.button>
                        )}
                      </>
                    ) : (
                      <motion.div
                        className="p-4 text-center text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        طرحی یافت نشد.
                      </motion.div>
                    )}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </Accordion>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg shadow-lg bg-white p-6"
        >
          <PlansView plan={selectedPlan} onBack={handleBack} />
        </motion.div>
      )}
    </div>
  );
};

export default CrowdPoints;
