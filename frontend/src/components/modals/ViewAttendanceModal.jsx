import React, { useEffect, useState } from "react";
// import { getAttendance } from "../api/attendance.api";
import { useApi } from "../../hooks/useApi";
import { getAttendance } from "../../api/attendenceApi";
import Loader from "../Loader";

const ViewAttendanceModal = ({ open, employee, setViewAttendanceOpen }) => {
  const [attendance, setAttendance] = useState([]);
  const { execute, loading } = useApi(getAttendance);

  useEffect(() => {
    if (open && employee?.employee_id) {
      fetchAttendance();
    }
  }, [open, employee]);

  const fetchAttendance = async () => {
    const data = await execute(employee.employee_id);
    if (data) {
      setAttendance(data);
    }
  };

  if (!open) return null;

  const total = attendance.length;
  const presentCount = attendance.filter(
    (item) => item.Attendance_status === "Present",
  ).length;
  const absentCount = total - presentCount;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">
            {employee?.name} Attendance
          </h2>

          <button
            onClick={() => setViewAttendanceOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-white bg-gray-500 hover:bg-gray-300 transition hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Summary */}
        {!loading && total > 0 && (
          <div className="flex gap-4 mb-4">
            <div className="bg-gray-100 px-4 py-2 rounded-lg text-black">
              Total: {total}
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              Present: {presentCount}
            </div>
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
              Absent: {absentCount}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <Loader />
        )}

        {/* Empty State */}
        {!loading && attendance.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No attendance records found.
          </div>
        )}

        {/* Table */}
        {!loading && attendance.length > 0 && (
          <div className="overflow-auto max-h-80">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border text-left text-black">Date</th>
                  <th className="p-2 border text-left text-black">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item) => (
                  <tr key={item.date}>
                    <td className="p-2 border text-gray-700">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`p-2 border font-medium ${
                        item.Attendance_status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.Attendance_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendanceModal;
