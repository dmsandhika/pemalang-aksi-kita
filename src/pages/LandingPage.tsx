import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, MapPin, CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReportMap from "@/components/ReportMap";
import StatusBadge from "@/components/StatusBadge";
import { mockReports, categoryLabels, categoryColors } from "@/data/mockData";

const stats = [
  {
    label: "Laporan Hari Ini",
    value: mockReports.filter((r) => r.createdAt.startsWith("2026-03-09")).length,
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Dalam Proses",
    value: mockReports.filter((r) => r.status === "progress" || r.status === "review").length,
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Selesai",
    value: mockReports.filter((r) => r.status === "resolved").length,
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Perlu Perhatian",
    value: mockReports.filter((r) => r.status === "submitted").length,
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            <MapPin className="h-4 w-4" />
            Kabupaten Pemalang
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            Laporkan Masalah,
            <br />
            Bangun Pemalang Lebih Baik
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Platform pelaporan cerdas untuk warga Pemalang. Laporkan kerusakan jalan, sampah, pencemaran,
            dan masalah publik lainnya dengan mudah dan cepat.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/report">
              <Button size="lg" variant="secondary" className="gap-2 text-base font-semibold">
                <FileText className="h-5 w-5" />
                Laporkan Masalah
              </Button>
            </Link>
            <Link to="/map">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                <MapPin className="h-5 w-5" />
                Lihat Peta
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto -mt-10 px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card flex items-center gap-4"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map preview */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Laporan Terkini</h2>
            <p className="text-sm text-muted-foreground">Peta laporan warga di Kabupaten Pemalang</p>
          </div>
          <Link to="/map">
            <Button variant="ghost" className="gap-1 text-sm">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ReportMap reports={mockReports} height="400px" />
      </section>

      {/* Recent reports */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Laporan Terbaru</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockReports.slice(0, 6).map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <img src={report.photo} alt={report.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: categoryColors[report.category] + "22", color: categoryColors[report.category] }}
                  >
                    {categoryLabels[report.category]}
                  </span>
                  <StatusBadge status={report.status} />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{report.title}</h3>
                <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{report.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {report.address}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 LaporPemalang — Pemerintah Kabupaten Pemalang
          </p>
        </div>
      </footer>
    </div>
  );
}
