import { useTimeflow } from "../hooks";

const TimeflowVerify = () => {
  const { data: userLogin } = useTimeflow.useGetUsersLogin();

  console.log(userLogin);

  return (
    <div className="min-h-screen relative ">
      <div className="container mx-auto px-4 py-8 relative">
        {/* <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 mb-8">
          <p className="text-lg text-center text-gray-800 mb-6">
            لطفا ورود و خروج را ثبت کنید
          </p>

          <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6 justify-between">
              <Stack direction="row" spacing={2}>
                <Chip
                  label="ورود"
                  variant={selectedChip === "ورود" ? "filled" : "outlined"}
                  onClick={() => setSelectedChip("ورود")}
                  className={
                    selectedChip === "ورود"
                      ? "bg-green-500 text-white hover:bg-green-600 shadow-md transform transition-all duration-200 hover:scale-105"
                      : "text-green-500 border-green-500 hover:bg-green-50 shadow-sm transform transition-all duration-200 hover:scale-105"
                  }
                  style={{ padding: "12px 20px", fontSize: "16px" }} // افزایش سایز چیپ
                />
                <Chip
                  label="خروج"
                  variant={selectedChip === "خروج" ? "filled" : "outlined"}
                  onClick={() => setSelectedChip("خروج")}
                  className={
                    selectedChip === "خروج"
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-md transform transition-all duration-200 hover:scale-105"
                      : "text-red-500 border-red-500 hover:bg-red-50 shadow-sm transform transition-all duration-200 hover:scale-105"
                  }
                  style={{ padding: "12px 20px", fontSize: "16px" }}
                />
              </Stack>

              <div className="flex items-center ">
                <DatePicker
                  placeholder="تاریخ"
                  value={date}
                  onChange={(date) => setDate(date?.toString() || "")}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="border-2 border-gray-300 w-96 text-center bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  inputClass="text-lg p-2 rounded-lg "
                  containerClassName="w-full border border-gray-400 "
                />
              </div>

              <div className="flex items-center gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="ساعت "
                    value={entryTime}
                    onChange={setEntryTime}
                    className="w-48 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ثبت
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TimeflowVerify;
