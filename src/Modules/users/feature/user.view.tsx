import React from "react";
import { useUserPro } from "../hooks";
import { motion } from "framer-motion";
import { server } from "../../../api/server";
import { useParams } from "react-router-dom";

const ProfileView: React.FC = () => {
  const { id } = useParams();
  const { data: profile } = useUserPro.useUser(Number(id));

  const personalInfo = [
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
    {
      label: "تاریخ تولد",
      value: profile?.birth_date
        ? new Date(profile.birth_date).toLocaleDateString("fa-IR")
        : "نامشخص",
    },
  ];

  const idInfo = [
    { label: "سریال شناسنامه", value: profile?.serial_shenasname || "نامشخص" },
    { label: "محل تولد", value: profile?.place_of_birth || "نامشخص" },
    { label: "محل صدور", value: profile?.place_of_issue || "نامشخص" },
  ];

  const bankInfo = [
    {
      label: "شماره حساب",
      value: profile?.accounts?.[0]?.account_number || "نامشخص",
    },
    { label: "نام بانک", value: profile?.accounts?.[0]?.bank || "نامشخص" },
    {
      label: "کد شعبه",
      value: profile?.accounts?.[0]?.branch_code || "نامشخص",
    },
    {
      label: "نام شعبه",
      value: profile?.accounts?.[0]?.branch_name || "نامشخص",
    },
    {
      label: "شماره شبا",
      value: profile?.accounts?.[0]?.sheba_number || "نامشخص",
    },
  ];

  const contactInfo = [
    { label: "شماره موبایل", value: profile?.mobile || "نامشخص" },
    { label: "ایمیل", value: profile?.email || "نامشخص" },
  ];

  const addressInfo = [
    { label: "آدرس", value: profile?.address?.city || "نامشخص" },
  ];

  const pointInfo = [
    { label: "سکه", value: profile?.points?.point_1 || 0 },
    { label: "بذر", value: profile?.points?.point_2 || 0 },
  ];

  const renderInfoBox = (
    title: string,
    info: { label: string; value: string }[]
  ) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-[#7a7a7a] text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-4">
        {info.map((field, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-gray-300 pb-2"
          >
            <span className="text-[#7a7a7a]">{field.label}</span>
            <span className="font-bold text-[#878f99]">{field.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      dir="rtl"
      className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {renderInfoBox("اطلاعات شناسنامه", idInfo)}
          {renderInfoBox("اطلاعات بانکی", bankInfo)}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              {renderInfoBox("اطلاعات تماس", contactInfo)}
            </div>
            <div className="w-full md:w-1/2">
              {renderInfoBox("امتیازات", pointInfo)}
            </div>
          </div>
          {renderInfoBox("آدرس", addressInfo)}
        </div>

        <div className="w-full md:w-1/3 p-6 bg-gradient-to-br from-[#5677BC] to-[#02205F] text-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={
                    profile?.profile_image
                      ? server + profile?.profile_image
                      : profile
                  }
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = profile;
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">پروفایل کاربر</h2>
          </div>
          <ul className="space-y-4">
            {personalInfo.map((field, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-white pb-2"
              >
                <span>{field.label}</span>
                <span className="font-bold">{field.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
