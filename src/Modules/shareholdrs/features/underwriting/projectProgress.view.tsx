import { FC } from "react";

import { useUnusedProcess } from "../../hooks";
import toast from "react-hot-toast";
import { ViewDownload } from "../../../../components";

const ProjectProgressView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IProgressPlan {
    progress_plan_description: string;
    progress_plan_regulator: string;
    progress_plan_regulator_logo: string;
    progress_plan: string;
  }

  if ( data?.progress_plan === null) {
    toast.error("در حال حاضر پیشرفت پروژه وجود ندارد");
    return null;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود پیشرفت پروژه");
  };



  return (
    <div>
      {data?.map((item: IProgressPlan, index: number) => (
          <ViewDownload
            key={index}
            title="پیشرفت پروژه"
            description={item?.progress_plan_description}
            regulatorLogo={item?.progress_plan_regulator_logo}
            regulatorText={item?.progress_plan_regulator}
            downloadLink={item?.progress_plan}
            toastMessage="در حال دانلود فایل"
            toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
            onDownload={handleDownload}
          />
      ))}
    </div>
  );
};

export default ProjectProgressView;
