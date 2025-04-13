import { motion } from "framer-motion";
import { Card } from "@/components";
import { server } from "@/api";

interface SubjectType {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  status: boolean;
}

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
          <div className="flex flex-col space-y-4  p-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-2 rounded-full">
              <img
                src={server + subject.image}
                alt={subject.title}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

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

            <div className="flex justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  قیمت
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {subject.price.toLocaleString()} تومان
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  وضعیت
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {subject.status ? "فعال" : "غیرفعال"}
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
    online: ["مشاوره آنلاین", "دسترسی آسان", "صرفه‌جویی در زمان"],
    phone: ["مشاوره تلفنی", "ارتباط مستقیم", "انعطاف‌پذیری زمانی"],
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
