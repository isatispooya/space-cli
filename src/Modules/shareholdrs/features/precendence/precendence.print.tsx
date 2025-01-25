import { FC } from "react";
import { motion } from "framer-motion";
import { usePrecendence } from "../../hooks";
import moment from "jalali-moment";
import "moment/locale/fa";
import { useParams } from "react-router-dom";
import { PrecedenceTypes } from "../../types";

const PrintPrecendence: FC = () => {
  const handlePrint = () => {
    window.print();
  };
  const { id } = useParams();
  const { data, isLoading } = usePrecendence.useGetById(Number(id));
  const precedence = data as PrecedenceTypes | undefined;

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!precedence) {
    return <div>اطلاعاتی یافت نشد</div>;
  }

  const printData = [
    { نام: precedence.user_detail?.first_name },
    { "نام خانوادگی": precedence.user_detail?.last_name },
    { کدملی: precedence.user_detail?.uniqueIdentifier },
    { "حق تقدم": precedence?.precedence },
    { شرکت: precedence.company_detail?.name },
    { "مبلغ کل": precedence.total_amount },
    {
      بروزرسانی: moment(precedence.updated_at)
        .locale("fa")
        .format("jYYYY/jM/jD"),
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-100  print:p-0">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none print:p-0">
          <div className="text-center  print:mb-12 border-b-2 border-gray-200 pb-6">
            <div className="flex justify-center items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                گزارش حق تقدم
              </h1>
            </div>
            <p className="text-gray-600 mt-2">
              تاریخ: {new Date().toLocaleDateString("fa-IR")}
            </p>
          </div>
          {precedence && (
            <div className="space-y-6 print:space-y-8">
              <div className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50">
                <h2 className="text-xl text-center font-semibold mb-6 text-gray-800 border-b pb-2">
                  اطلاعات حق تقدم
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {printData.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
                    >
                      <p className="text-gray-600 text-sm mb-2 font-medium">
                        {Object.keys(item)[0]}:
                      </p>
                      <p className="font-semibold text-gray-800 text-lg">
                        {Object.values(item)[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Print Button */}
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

      <div className="flex justify-center mb-4">
        <motion.button
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrint}
        >
          چاپ
        </motion.button>
      </div>
    </>
  );
};

export default PrintPrecendence;
