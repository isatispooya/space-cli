import { FC } from "react";
import { ViewDownload } from "../../../../components";
import toast from "react-hot-toast";
import { logolicense } from "@/assets";
import license from "../../../../assets/pdf/license.pdf";

const LicenseView: FC = () => {
  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
    window.open(license, "_blank");
  };

  return (
    <div>
      <ViewDownload
        title="مجوز پذیره نویسی"
        description="مجوز پذیره نویسی"
        regulatorLogo={logolicense}
        regulatorText="اداره کل ثبت اسناد و املاک استان یزد"
        downloadLink="مجوز پذیره نویسی"
        toastMessage="در حال دانلود فایل"
        isImg={false}
        toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
        downloadButtonText="دانلود مجوز پذیره نویسی"
        onDownload={handleDownload}
        target="_blank"
      />
    </div>
  );
};

export default LicenseView;
