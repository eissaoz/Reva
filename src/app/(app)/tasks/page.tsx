import Link from "next/link";
import { routes } from "@/lib/routes";

const taskRows = [
  { title: "Refund Table 4", priority: "Urgent", status: "In Progress", owner: "Elena" },
  { title: "Follow-up with James M.", priority: "High", status: "Pending", owner: "Rami" },
  { title: "Close positive loop", priority: "Medium", status: "Done", owner: "Fatuma" },
];

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Turn complaints into action.</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Precision recovery workflow for elite hospitality operations.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Pending Items</p>
          <p className="font-headline text-6xl font-extrabold tracking-tight text-[var(--gold)]">08</p>
        </div>
      </section>

      <section className="veil-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[var(--bg)] text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3">Task</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {taskRows.map((row) => (
                <tr key={row.title} className="border-t border-[var(--border)]">
                  <td className="px-4 py-4 font-semibold">{row.title}</td>
                  <td className="px-4 py-4">{row.priority}</td>
                  <td className="px-4 py-4 text-[var(--text-secondary)]">{row.status}</td>
                  <td className="px-4 py-4">{row.owner}</td>
                  <td className="px-4 py-4">
                    <Link href={routes.resolveComplaint} className="veil-btn-primary inline-block px-3 py-2 text-xs">Resolve</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
