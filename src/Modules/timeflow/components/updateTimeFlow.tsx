import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTimeflow } from "../hooks";
import moment from "moment-jalaali";
import { LoaderLg } from "@/components";
import { Button } from "@mui/material";
import { TimeflowVerifyType, TimeflowUpdateData } from "../types/timeflow.type";
import type { UsersTimeflowType } from "../types/userstimeflow.type";

const UpdateTimeFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useTimeflow.useGetTimeflow();
  const timeflowData = data?.find((item: UsersTimeflowType) => item.user_detail.id === Number(id));
  const { mutate: updateTimeflow } = useTimeflow.useUserTimeflowAccept();

  const [formData, setFormData] = useState<TimeflowVerifyType>({
    date: "",
    time_start: "",
    time_end: "",
    type: "",
    time_user: moment().format("HH:mm:ss"),
  });

  useEffect(() => {
    if (timeflowData) {
      setFormData({
        date: moment(timeflowData.date).format("YYYY-MM-DD"),
        time_start: moment(timeflowData.time_start, "HH:mm:ss").format("HH:mm"),
        time_end: moment(timeflowData.time_end, "HH:mm:ss").format("HH:mm"),
        type: timeflowData.type,
        time_user: moment().format("HH:mm:ss"),
      });
    }
  }, [timeflowData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData: TimeflowUpdateData = {
        id: Number(id),
        data: formData,
      };
      await updateTimeflow(updateData);
      navigate("/timeflow");
    } catch (error) {
      console.error("Error updating timeflow:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <LoaderLg />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 my-8">
      <h2 className="text-2xl font-bold mb-8 text-right text-gray-800">
        ویرایش اطلاعات زمانی
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 text-right text-gray-700 font-medium">
            تاریخ
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="text-right border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-right text-gray-700 font-medium">
            زمان شروع
          </label>
          <input
            type="time"
            name="time_start"
            value={formData.time_start}
            onChange={handleChange}
            className="text-right border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-right text-gray-700 font-medium">
            زمان پایان
          </label>
          <input
            type="time"
            name="time_end"
            value={formData.time_end}
            onChange={handleChange}
            className="text-right border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-right text-gray-700 font-medium">
            نوع
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="text-right border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          >
            <option value="working">زمان حضور</option>
            <option value="absence">غیبت</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            onClick={() => navigate("/timeflow")}
            variant="contained"
            className="!bg-gray-500 hover:!bg-gray-600 transition duration-200 !px-6 !py-2"
          >
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="!bg-blue-500 hover:!bg-blue-600 transition duration-200 !px-6 !py-2"
          >
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTimeFlow;
