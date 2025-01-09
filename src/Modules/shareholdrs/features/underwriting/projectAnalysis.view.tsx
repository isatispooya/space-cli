import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import ViewDownload from "../../../../components/viewDownload";
import toast from "react-hot-toast";

const ProjectAnalysisView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IProjectAnalysis {
    validation_project_description: string;
    validation_project: string;
    validation_project_regulator: string;
    validation_project_regulator_logo: string;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
  };

  return (
    <div>
      {data?.map((item: IProjectAnalysis, index: number) => (
        <ViewDownload
          target="_blank"
          downloadButtonText="دانلود تحلیل پروژه"
          key={index}
          title="تحلیل پروژه"
          description={item?.validation_project_description}
          downloadLink={item?.validation_project}
          regulatorLogo={item?.validation_project_regulator_logo}
          regulatorText={item?.validation_project_regulator}
          toastMessage="در حال دانلود فایل"
          toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
          onDownload={handleDownload}
        />
      ))}
    </div>
  );
};

export default ProjectAnalysisView;
