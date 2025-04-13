type UserStatus = "reserved" | "canceled" | "open" | "done";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

interface Props {
  data?: UserData;
}

const RequestUserDetail: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full rounded-2xl p-4 bg-white shadow-md">
        <p className="text-sm text-gray-500">اطلاعات کاربر در دسترس نیست</p>
      </div>
    );
  }

  const getUserStatusBadge = () => {
    const statusConfig = {
      reserved: { text: "رزرو شده", class: "bg-blue-100 text-blue-800" },
      canceled: { text: "لغو شده", class: "bg-red-100 text-red-800" },
      open: { text: "باز", class: "bg-green-100 text-green-800" },
      done: { text: "انجام شده", class: "bg-gray-100 text-gray-800" },
    };

    const status: UserStatus = "open";
    const config = statusConfig[status];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="w-full rounded-2xl p-4 bg-white shadow-md">
      <div className="flex flex-col">
        <h3 className="text-md font-semibold text-gray-800 mb-3">
          اطلاعات کاربر
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">نام و نام خانوادگی</p>
            <p className="text-sm text-gray-800">{`${data.first_name} ${data.last_name}`}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">کد ملی</p>
            <p className="text-sm text-gray-800">{data.uniqueIdentifier}</p>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">وضعیت:</span>
              {getUserStatusBadge()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestUserDetail;

