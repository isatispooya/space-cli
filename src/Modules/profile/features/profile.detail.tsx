import React from "react";
import { useProfile } from "../hooks";
import { ProfileField, ProfileSection } from "../components";

const PersonProfile: React.FC = () => {
  const { data: profile } = useProfile();

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
    { label: "تاریخ تولد", value: profile?.birth_date || "نامشخص" },
  ];

  return (
    <div
      dir="rtl"
      className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          پروفایل کاربر
        </h1>
      </div>

      <ProfileSection title="اطلاعات فردی">
        {profileFields.map((field, index) => (
          <ProfileField key={index} label={field.label} value={field.value} />
        ))}
      </ProfileSection>
    </div>
  );
};

export default PersonProfile;
