import { BriefcaseBusiness, CheckCircle2, CircleDashed, CircleX, Trophy } from "lucide-react";

function StatCard({ title, value, subtitle }) {
  const iconMap = {
    Total: BriefcaseBusiness,
    Applied: CheckCircle2,
    Interview: CircleDashed,
    Rejected: CircleX,
    Offers: Trophy,
  };

  const Icon = iconMap[title] || BriefcaseBusiness;

  return (
    <div className="group h-full rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-[#111114]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300">
            <Icon className="h-4.5 w-4.5" />
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
        </div>

        <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
      </div>

      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          {value}
        </h2>
      </div>

      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        {subtitle}
      </p>
    </div>
  );
}

export default StatCard;