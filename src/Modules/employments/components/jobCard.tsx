import { motion } from "framer-motion";
import { HiLocationMarker, HiCode, HiBriefcase } from "react-icons/hi";
import { ReactNode } from "react";

interface SkillType {
  name: string;
  level: "پیشرفته" | "متوسط" | "مبتدی";
}

interface JobCardPropsType {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  skills: SkillType[];
  experience?: string;
  gender: string;
  kindOfJob: string;
  expirationDate: string;
  createdAt: string;
  children?: ReactNode;
}

const JobCard = ({
  title,
  company,
  location,
  description,
  requirements,
  skills,
  experience,
  gender,
  kindOfJob,
  expirationDate,
  createdAt,
  children,
}: JobCardPropsType) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{company}</p>
          </div>
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
            >
              {experience}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm"
            >
              {kindOfJob === "full_time" ? "تمام وقت" : "پاره وقت"}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <HiLocationMarker className="w-5 h-5 ml-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <span className="ml-2">جنسیت:</span>
            <span>
              {gender === "both" ? "همه" : gender === "male" ? "آقا" : "خانم"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            توضیحات شغل:
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            شرایط احراز:
          </h3>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-gray-600 dark:text-gray-300"
              >
                <HiBriefcase className="w-5 h-5 ml-2 text-blue-500" />
                {req}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
            >
              <HiCode className="w-4 h-4 ml-1" />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {skill.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                {" - " + skill.level}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            تاریخ انتشار: {new Date(createdAt).toLocaleDateString("fa-IR")}
          </div>
          <div>
            مهلت ارسال رزومه:{" "}
            {new Date(expirationDate).toLocaleDateString("fa-IR")}
          </div>
        </div>

        {children}
      </div>
    </motion.div>
  );
};

export default JobCard;
