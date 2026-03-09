import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReportMap from "@/components/ReportMap";
import StatusBadge from "@/components/StatusBadge";
import { mockReports, categoryLabels, categoryColors, type ReportCategory } from "@/data/mockData";

const categories: (ReportCategory | "all")[] = ["all", ...Object.keys(categoryLabels) as ReportCategory[]];

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? mockReports
    : mockReports.filter((r) => r.category === activeCategory);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Filters */}
      <div className="border-b bg-card px-4 py-3">
        <div className="container mx-auto flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="text-xs"
            >
              {cat === "all" ? "Semua" : categoryLabels[cat]}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Map */}
        <div className="flex-1">
          <ReportMap reports={filtered} height="100%" fitBounds />
        </div>

        {/* Sidebar list */}
        <div className="h-64 overflow-y-auto border-t bg-card lg:h-auto lg:w-80 lg:border-l lg:border-t-0">
          <div className="p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {filtered.length} Laporan Ditemukan
            </h3>
            <div className="space-y-3">
              {filtered.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <img
                    src={report.photo}
                    alt={report.title}
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{report.title}</p>
                    <p className="text-xs text-muted-foreground">{report.address}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: categoryColors[report.category] }}
                      />
                      <StatusBadge status={report.status} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
