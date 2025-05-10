import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import { ViewDownload } from "../../../../components";
import toast from "react-hot-toast";

const BusinessPlanView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IBusinessPlanType {
    business_plan_description: string;
    business_plan_regulator: string;
    business_plan_regulator_logo: string;
    business_plan: string;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
  };

  return (
    <div>
      {data?.map((item: IBusinessPlanType, index: number) => (
        <ViewDownload
          key={index}
          title="طرح کسب و کار"
          description={item?.business_plan_description}
          regulatorLogo={item?.business_plan_regulator_logo}
          regulatorText={item?.business_plan_regulator}
          downloadLink={item?.business_plan}
          toastMessage="در حال دانلود فایل"
          toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
          onDownload={handleDownload}
          target="_blank"
        />
      ))}
    </div>
  );
};

export default BusinessPlanView;
