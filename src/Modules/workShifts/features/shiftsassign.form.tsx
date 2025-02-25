import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

// Type definitions
interface User {
  id: number;
  name: string;
}

interface Shift {
  id: number;
  name: string;
}

interface ShiftAssignment {
  user: string;
  shift: string;
}

const ShiftsAssignForm = () => {
  // Mock data with proper typing
  const [users] = useState<User[]>([
    { id: 1, name: "ممد امینی" },
    { id: 2, name: "علی حسینی" },
    { id: 3, name: "رضا محمدی" },
  ]);

  const [shifts] = useState<Shift[]>([
    { id: 1, name: "صبح (8-14)" },
    { id: 2, name: "عصر (14-20)" },
    { id: 3, name: "شب (20-2)" },
  ]);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [assignedShifts, setAssignedShifts] = useState<ShiftAssignment[]>([]);

  const handleAddShift = () => {
    if (!selectedUser || !selectedShift) return;

    const user = users.find((u) => u.id === Number(selectedUser));
    const shift = shifts.find((s) => s.id === Number(selectedShift));

    if (user && shift) {
      setAssignedShifts((prev) => [
        ...prev,
        { user: user.name, shift: shift.name },
      ]);
      setSelectedUser("");
      setSelectedShift("");
    }
  };

  const handleRemoveShift = (index: number) => {
    setAssignedShifts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitAll = () => {
    if (assignedShifts.length === 0) {
      alert("اول باید حداقل یک شیفت ثبت کنی!");
      return;
    }

    console.log("لیست نهایی شیفت‌ها:", assignedShifts);
    setAssignedShifts([]);
    alert("همه شیفت‌ها با موفقیت ثبت شدند!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        تخصیص شیفت
      </h2>

      <div className="space-y-6">
        <div>
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

        <div>
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
          disabled={!selectedUser || !selectedShift}
          className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
        >
          افزودن
        </button>

        <div>
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
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <span className="text-gray-700">{`${assignment.user} - ${assignment.shift}`}</span>
                  <button
                    onClick={() => handleRemoveShift(index)}
                    className="text-red-500 hover:text-red-600 transition duration-200"
                  >
                    <TiDeleteOutline size={20} />
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
    </div>
  );
};

export default ShiftsAssignForm;