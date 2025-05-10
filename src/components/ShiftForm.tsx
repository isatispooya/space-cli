import React, { useState } from "react";

interface ShiftFormPropsType {
  onSubmit: (shiftName: string) => void;
}

const ShiftForm: React.FC<ShiftFormPropsType> = ({ onSubmit }) => {
  const [shiftName, setShiftName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shiftName.trim()) {
      onSubmit(shiftName.trim());
      setShiftName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label
          htmlFor="shiftName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Shift Name
        </label>
        <input
          type="text"
          id="shiftName"
          value={shiftName}
          onChange={(e) => setShiftName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter shift name"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Shift
      </button>
    </form>
  );
};

export default ShiftForm;
