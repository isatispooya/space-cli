import React from "react";
import Joyride, {

  Step,
} from "react-joyride";

interface LoginTourProps {
  runTour: boolean;
}

const LoginTour: React.FC<LoginTourProps> = ({ runTour }) => {
  const steps: Step[] = [
    {
      target: ".tour-login-form",
      content: "از این قسمت می‌توانید وارد حساب کاربری خود شوید",
      placement: "bottom",
    },
    {
      target: ".tour-forget-password",
      content: "در صورت فراموشی رمز عبور، از اینجا بازیابی کنید",
      placement: "bottom",
    },
    {
      target: ".tour-signup-form",
      content: "از این قسمت می‌توانید ثبت‌نام کنید",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: ".tour-signup-button",
      content: "برای ثبت‌نام کلیک کنید",
      placement: "bottom",
    },
    {
      target: ".tour-sejam-link",
      content:
        "برای ورود به برنامه باید در سامانه سجام ثبت‌نام کرده باشید. اگر هنوز ثبت‌نام نکرده‌اید، از این لینک استفاده کنید",
      placement: "top",
      disableBeacon: true,
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      scrollToFirstStep={true}
      showSkipButton={true}
      showProgress={true}
      locale={{
        back: "قبلی",
        close: "بستن",
        last: "پایان",
        next: "بعدی",
        skip: "رد کردن",
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#3B82F6",
        },
      }}
    />
  );
};

export default LoginTour;
