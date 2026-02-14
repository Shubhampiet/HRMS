import { useState } from "react";
import { MoreVertical } from "lucide-react";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import MarkAttendanceModal from "./modals/MarkAttendanceModal";
import ViewAttendanceModal from "./modals/ViewAttendanceModal";

const ActionMenu = ({
  emp,
  isOpen,
  setOpenMenuId,
  openMenuId,
  handleDelete,
  markAttendance,
}) => {
  const [viewAttendanceOpen, setViewAttendanceOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [markAttendanceOpen, setMarkAttendanceOpen] = useState(false);

  const toggleMenu = () => {
    if (openMenuId === emp.employee_id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(emp.employee_id);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleMenu} className="p-2 rounded hover:bg-gray-500">
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              setMarkAttendanceOpen(true);
              setOpenMenuId(null);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-500 text-sm "
          >
            Mark Attendance
          </button>

          <button
            onClick={() => {
              setViewAttendanceOpen(true);
              setOpenMenuId(null);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-500 text-sm"
          >
            View Attendance
          </button>

          <button
            onClick={() => {
              setDeleteOpen(true);
              setOpenMenuId(null);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-500 text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      )}

      <DeleteConfirmModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        emp={emp}
        onConfirm={(id) => {
          handleDelete(id);
          setDeleteOpen(false);
        }}
      />

      <MarkAttendanceModal
        open={markAttendanceOpen}
        setOpen={setMarkAttendanceOpen}
        employee={emp}
        onConfirm={(data) => {
          markAttendance(data);
          setMarkAttendanceOpen(false);
        }}
      />

      <ViewAttendanceModal
        open={viewAttendanceOpen}
        setViewAttendanceOpen={setViewAttendanceOpen}
        employee={emp}
      />
    </div>
  );
};

export default ActionMenu;
