import { useEffect, useState } from "react";
import ActionMenu from "../components/ActionMenu";
import AddEmployeeModal from "../components/AddEmployee";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployees,
} from "../api/employeeApi";
import { useApi } from "../hooks/useApi";
import { markAttendanceApi } from "../api/attendenceApi";
import Loader from "../components/Loader";

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { execute, loading } = useApi(getEmployees);
  const [openMenuId, setOpenMenuId] = useState(null);

  const { execute: createEmployee } = useApi(createEmployeeApi);
  const { execute: deleteEmployee } = useApi(deleteEmployeeApi);
  const { execute: markAttendance } = useApi(markAttendanceApi);

  const handleAdd = async (form) => {
    await createEmployee(form);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await execute();
    if (data) setEmployees(data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleMarkAttendance = async (data) => {
    await markAttendance(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          <p className="text-gray-500">Manage employees and track attendance</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm"
        >
          + Add Employee
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="">
          <table className="min-w-full text-sm text-left">
            {/* Table Header */}
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Employee ID</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Full Name</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Email Address</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4">Department</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {/* Loading Row */}
              {loading && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    <Loader />
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No employees found.
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!loading &&
                employees.map((emp) => (
                  <tr
                    key={emp.employee_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800">
                      {emp.employee_id}
                    </td>

                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-500">
                      {emp.name}
                    </td>

                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-500 break-words">
                      {emp.email}
                    </td>

                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600">
                        {emp.department}
                      </span>
                    </td>

                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-right relative">
                      <ActionMenu
                        emp={emp}
                        isOpen={openMenuId === emp.employee_id}
                        setOpenMenuId={setOpenMenuId}
                        openMenuId={openMenuId}
                        handleDelete={handleDelete}
                        markAttendance={handleMarkAttendance}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddEmployeeModal
        open={open}
        setOpen={setOpen}
        onSubmit={(data) => {
          handleAdd(data);
        }}
      />
    </div>
  );
};

export default Employees;
