import { useState, useEffect } from "react";
import CategoryIcons from "./rewards_category.feat";
import { CATEGORY_CHOICES } from "./data/categotyData";
import { RewardItemType, RewardsTablePropsType } from "../../types/RewardsTable.type";

const RewardsTable = ({ rewards }: RewardsTablePropsType) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredRewards, setFilteredRewards] = useState<RewardItemType[]>(rewards);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = rewards.filter(
        (reward) => reward.category === selectedCategory
      );
      setFilteredRewards(filtered);
    } else {
      setFilteredRewards(rewards);
    }
  }, [selectedCategory, rewards]);

  useEffect(() => {
    setFilteredRewards(rewards);
  }, [rewards]);

  const getCategoryTitle = (categoryKey: string): string => {
    const category = CATEGORY_CHOICES.find(([key]) => key === categoryKey);
    return category ? category[1] : categoryKey;
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-right">پاداش‌های ویژه</h2>

      <CategoryIcons
        onCategoryChange={handleCategoryChange}
        setSelected={setSelectedCategory}
        selected={selectedCategory}
      />

      {selectedCategory && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className="filter-button bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <span>پاک کردن فیلتر</span>
            <span className="mr-2">✕</span>
          </button>
          <div className="text-gray-700">
            فیلتر شده بر اساس:{" "}
            <span className="font-semibold">
              {getCategoryTitle(selectedCategory)}
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow rewards-table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                نام
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                دسته‌بندی
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                زمینه فعالیت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                درصد تخفیف
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                وضعیت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRewards.length > 0 ? (
              filteredRewards.map((reward) => (
                <tr key={reward.id} className="table-row-item">
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {reward.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-500">
                      {getCategoryTitle(reward.category)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-500">
                      {reward.feild_of_activity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-500">
                      {reward.percent}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span
                      className={`status-badge ${
                        reward.status ? "active" : "inactive"
                      }`}
                    >
                      {reward.status ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="action-button text-indigo-600 hover:text-indigo-900 ml-3">
                      مشاهده
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-gray-500 empty-message"
                >
                  هیچ موردی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardsTable;
