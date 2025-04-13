import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { LoaderLg, NoContent, Toast } from "@/components";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { FormInput, SelectInput } from "@/components/common";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useParams } from "react-router-dom";
import useConsultingReserveTurnUserById from "../../hooks/admin/useConsultingReserveTurnUserById";
import RequestUserDetail from "./requst_userDetail.feat";
import { useConsultingReserveTurnUserPatch } from "../../hooks/admin/UseConsultingReserveTurnUserPatch";
import { useUserData } from "@/Modules/users/hooks";
import {
  ConsultationType,
  TurnStatus,
  ConsultationRequestFormProps,
  UserData,
  ConsultingReserveTurn,
} from "../../types/consultation_request.type";
import { useConsultationStore } from "../../store";

const ConsultationRequestForm: React.FC<ConsultationRequestFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const { data, refetch } =
    useConsultingReserveTurnUserById.useGetConsultingReserveTurnUser(id || "");
  const consultingData: ConsultingReserveTurn | undefined = data
    ? ((Array.isArray(data) ? data[0] : data) as ConsultingReserveTurn)
    : undefined;
  const { data: usersData, isLoading: isUsersLoading } = useUserData();

  const { mutate: patchConsultingReserveTurnUser } =
    useConsultingReserveTurnUserPatch();

  const { formData, setFormData, setConsultationData } = useConsultationStore();

  useEffect(() => {
    if (consultingData) {
      setConsultationData(consultingData);
      setFormData({
        requestName: consultingData.consultant?.title || "",
        consultantId: consultingData.expert?.toString() || "",
        consultationType:
          consultingData.consultant?.kind_of_consultant?.map(
            (type: string) => type.toUpperCase() as ConsultationType
          ) || [],
        status: consultingData.status_of_turn,
        date: consultingData.date
          ? new DateObject({
              date: new Date(consultingData.date),
              calendar: persian,
              locale: persian_fa,
            })
          : null,
        description: consultingData.consultant?.description || "",
        startTime: null,
        endTime: null,
        isUrgent: false,
      });
    }
  }, [consultingData, setConsultationData, setFormData]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!formData.date) {
        throw new Error("لطفا تاریخ را انتخاب کنید");
      }

      const payload = {
        id: id || "",
        payload: {
          status_of_turn: formData.status,
          expert: Number(formData.consultantId),
          date: formData.date.toDate().toISOString(),
        },
      };

      await patchConsultingReserveTurnUser(payload, {
        onSuccess: async () => {
          await refetch();
          Toast(
            "درخواست مشاوره با موفقیت ثبت شد",
            <CheckmarkIcon />,
            "bg-green-500"
          );
        },
        onError: (error: Error) => {
          const errorMessage = error.message;
          Toast(errorMessage || "خطایی رخ داد", <ErrorIcon />, "bg-red-500");
          setError("خطا در ثبت درخواست: " + errorMessage);
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        Toast(error.message || "خطایی رخ داد", <ErrorIcon />, "bg-red-500");
        setError("خطا در ثبت درخواست: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ConsultTypeButton = ({
    type,
    label,
  }: {
    type: ConsultationType;
    label: string;
  }) => {
    return (
      <button
        key={type}
        onClick={() => {
          const newTypes = formData.consultationType.includes(type)
            ? formData.consultationType.filter((t) => t !== type)
            : [...formData.consultationType, type];
          setFormData({ consultationType: newTypes });
        }}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          formData.consultationType.includes(type)
            ? "bg-white shadow-sm text-[#29D2C7]"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        {label}
      </button>
    );
  };

  if (isLoading || isUsersLoading) {
    return <LoaderLg />;
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-3">
      <div className="w-full max-w-[1200px] flex gap-4">
        <div className="w-1/4">
          <RequestUserDetail data={consultingData?.counseling_requester} />
        </div>
        <div className="w-3/4">
          <div className="w-full rounded-2xl p-4 mt-4 bg-white shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#29D2C7] font-medium text-xl">
                فرم درخواست مشاوره
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع مشاوره
              </label>
              <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                {[
                  { id: "ONLINE" as ConsultationType, label: "آنلاین" },
                  { id: "IN_PERSON" as ConsultationType, label: "حضوری" },
                  { id: "PHONE" as ConsultationType, label: "تلفنی" },
                ].map((type) => (
                  <ConsultTypeButton
                    key={type.id}
                    type={type.id}
                    label={type.label}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 mb-6">
              <FormInput
                label="عنوان درخواست"
                value={formData.requestName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ requestName: e.target.value })
                }
                placeholder="عنوان درخواست را وارد کنید"
              />

              <SelectInput
                label="انتخاب مشاور"
                value={formData.consultantId?.toString()}
                onChange={(value) => setFormData({ consultantId: value })}
                options={
                  usersData?.map((user: UserData) => ({
                    value: user.id.toString(),
                    label: `${user.first_name} ${user.last_name}`,
                    disabled: false,
                  })) || []
                }
                placeholder="انتخاب کنید"
              />

              <SelectInput
                label="وضعیت درخواست"
                value={formData.status}
                onChange={(value) =>
                  setFormData({ status: value as TurnStatus })
                }
                options={[
                  { value: "reserved", label: "رزرو شده" },
                  { value: "canceled", label: "لغو شده" },
                  { value: "open", label: "باز" },
                  { value: "done", label: "انجام شده" },
                ]}
                placeholder="انتخاب کنید"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ و زمان
                </label>
                <DatePicker
                  value={formData.date}
                  onChange={(date) => setFormData({ date: date as DateObject })}
                  format="DD/MM/YYYY HH:mm:ss"
                  plugins={[<TimePicker position="bottom" hideSeconds />]}
                  calendar={persian}
                  locale={persian_fa}
                  inputClass="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#29D2C7] focus:border-[#29D2C7]"
                />
              </div>
            </div>
            {error && <NoContent label={error} />}

            <button
              onClick={handleSubmit}
              className="w-full bg-[#29D2C7] text-white py-3 px-4 rounded-md hover:bg-[#20B2A9] transition-colors font-medium"
              disabled={isLoading}
            >
              ثبت درخواست مشاوره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationRequestForm;
