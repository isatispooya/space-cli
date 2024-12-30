import React from "react";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);

export default ProfileSection;
