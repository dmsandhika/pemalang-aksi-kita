import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle, AlertTriangle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { mockReports, categoryLabels, categoryColors, statusLabels, type ReportStatus } from "@/data/mockData";
import { Link } from "react-router-dom";

const myReports = mockReports.slice(0, 4); // simulate user's reports

const timeline: Record<ReportStatus, { label: string; icon: typeof Clock }> = {
  submitted: { label: "Laporan dikirim", icon: FileText },
  review: { label: "Sedang ditinjau petugas", icon: Clock },
  progress: { label: "Dalam proses pengerjaan", icon: AlertTriangle },
  resolved: { label: "Masalah telah diselesaikan", icon: CheckCircle },
};

const statusOrder: ReportStatus[] = ["submitted", "review", "progress", "resolved"];

function getTimelineSteps(currentStatus: ReportStatus) {
  const idx = statusOrder.indexOf(currentStatus);
  return statusOrder.map((s, i) => ({ ...timeline[s], status: s, completed: i <= idx }));
}

const notifications = [
  { id: 1, text: "Laporan RPT-001 sedang dalam proses pengerjaan oleh Dinas PU", time: "2 jam lalu" },
  { id: 2, text: "Laporan RPT-004 telah diselesaikan. Terima kasih!", time: "1 hari lalu" },
];

export default function CitizenDashboard() {
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Warga</h1>
            <p className="text-muted-foreground">Pantau status laporan Anda</p>
          </div>
          <Link to="/report">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Laporan Baru
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Laporan", value: myReports.length, color: "text-primary", bg: "bg-primary/10" },
            { label: "Dalam Proses", value: myReports.filter((r) => r.status === "progress").length, color: "text-warning", bg: "bg-warning/10" },
            { label: "Ditinjau", value: myReports.filter((r) => r.status === "review").length, color: "text-info", bg: "bg-info/10" },
            { label: "Selesai", value: myReports.filter((r) => r.status === "resolved").length, color: "text-success", bg: "bg-success/10" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Reports list */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Laporan Saya</h2>
            <div className="space-y-4">
              {myReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="overflow-hidden rounded-xl border bg-card"
                >
                  <div className="flex flex-col sm:flex-row">
                    <img src={report.photo} alt={report.title} className="h-32 w-full object-cover sm:h-auto sm:w-40" />
                    <div className="flex-1 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">{report.id}</span>
                        <StatusBadge status={report.status} />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">{report.title}</h3>
                      <p className="mb-3 text-xs text-muted-foreground">{report.address}</p>

                      {/* Mini timeline */}
                      <div className="flex items-center gap-1">
                        {getTimelineSteps(report.status).map((step, si) => (
                          <div key={step.status} className="flex items-center gap-1">
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                                step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {si + 1}
                            </div>
                            {si < 3 && (
                              <div className={`h-0.5 w-4 ${step.completed ? "bg-primary" : "bg-muted"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Notifikasi</h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 rounded-lg border bg-card p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{n.text}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
