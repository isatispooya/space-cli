import { FC } from "react";
import { motion } from "framer-motion";
import { useUnderwriting } from "../../hooks";
import moment from "jalali-moment";
import { useParams } from "react-router-dom";
// `https://my.isatispooya.com/login?rf=${rf}`
interface underwritingTypes {
  id: number;
  type: string;
  price: number;
  status?: "pending" | "approved" | "rejected";
  payment_detail?: {
    track_id?: string;
  };
  user_detail?: {
    first_name: string;
    last_name: string;
    username: string;
  };
  requested_amount: number;
  created_at: string;
}

const PrintUnderwriting: FC = () => {
  const handlePrint = () => {
    window.print();
  };
  const { id } = useParams();

  const { data, isLoading } = useUnderwriting.useGetById(Number(id));
  const underwritingPrint = data as underwritingTypes | undefined;

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!underwritingPrint) {
    return <div>اطلاعاتی یافت نشد</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 rtl print:p-0">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
        <div className="text-center mb-8 print:mb-12 border-b-2 border-gray-200 pb-6">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              گزارش پذیره‌نویسی
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            تاریخ: {new Date().toLocaleDateString("fa-IR")}
          </p>
        </div>
        {underwritingPrint && (
          <div className="space-y-6 print:space-y-8">
            <div className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl text-center font-semibold mb-6 text-gray-800 border-b pb-2">
                اطلاعات پذیره‌نویسی
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    نام کاربر:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.user_detail
                      ? `${underwritingPrint.user_detail.first_name} ${underwritingPrint.user_detail.last_name}`
                      : "نامشخص"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    کد ملی:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.user_detail?.username || "نامشخص"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    مبلغ:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {(underwritingPrint.price ?? 0).toLocaleString()} ریال
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    شماره پیگیری:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.payment_detail?.track_id || "ندارد"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    تعداد درخواستی:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.requested_amount}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">نوع:</p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.type === "2"
                      ? "درگاه پرداخت"
                      : "فیش بانکی"}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    تاریخ ایجاد:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {moment(underwritingPrint.created_at)
                      .locale("fa")
                      .format("jYYYY/jMM/jDD")}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                  <p className="text-gray-600 text-sm mb-2 font-medium">
                    وضعیت:
                  </p>
                  <p className="font-semibold text-gray-800 text-lg">
                    {underwritingPrint.status === "pending" &&
                      "در انتظار بررسی"}
                    {underwritingPrint.status === "approved" && "تایید شده"}
                    {underwritingPrint.status === "rejected" && "رد شده"}
                    {!underwritingPrint.status && "نامشخص"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Print Button */}
        <motion.button
          className="fixed bottom-8 left-8 bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrint}
        >
          چاپ
        </motion.button>
      </div>

      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            background-color: white;
          }
          @page {
            size: A4;
            margin: 2cm;
          }
          .print-shadow {
            box-shadow: none !important;
          }
        }

        /* اضافه کردن واترمارک در حالت پرینت */
        @media print {
          .max-w-4xl {
            position: relative;
          }
          .max-w-4xl::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><text x="50%" y="50%" font-family="Arial" font-size="20" fill="rgba(0,0,0,0.1)" text-anchor="middle">گزارش پذیره‌نویسی</text></svg>');
            background-repeat: repeat;
            opacity: 0.1;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintUnderwriting;
