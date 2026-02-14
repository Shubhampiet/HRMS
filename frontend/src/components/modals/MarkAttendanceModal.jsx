import { X, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

const MarkAttendanceModal = ({ open, setOpen, employee, onConfirm }) => {
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    employee_id: "",
    date: getTodayDate() || "",
    Attendance_status: "",
  });

  useEffect(() => {
    if (employee) {
      setForm((prev) => ({
        ...prev,
        employee_id: employee.employee_id,
      }));
    }
  }, [employee]);

  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Mark Attendance
          </h3>

          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-white bg-gray-500 hover:bg-gray-300 transition hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        {/* Employee Info Card */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <span className="font-semibold text-gray-700">Employee name:</span>
          <span className=" text-gray-700 ml-1">{employee?.name}</span>

          <div>
            <span className="font-semibold text-gray-700">Employee Id:</span>
            <span className=" text-gray-700 ml-1">{employee?.employee_id}</span>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Date
          </label>

          <div className="relative bg-white">
            <CalendarDays size={18} className="absolute left-3 top-3" />
            <input
              type="date"
              value={form.date || ""}
              max={getTodayDate()}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className=" w-full border border-gray-200 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-500"
            />
          </div>
        </div>

        {/* Status Toggle */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Status
          </label>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, Attendance_status: "Present" })}
              className={`flex-1 py-2 rounded-lg border transition ${
                form.status === "Present"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "border-gray-200 text-gray-600 bg-green-50"
              }`}
            >
              Present
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, Attendance_status: "Absent" })}
              className={`flex-1 py-2 rounded-lg border transition ${
                form.status === "Absent"
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "border-gray-200 text-gray-600 bg-red-50"
              }`}
            >
              Absent
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-around space-x-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-white bg-gray-500 hover:bg-gray-300 transition hover:text-black"
          >
            Cancel
          </button>

          <button
            onClick={(id) => onConfirm && onConfirm(form)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendanceModal;
