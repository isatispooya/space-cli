import React, { useState } from "react";
import { useProfile } from "../hooks";
import { ProfileField, ProfileSection } from "../components";
import { motion } from "framer-motion";

const PersonProfile: React.FC = () => {
  const { data: profile } = useProfile();
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.avatar || "");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        // سرور
      };
      reader.readAsDataURL(file);
    }
  };

  const profileFields = [
    { label: "نام", value: profile?.first_name || "نامشخص" },
    { label: "نام خانوادگی", value: profile?.last_name || "نامشخص" },
    { label: "نام پدر", value: profile?.father_name || "نامشخص" },
    {
      label: "جنسیت",
      value:
        profile?.gender === "F"
          ? "زن"
          : profile?.gender === "M"
            ? "مرد"
            : "نامشخص",
    },
    { label: "کد ملی", value: profile?.uniqueIdentifier || "نامشخص" },
    { label: "سریال شناسنامه", value: profile?.serial_shenasname || "نامشخص" },
    { label: "محل تولد", value: profile?.place_of_birth || "نامشخص" },
    { label: "محل صدور", value: profile?.place_of_issue || "نامشخص" },
    { label: "ایمیل", value: profile?.email || "نامشخص" },
    { label: "شماره موبایل", value: profile?.mobile || "نامشخص" },
    { label: "آدرس", value: profile?.address || "نامشخص" },
    { label: "تاریخ تولد", value: profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('fa-IR') : "نامشخص" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
      className="max-w-8xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-100"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="relative mb-8">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#29D2C7] shadow-xl">
            <img 
              src={avatarUrl || '/default-avatar.png'} 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.label 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-2 right-2 bg-[#29D2C7] p-3 rounded-full cursor-pointer hover:bg-[#20a69d] shadow-lg transition-all duration-300"
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.label>
        </div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#29D2C7] to-[#20a69d] mb-2"
        >
          پروفایل کاربر
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ProfileSection title="اطلاعات فردی">
          {profileFields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProfileField label={field.label} value={field.value} />
            </motion.div>
          ))}
        </ProfileSection>
      </motion.div>
    </motion.div>
  );
};

export default PersonProfile;
