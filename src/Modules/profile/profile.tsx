import React from "react";
import PropTypes from "prop-types";

const ProfileField = ({ label, value }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2">
      {label}:
    </label>
    <input
      type="text"
      value={value || ""}
      readOnly
      className="peer bg-white w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    />
  </div>
);

ProfileField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const PersonProfile = () => {
  return (
    <div
      dir="rtl"
      className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">پروفایل کاربر</h1>
      </div>

      <Section title="اطلاعات فردی">
        <ProfileField label="نام" value={"محمدعلی"} />
        <ProfileField label="نام خانوادگی" value={"سادات"} />
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

      <Section title="حساب‌های بانکی">
        <ProfileField label="بانک" />
        <ProfileField label="شعبه بانک" />
        <ProfileField label="شماره شبا" />
      </Section>

      <Section title="اطلاعات شغلی">
        <ProfileField label="شغل" />
        <ProfileField label="نوع شغل" />
        <ProfileField label="محل کار" />
        <ProfileField label="شماره تلفن محل کار" />
        <ProfileField label="ایمیل محل کار" />
        <ProfileField label="کدپستی محل کار" />
      </Section>

      <Section title="آدرس‌ها">
        <ProfileField label="استان" />
        <ProfileField label="شهر" />
        <ProfileField label="خیابان" />
        <ProfileField label="کوچه" />
        <ProfileField label="کدپستی" />
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PersonProfile;
export { ProfileField };
