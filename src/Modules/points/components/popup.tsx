const Popup = ({
  isOpen,
  label,
  text,
  onConfirm,
  onCancel,
  onClose,
}: {
  isOpen: boolean;
  label: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      {isOpen && (
        <div
          data-dialog-backdrop="dialog-xs"
          data-dialog-backdrop-close="true"
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity "
        >
          <div
            data-dialog="dialog-xs"
            className="relative m-4 p-6 w-11/12 max-w-md rounded-xl bg-gradient-to-br from-white to-slate-100 shadow-lg "
          >
            <div className="flex items-center pb-4 text-2xl font-semibold text-gray-800 border-b border-gray-300">
              {label}
            </div>
            <div className="py-4 text-center text-base leading-relaxed text-gray-600 font-light">
              {text}
            </div>
            <div className="flex items-center justify-center mb-4">
              <input
                type="number"
                placeholder="تعداد"
                className="peer w-full py-2 px-4 text-right text-gray-700 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-4">
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="rounded-md bg-gradient-to-r from-green-500 to-green-700 py-2 px-6 text-sm font-medium text-white shadow-lg transition-all hover:from-green-600 hover:to-green-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                تایید
              </button>
              <button
                onClick={() => {
                  onCancel();
                  onClose();
                }}
                className="rounded-md border border-gray-300 bg-gray-100 py-2 px-6 text-sm font-medium text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
