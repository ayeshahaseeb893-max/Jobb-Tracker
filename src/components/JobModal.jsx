import { useState, useEffect } from "react";

function JobModal({ isOpen, onClose, addJob, editingJob, updateJob }) {
  // Form state
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    appliedDate: "",
    status: "Applied",
    notes: "",
  });

  // If editing, pre-fill form with existing data
  useEffect(() => {
    if (editingJob) {
      setFormData(editingJob);
    }
  }, [editingJob]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit existing job
    if (editingJob) {
      updateJob(formData);
    } else {
      // Add new job
      addJob({
        ...formData,
        id: Date.now(),
      });
    }

    // Reset form
    setFormData({
      company: "",
      role: "",
      location: "",
      appliedDate: "",
      status: "Applied",
      notes: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-[#111114] sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {editingJob ? "Update" : "New"}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white sm:text-3xl">
              {editingJob ? "Edit Application" : "Add Application"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
            />

            <input
              name="role"
              placeholder="Job Title"
              value={formData.role}
              onChange={handleChange}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
            />

            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
            />

            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
            />
          </div>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Notes
              </label>
              <span className="text-xs text-zinc-500">Optional</span>
            </div>
            <textarea
              name="notes"
              placeholder="Add any extra details..."
              value={formData.notes}
              onChange={handleChange}
              className="h-28 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-purple-500 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>

            <button className="rounded-xl bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-500">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobModal;