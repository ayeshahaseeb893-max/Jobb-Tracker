import { Edit2, Trash2 } from "lucide-react";

function JobList({ jobs, deleteJob, openEditModal }) {
  const statusColors = {
    Applied: "bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
    Interview: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
    Rejected: "bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300",
    Offer: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#111114]">
      <div className="hidden grid-cols-[1.8fr_1fr_1fr_0.9fr_0.7fr] border-b border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 md:grid">
        <span>Company / Role</span>
        <span>Location</span>
        <span>Applied</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="grid gap-3 px-4 py-4 md:grid-cols-[1.8fr_1fr_1fr_0.9fr_0.7fr] md:items-center"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {job.company}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {job.role}
              </p>
            </div>

            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {job.location || "—"}
            </div>

            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {job.appliedDate || "—"}
            </div>

            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusColors[job.status]}`}
              >
                {job.status}
              </span>
            </div>

            <div className="flex justify-start gap-2 md:justify-end">
              <button
                onClick={() => openEditModal(job)}
                className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-label="Edit application"
              >
                <Edit2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => deleteJob(job.id)}
                className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/40"
                aria-label="Delete application"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;