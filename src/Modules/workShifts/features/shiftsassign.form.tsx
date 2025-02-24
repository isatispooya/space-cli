import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const ShiftsAssignForm = () => {
  const [users] = useState([
    { id: 1, name: "ممد امینی" },
    { id: 2, name: "علی حسینی" },
    { id: 3, name: "رضا محمدی" },
  ]);

  const [shifts] = useState([
    { id: 1, name: "صبح (8-14)" },
    { id: 2, name: "عصر (14-20)" },
    { id: 3, name: "شب (20-2)" },
  ]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [assignedShifts, setAssignedShifts] = useState([]);

  const handleAddShift = () => {
    if (selectedUser && selectedShift) {
      const newAssignment = {
        user: users.find((u) => u.id === parseInt(selectedUser))?.name,
        shift: shifts.find((s) => s.id === parseInt(selectedShift))?.name,
      };
      setAssignedShifts([...assignedShifts, newAssignment]);
      setSelectedUser("");
      setSelectedShift("");
    }
  };

  const handleRemoveShift = (indexToRemove: number) => {
    setAssignedShifts(
      assignedShifts.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmitAll = () => {
    if (assignedShifts.length > 0) {
      console.log("لیست نهایی شیفت‌ها:", assignedShifts);
      setAssignedShifts([]);
      alert("همه شیفت‌ها با موفقیت ثبت شدند!");
    } else {
      alert("اول باید حداقل یک شیفت ثبت کنی!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        تخصیص شیفت
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">کاربر:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب کنید</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">شیفت:</label>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب کنید</option>
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {shift.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddShift}
        className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200 mb-6"
      >
        افزودن
      </button>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          لیست شیفت‌های انتخاب شده:
        </h3>
        {assignedShifts.length === 0 ? (
          <p className="text-gray-500">هنوز شیفتی ثبت نشده</p>
        ) : (
          <ul className="space-y-2">
            {assignedShifts.map((assignment, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md text-gray-700"
              >
                <span>{`${assignment.user} - ${assignment.shift}`}</span>
                <button
                  onClick={() => handleRemoveShift(index)}
                  className=" text-red-500 px-1 py-1 rounded-md transition duration-200"
                >
                  <TiDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleSubmitAll}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        ثبت همه شیفت‌ها
      </button>
    </div>
  );
};

export default ShiftsAssignForm;
