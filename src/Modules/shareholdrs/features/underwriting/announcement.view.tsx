import { FC } from "react";
import { useUnusedProcess } from "../../hooks";
import ViewDownload from "../../../../components/viewDownload";
import toast from "react-hot-toast";

const AnnouncementView: FC = () => {
  const { data } = useUnusedProcess.useGetList();

  interface IAnnouncement {
    announcement_underwriting: string;
    announcement_underwriting_description: string;
  }

  const handleDownload = () => {
    toast.success("در حال دانلود فایل");
  };

  return (
    <div>
      {data?.map((item: IAnnouncement, index: number) => (
        <ViewDownload
          key={index}
          title="اگهی پذیره نویسی"
          description={item?.announcement_underwriting_description}
          downloadLink={item?.announcement_underwriting}
          downloadButtonText="دانلود اگهی پذیره نویسی"
          regulatorLogo=""
          regulatorText="" 
          toastMessage="در حال دانلود فایل"
          toastError="در حال حاضر فایلی برای دانلود وجود ندارد"
          onDownload={handleDownload}
        />
      ))}
    </div>
  );
};

export default AnnouncementView;
