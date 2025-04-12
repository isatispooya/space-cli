import { ConsultationUserType } from "../types";

export const subjects: ConsultationUserType["SubjectsType"] = [
  {
    id: "financial-planning",
    title: "برنامه‌ریزی مالی",
    icon: "💰",
    description: "مشاوره برنامه‌ریزی مالی شخصی و تجاری",
    category: "مالی",
  },
  {
    id: "investment",
    title: "مشاوره سرمایه‌گذاری",
    icon: "📈",
    description: "استراتژی‌های سرمایه‌گذاری و مدیریت پورتفولیو",
    category: "مالی",
  },
  {
    id: "software-architecture",
    title: "معماری نرم‌افزار",
    icon: "🏗️",
    description: "مشاوره طراحی و معماری سیستم",
    category: "تکنولوژی",
  },

];

export const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    Finance: "امور مالی",
    Technology: "تکنولوژی",
    Legal: "حقوقی",
    Marketing: "بازاریابی",
    Healthcare: "سلامت",
  };
  return translations[category] || category;
};
