import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

function Dashboard({ darkMode, setDarkMode }) {
  const getStoredJobs = () => {
    try {
      return JSON.parse(localStorage.getItem("jobs")) || [];
    } catch {
      return [];
    }
  };

  const [jobs, setJobs] = useState(getStoredJobs);

  useEffect(() => {
    const syncJobs = () => setJobs(getStoredJobs());

    syncJobs();
    window.addEventListener("jobs-updated", syncJobs);
    window.addEventListener("storage", syncJobs);

    return () => {
      window.removeEventListener("jobs-updated", syncJobs);
      window.removeEventListener("storage", syncJobs);
    };
  }, []);

  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interview = jobs.filter((j) => j.status === "Interview").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Track your applications and progress
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100"
        >
          <span>{darkMode ? "Dark" : "Light"}</span>
          {darkMode ? (
            <Moon className="h-4 w-4 text-purple-500" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-500" />
          )}
        </button>
      </div>

      {/* Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        <StatCard title="Total" value={jobs.length} subtitle="Applications" />
        <StatCard title="Applied" value={applied} subtitle="Submitted" />
        <StatCard title="Interview" value={interview} subtitle="In progress" />
        <StatCard title="Rejected" value={rejected} subtitle="Closed" />
        <StatCard title="Offers" value={offers} subtitle="Success" />
      </div>

      <Charts jobs={jobs} />
    </div>
  );
}

export default Dashboard;