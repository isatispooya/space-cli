import { FC } from "react";
import { ViewDownload } from "../../../../components";
import toast from "react-hot-toast";
import logo from "/public/logolicense.png";
import license from "../../../../../public/assets/image.png";

const LicenseView: FC = () => {
  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
    window.open("/license.pdf", "_blank");
  };

  return (
    <div>
      <ViewDownload
        title="مجوز پذیره نویسی"
        description="مجوز پذیره نویسی"
        regulatorLogo={logo}
        regulatorText="اداره کل ثبت اسناد و املاک استان یزد"
        downloadLink="مجوز پذیره نویسی"
        toastMessage="در حال دانلود فایل"
        isImg={true}
        img={license}
        toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
        downloadButtonText="دانلود مجوز پذیره نویسی"
        onDownload={handleDownload}
        target="_blank"
      />
    </div>
  );
};

export default LicenseView;
