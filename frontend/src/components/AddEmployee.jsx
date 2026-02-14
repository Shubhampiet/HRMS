import { useState } from "react";
import { X } from "lucide-react";
import { InputField } from "../atomic/Inputfield";

const AddEmployeeModal = ({ open, setOpen, onSubmit }) => {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validate = () => {
    const newErrors = {};

    if (!form.employee_id.trim())
      newErrors.employee_id = "Employee ID is required";

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Valid email required";

    if (!form.department.trim()) newErrors.department = "Department required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit && onSubmit(form);
    setOpen(false);
    setForm({
      employee_id: "",
      name: "",
      email: "",
      department: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative animate-fadeIn">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-black-400 hover:text-gray-600 bg-gray-500"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-6 text-black">
          Add New Employee
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Employee ID"
            value={form.employee_id}
            error={errors.employee_id}
            onChange={(val) => setForm({ ...form, employee_id: val })}
          />

          <InputField
            label="Full Name"
            value={form.name}
            error={errors.name}
            onChange={(val) => setForm({ ...form, name: val })}
          />

          <InputField
            label="Email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(val) => setForm({ ...form, email: val })}
          />

          <InputField
            label="Department"
            value={form.department}
            error={errors.department}
            onChange={(val) => setForm({ ...form, department: val })}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
