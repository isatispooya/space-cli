interface StatusTranslation {
  text: string;
  button?: string;
  url?: string;
}

const getStatusTranslations = (
  hasPermission: boolean
): Record<string, StatusTranslation> => ({
  pending_review: {
    text: "در انتظار بررسی",
    button: hasPermission ? "بررسی" : "",
    url: hasPermission ? "/requestinsurance/prosses" : "",
  },
  missing_document: {
    text: "نقص مدارک",
    button: "تکمیل مدارک",
    url: "/requestinsurance/prosses",
  },
  pending_payment: {
    text: "در انتظار پرداخت",
    button: "پرداخت",
    url: "/requestinsurance/prosses",
  },
  rejected: {
    text: "رد شده",
    button: hasPermission ? "رد شده" : "",
    url: hasPermission ? "/requestinsurance/prosses" : "",
  },
  pendeing_issue: {
    text: "در انتظار بررسی مستندات",
    button: hasPermission ? "بارگزاری بیمه نامه" : "",
    url: hasPermission ? "/requestinsurance/prosses" : "",
  },
  finished: {
    text: "صادر شده",
    button: hasPermission ? "صادر شده" : "",
    url: hasPermission ? "/requestinsurance/prosses" : "",
  },
});

export default getStatusTranslations;
