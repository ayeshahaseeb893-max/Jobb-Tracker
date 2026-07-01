import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BriefcaseBusiness } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="
        w-64
        border-r
        border-zinc-200
        bg-white
        px-5
        py-6
        transition-colors duration-500 ease-out
        dark:border-zinc-800
        dark:bg-[#111114]
      "
    >
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2.5">
        <div
          className="
            flex h-8 w-8 items-center justify-center rounded-lg
            bg-gradient-to-r from-purple-500 to-indigo-500 shadow-sm
          "
        >
          <BriefcaseBusiness className="text-white" size={18} />
        </div>

        <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          JobTracker
        </h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
            ${
              location.pathname === "/"
                ? "bg-purple-500/15 text-purple-600 dark:text-purple-300"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link
          to="/applications"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all
            ${
              location.pathname === "/applications"
                ? "bg-purple-500/15 text-purple-600 dark:text-purple-300"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
        >
          <BriefcaseBusiness size={16} />
          Applications
        </Link>
      </nav>

    </aside>
  );
}

export default Sidebar;