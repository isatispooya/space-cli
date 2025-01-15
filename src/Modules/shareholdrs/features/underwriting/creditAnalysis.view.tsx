import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import { ViewDownload } from "../../../../components";
import toast from "react-hot-toast";

interface ICreditAnalysis {
  validation_description: string;
  validation: string;
  validation_regulator_logo: string;
  validation_regulator: string;
}

const CreditAnalysisView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {data?.map((item: ICreditAnalysis, index: number) => (
        <ViewDownload
          key={index}
          title="اعتبار سنجی بانکی"
          description={item?.validation_description}
          regulatorLogo={item?.validation_regulator_logo}
          regulatorText={item?.validation_regulator}
          downloadLink={item?.validation}
          isImg={true}
          toastMessage="در حال دانلود فایل"
          toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
          onDownload={handleDownload}
          downloadButtonText="دانلود اعتبار سنجی بانکی"
          target="_blank"
        />
      ))}
    </div>
  );
};

export default CreditAnalysisView;
