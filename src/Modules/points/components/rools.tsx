import { motion } from "framer-motion";

const Rools = () => {
  return (
    <div className="flex flex-col w-full min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-7xl mx-auto bg-white rounded-xl shadow-xl border-4 border-double border-gray-200 p-8"
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#5677BC] rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#5677BC] rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#5677BC] rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#5677BC] rounded-br-lg" />

        <motion.div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold text-[#5677BC] mb-6">
            باشگاه ایساتیس صنایع مفتول ایساتیس پویا
          </h1>

          <div className="prose prose-lg max-w-4xl mx-auto text-right space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                با افتخار اعلام می‌کنیم که باشگاه ایساتیس صنایع مفتول ایساتیس
                پویا، با هدف ایجاد ارزش بیشتر برای سهام‌داران و همراهان گرامی،
                آغاز به کار کرده است. این باشگاه فرصتی ویژه است تا شما، به‌عنوان
                یکی از اعضای خانواده ایساتیس پویا، از امکانات و مزایای
                منحصر‌به‌فرد آن بهره‌مند شوید.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5677BC] mb-4">
                مزایای عضویت در باشگاه ایساتیس
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">
                    ۱. کسب امتیاز از فعالیت‌های مختلف:
                  </h3>
                  <ul className="list-disc list-inside pr-4">
                    <li>معرفی مشتریان جدید</li>
                    <li>افزایش سرمایه و خرید سهام</li>
                    <li>تکمیل اطلاعات پروفایل</li>
                    <li>تعامل با باشگاه در مناسبت‌های خاص</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">۲. دریافت جوایز ویژه:</h3>
                  <p>
                    امتیازات کسب‌شده را می‌توانید به سهام شرکت تبدیل کنید یا از
                    جوایز جذاب دیگر بهره‌مند شوید
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5677BC] mb-4">
                سطوح باشگاه و مزایا
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-bold mb-2">سطح برنزی</h3>
                  <ul className="text-sm space-y-1">
                    <li>عضویت پایه با دسترسی به امکانات اصلی</li>
                    <li>دریافت ٪ سهام از معرفی‌ها</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-bold mb-2">سطح نقره‌ای</h3>
                  <ul className="text-sm space-y-1">
                    <li>٪ سهام از معرفی‌ها</li>
                    <li>دعوت به وبینارها</li>
                    <li>دریافت هدیه‌های کوچک</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-bold mb-2">سطح طلایی</h3>
                  <ul className="text-sm space-y-1">
                    <li>٪ سهام از معرفی‌ها</li>
                    <li>شرکت در قرعه‌کشی‌های ماهانه</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-bold mb-2">سطح الماسی</h3>
                  <ul className="text-sm space-y-1">
                    <li>٪ سهام از معرفی‌ها</li>
                    <li>عضویت در کمیته ویژه مشاوره</li>
                    <li>دسترسی به خدمات VIP</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5677BC] mb-4">
                چگونه عضو شویم؟
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  از طریق لینک ثبت‌نام در باشگاه ایساتیس، پروفایل خود را بسازید
                </li>
                <li>کد معرف شخصی خود را دریافت کنید</li>
                <li>دوستان و آشنایان خود را معرفی کنید</li>
                <li>
                  با فعالیت بیشتر، امتیاز کسب کنید و به سطوح بالاتر دست یابید
                </li>
              </ol>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5677BC] mb-4">
                امور خیریه
              </h2>
              <p>
                شما عزیزان می‌توانید امتیازات دریافتی در باشگاه ایساتیس خود را
                در امور خیریه (طبق لیست پیشنهادی در باشگاه ایساتیس) صرف نمایید.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5677BC] mb-4">
                آینده‌ای روشن با همراهی شما
              </h2>
              <p>
                باشگاه ایساتیس صنایع مفتول ایساتیس پویا، فرصتی است برای رشد،
                موفقیت و سرمایه‌گذاری پایدار. همین امروز عضو شوید و همراه ما در
                این مسیر هیجان‌انگیز باشید.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Rools;
