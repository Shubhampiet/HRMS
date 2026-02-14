import { X, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({ open, setOpen, onConfirm, emp }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h3 className="text-lg font-semibold text-gray-800">
            Delete Employee
          </h3>

          <button
            onClick={() => setOpen(false)}
            className="text-white border-gray-200 bg-gray-500 hover:bg-gray-300 hover:text-black transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="text-red-600" size={28} />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete{" "}
            <span className="font-bold text-black">{emp.name}</span>?
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-around space-x-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-white bg-gray-500 hover:bg-gray-300 transition hover:text-black"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              console.log("emp----", emp);

              onConfirm(emp.employee_id);
            }}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
