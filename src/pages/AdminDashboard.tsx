import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Search, BarChart3, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import ReportMap from "@/components/ReportMap";
import {
  mockReports,
  categoryLabels,
  categoryColors,
  statusLabels,
  type ReportCategory,
  type ReportStatus,
} from "@/data/mockData";

const departments = ["Dinas PU", "Dinas Kebersihan", "Dinas Lingkungan Hidup", "Satpol PP"];

export default function AdminDashboard() {
  const [categoryFilter, setCategoryFilter] = useState<ReportCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = mockReports.filter((r) => {
    if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Analytics
  const categoryCounts = Object.keys(categoryLabels).map((key) => ({
    category: key as ReportCategory,
    count: mockReports.filter((r) => r.category === key).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor dan kelola semua laporan warga</p>
        </div>

        {/* Quick stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Laporan", value: mockReports.length, icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
            { label: "Laporan Baru", value: mockReports.filter((r) => r.status === "submitted").length, icon: TrendingUp, color: "text-destructive", bg: "bg-destructive/10" },
            { label: "Lokasi Terlaporkan", value: 6, icon: MapPin, color: "text-info", bg: "bg-info/10" },
            { label: "Pelapor Aktif", value: 8, icon: Users, color: "text-success", bg: "bg-success/10" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Peta Laporan</h2>
              <ReportMap reports={filtered} height="300px" fitBounds />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari laporan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as any)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {(Object.keys(categoryLabels) as ReportCategory[]).map((key) => (
                    <SelectItem key={key} value={key}>{categoryLabels[key]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {(Object.keys(statusLabels) as ReportStatus[]).map((key) => (
                    <SelectItem key={key} value={key}>{statusLabels[key]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reports table */}
            <div className="overflow-hidden rounded-xl border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Laporan</th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground md:table-cell">Kategori</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground lg:table-cell">Ditugaskan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y bg-card">
                  {filtered.map((report) => (
                    <tr key={report.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{report.id}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{report.title}</p>
                        <p className="text-xs text-muted-foreground">{report.address}</p>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ backgroundColor: categoryColors[report.category] + "22", color: categoryColors[report.category] }}
                        >
                          {categoryLabels[report.category]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                        {report.assignedTo || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Select defaultValue={report.status}>
                          <SelectTrigger className="h-8 w-28 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(statusLabels) as ReportStatus[]).map((key) => (
                              <SelectItem key={key} value={key}>{statusLabels[key]}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar analytics */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">Analitik Cepat</h2>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Masalah Terbanyak</h3>
                <div className="space-y-3">
                  {categoryCounts.map((item) => (
                    <div key={item.category} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: categoryColors[item.category] }}
                      />
                      <span className="flex-1 text-sm text-foreground">{categoryLabels[item.category]}</span>
                      <span className="text-sm font-semibold text-foreground">{item.count}</span>
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(item.count / mockReports.length) * 100}%`,
                            backgroundColor: categoryColors[item.category],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Status Laporan</h3>
              <div className="space-y-2">
                {(Object.keys(statusLabels) as ReportStatus[]).map((status) => {
                  const count = mockReports.filter((r) => r.status === status).length;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <StatusBadge status={status} />
                      <span className="text-sm font-semibold text-foreground">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Area Terbanyak</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground">Jl. Jendral Sudirman</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Pasar Pagi</span>
                  <span className="font-semibold text-foreground">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Desa Kebondalem</span>
                  <span className="font-semibold text-foreground">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
