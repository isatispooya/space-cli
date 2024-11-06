import React from "react";
import useProfile from "./hooks/useProfile";
import ProfileField from "./components/fields";
import ProfileSection from "./components/profileSection";

const PersonProfile: React.FC = () => {
  const { data: profile } = useProfile();



  return (
    <div
      dir="rtl"
      className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">پروفایل کاربر</h1>
      </div>

      <ProfileSection title="اطلاعات فردی">
        <ProfileField label="نام" value={profile?.first_name || "نامشخص"} />
        <ProfileField
          label="نام خانوادگی"
          value={profile?.last_name || "نامشخص"}
        />
        <ProfileField
          label="نام پدر"
          value={profile?.father_name || "نامشخص"}
        />
        <ProfileField
          label="جنسیت"
          value={
            profile?.gender === "F"
              ? "زن"
              : profile?.gender === "M"
              ? "مرد"
              : "نامشخص"
          }
        />
        <ProfileField
          label="کد ملی"
          value={profile?.uniqueIdentifier || "نامشخص"}
        />
        <ProfileField
          label="سریال شناسنامه"
          value={profile?.serial_shenasname || "نامشخص"}
        />
        <ProfileField
          label="محل تولد"
          value={profile?.place_of_birth || "نامشخص"}
        />
        <ProfileField
          label="محل صدور"
          value={profile?.place_of_issue || "نامشخص"}
        />
        <ProfileField label="ایمیل" value={profile?.email || "نامشخص"} />
        <ProfileField
          label="شماره موبایل"
          value={profile?.mobile || "نامشخص"}
        />
        <ProfileField label="آدرس" value={profile?.address || "نامشخص"} />
        <ProfileField
          label="تاریخ تولد"
          value={profile?.birth_date || "نامشخص"}
        />
      </ProfileSection>
    </div>
  );
};

export default PersonProfile;
