import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

function Charts({ jobs }) {
  // Dummy monthly data for now
  const monthlyData = [
    { month: "Jan", applications: 4 },
    { month: "Feb", applications: 7 },
    { month: "Mar", applications: 10 },
    { month: "Apr", applications: 8 },
    { month: "May", applications: 13 },
    { month: "Jun", applications: 15 },
  ];

  const statusData = [
    {
      name: "Applied",
      value: jobs.filter((j) => j.status === "Applied").length,
    },
    {
      name: "Interview",
      value: jobs.filter((j) => j.status === "Interview").length,
    },
    {
      name: "Rejected",
      value: jobs.filter((j) => j.status === "Rejected").length,
    },
    {
      name: "Offer",
      value: jobs.filter((j) => j.status === "Offer").length,
    },
  ];

  const COLORS = ["#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
      {/* Line Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-[#111114]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              Insights
            </p>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Application Trends
            </h2>
          </div>

          <div className="rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-300">
            6 months
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#f4f4f5" strokeDasharray="0" />
              <XAxis
                dataKey="month"
                stroke="#71717a"
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              <YAxis
                stroke="#71717a"
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                cursor={{ stroke: "#8b5cf6", strokeDasharray: "4 4" }}
                contentStyle={{
                  borderRadius: "12px",
                  borderColor: "#e4e4e7",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-[#111114]">
        <div className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            Breakdown
          </p>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Status Overview
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={56}
                  outerRadius={82}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-1 w-full space-y-2">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;