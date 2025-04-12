import { motion } from "framer-motion";
import { Card } from "@/components";
import type { SubjectType } from "../../types";

interface SubjectCardProps {
  subject: SubjectType;
  onSelect: (id: string) => void;
}

export const SubjectCard = ({ subject, onSelect }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(subject.id)}
    >
      <Card
        title={subject.title}
        subtitle={subject.description}
        content={
          <div className="flex flex-col space-y-4">
            {/* Icon Section */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full ">
              <span className="text-3xl">{subject.icon}</span>
            </div>

            {/* Features or Benefits List */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {getSubjectFeatures(subject.category).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats or Highlights */}
            <div className="flex justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  مدت زمان
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  60 دقیقه
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  جلسات
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  1-1
                </div>
              </div>
            </div>
          </div>
        }
        badge={subject.category}
        hoverEffect={true}
        glassmorphism={true}
        borderGradient={true}
        className="h-full cursor-pointer transition-all duration-300"
      />
    </motion.div>
  );
};


const getSubjectFeatures = (category: string): string[] => {
  const features: Record<string, string[]> = {
    Finance: [
      "مشاوران مالی متخصص",
      "استراتژی‌های شخصی‌سازی شده",
      "برنامه‌ریزی سرمایه‌گذاری",
    ],
    Technology: [
      "توسعه‌دهندگان ارشد",
      "معماری فنی",
      "راهنمایی بهترین شیوه‌ها",
    ],
    Legal: [
      "وکلای مجاز",
      "مستندات حقوقی",
      "انطباق با مقررات",
    ],
    Marketing: [
      "استراتژی‌های بازاریابی",
      "توسعه برند",
      "کمپین‌های دیجیتال",
    ],
    Healthcare: [
      "متخصصان مجاز",
      "ارزیابی‌های سلامت",
      "برنامه‌ریزی تندرستی",
    ],
    // Add more categories as needed
  };

  return (
    features[category] || [
      "مشاوره حرفه‌ای",
      "راهنمایی متخصص",
      "رویکرد شخصی‌سازی شده",
    ]
  );
};

export default SubjectCard;
