import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import { ViewDownload } from "../../../../components";
import toast from "react-hot-toast";

const ShareExpertView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IFinancialStatement {
    share_expert_description: string;
    share_expert_regulator: string;
    share_expert_regulator_logo: string;
    share_expert: string;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
  };

  return (
    <div>
      {data?.map((item: IFinancialStatement, index: number) => (
        <ViewDownload
          key={index}
          title="کارشناسی سهامی"
          description={item?.share_expert_description}
          regulatorLogo={item?.share_expert_regulator_logo}
          regulatorText={item?.share_expert_regulator}
          downloadLink={item?.share_expert}
          toastMessage="در حال دانلود فایل"
          toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
          onDownload={handleDownload}
        />
      ))}
    </div>
  );
};

export default ShareExpertView;
