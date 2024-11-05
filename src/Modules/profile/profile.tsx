import React, { useEffect } from "react";
import useProfile from "./hooks/useProfile";
import { useAccess } from "../../hooks/Auth/useAccess";
import ProfileField from "./fields";


const PersonProfile: React.FC = () => {
  const { accessToken, refetchAccessToken, error: accessError } = useAccess();
  const { data: profile, error: profileError } = useProfile(accessToken);

  useEffect(() => {
    if (!accessToken) {
      refetchAccessToken();
    }
  }, [accessToken, refetchAccessToken]);



  return (
    <div
      dir="rtl"
      className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">پروفایل کاربر</h1>
      </div>

      <Section title="اطلاعات فردی">
        <ProfileField label="نام" value={profile?.firstName || "نامشخص"} />
        <ProfileField
          label="نام خانوادگی"
          value={profile?.lastName || "نامشخص"}
        />
        <ProfileField label="نام پدر" />
        <ProfileField label="جنسیت" />
        <ProfileField label="کد ملی" />
        <ProfileField label="سریال شناسنامه" />
        <ProfileField label="محل تولد" />
        <ProfileField label="محل صدور" />
        <ProfileField label="ایمیل" />
        <ProfileField label="فکس" />
        <ProfileField label="شماره موبایل" />
      </Section>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);

export default PersonProfile;
