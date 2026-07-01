import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import JobList from "../components/JobList";
import JobModal from "../components/JobModal";

function Applications({ darkMode, setDarkMode }) {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const persistJobs = (updatedJobs) => {
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    window.dispatchEvent(new Event("jobs-updated"));
  };

  const addJob = (job) => {
    setJobs((prevJobs) => {
      const updatedJobs = [...prevJobs, job];
      persistJobs(updatedJobs);
      return updatedJobs;
    });
  };

  const deleteJob = (id) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.filter((job) => job.id !== id);
      persistJobs(updatedJobs);
      return updatedJobs;
    });
  };

  const updateJob = (updatedJob) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      persistJobs(updatedJobs);
      return updatedJobs;
    });
    setEditingJob(null);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            Overview
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-white sm:text-4xl">
            Applications
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {jobs.length} total applications tracked
          </p>
        </div>

        <button
          onClick={() => {
            setEditingJob(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-500"
        >
          <Plus className="h-4 w-4" />
          Add Application
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-[#111114] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-zinc-300 md:min-w-[280px]">
            <Search className="h-4 w-4" />
            <input
              placeholder="Search by company or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-zinc-300">
            <Filter className="h-4 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>
          </label>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-[#1b1b20] dark:text-zinc-100"
        >
          {darkMode ? "Dark" : "Light"}
        </button>
      </div>

      <JobList
        jobs={filteredJobs}
        deleteJob={deleteJob}
        openEditModal={openEditModal}
      />

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addJob={addJob}
        editingJob={editingJob}
        updateJob={updateJob}
      />
    </div>
  );
}

export default Applications;