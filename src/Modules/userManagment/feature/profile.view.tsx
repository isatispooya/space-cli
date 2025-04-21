import React, { useState } from "react";
import { useProfile, useUpdateProfilePicture } from "../hooks";
import { motion } from "framer-motion";
import { server } from "../../../api/server";
import { profileIcon } from "@/assets";

const ProfileView: React.FC = () => {
  const { data: profile, refetch } = useProfile();
  const { mutate: updateProfilePicture } = useUpdateProfilePicture();
  const [avatarUrl, setAvatarUrl] = useState<string>(
    profile?.profile_image ?? ""
  );
  React.useEffect(() => {
    if (profile?.profile_image) {
      setAvatarUrl(profile.profile_image);
    }
  }, [profile?.profile_image]);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);

        await updateProfilePicture(formData, {
          onSuccess: () => {
            refetch();
          },
        });
      } catch (error) {
        console.error("خطا در آپلود تصویر:", error);
      }
    }
  };

  const personalInfo = [
    { label: "نام", value: profile?.first_name || "نامشخص" },
    { label: "نام خانوادگی", value: profile?.last_name || "نامشخص" },
    { label: "کدملی", value: profile?.uniqueIdentifier || "نامشخص" },
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

  const addressInfo = [{ label: "آدرس", value: profile?.address || "نامشخص" }];

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
          {renderInfoBox("اطلاعات تماس", contactInfo)}
          {renderInfoBox("آدرس", addressInfo)}
        </div>

        <div className="w-full md:w-1/3 p-6 bg-gradient-to-br from-[#5677BC] to-[#02205F] text-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={
                    profile?.profile_image ? server + avatarUrl : profileIcon
                  }
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = profileIcon;
                  }}
                />
              </div>
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer shadow-lg">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#5677BC]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
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
