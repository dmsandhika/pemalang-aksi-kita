import { ReportStatus, statusLabels } from "@/data/mockData";

const statusStyles: Record<ReportStatus, string> = {
  submitted: "status-submitted",
  review: "status-review",
  progress: "status-progress",
  resolved: "status-resolved",
};

export default function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
