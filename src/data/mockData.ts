export type ReportCategory = 
  | "road_damage" 
  | "garbage" 
  | "water_pollution" 
  | "vandalism" 
  | "public_disturbance" 
  | "street_light" 
  | "other";

export type ReportStatus = "submitted" | "review" | "progress" | "resolved";

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  lat: number;
  lng: number;
  address: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  reporter: string;
  assignedTo?: string;
}

export const categoryLabels: Record<ReportCategory, string> = {
  road_damage: "Jalan Rusak",
  garbage: "Sampah",
  water_pollution: "Pencemaran Air",
  vandalism: "Vandalisme",
  public_disturbance: "Gangguan Umum",
  street_light: "Lampu Jalan Rusak",
  other: "Lainnya",
};

export const categoryColors: Record<ReportCategory, string> = {
  road_damage: "#EF4444",
  garbage: "#EAB308",
  water_pollution: "#3B82F6",
  vandalism: "#A855F7",
  public_disturbance: "#F97316",
  street_light: "#6B7280",
  other: "#14B8A6",
};

export const categoryIcons: Record<ReportCategory, string> = {
  road_damage: "🚧",
  garbage: "🗑️",
  water_pollution: "💧",
  vandalism: "🎨",
  public_disturbance: "⚠️",
  street_light: "💡",
  other: "📋",
};

export const statusLabels: Record<ReportStatus, string> = {
  submitted: "Terkirim",
  review: "Ditinjau",
  progress: "Dalam Proses",
  resolved: "Selesai",
};

// Pemalang center coordinates
export const PEMALANG_CENTER: [number, number] = [-6.8885, 109.3831];

export const mockReports: Report[] = [
  {
    id: "RPT-001",
    title: "Jalan berlubang di Jl. Jendral Sudirman",
    description: "Terdapat lubang besar di tengah jalan yang membahayakan pengendara motor. Lubang sudah ada sejak 2 minggu lalu.",
    category: "road_damage",
    status: "progress",
    lat: -6.8895,
    lng: 109.3821,
    address: "Jl. Jendral Sudirman, Pemalang",
    photo: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400",
    createdAt: "2026-03-08T08:30:00Z",
    updatedAt: "2026-03-09T10:00:00Z",
    reporter: "Ahmad Fadli",
    assignedTo: "Dinas PU",
  },
  {
    id: "RPT-002",
    title: "Tumpukan sampah di Pasar Pagi",
    description: "Sampah menumpuk di area belakang Pasar Pagi dan menimbulkan bau yang sangat menyengat.",
    category: "garbage",
    status: "review",
    lat: -6.8870,
    lng: 109.3850,
    address: "Pasar Pagi, Pemalang",
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
    createdAt: "2026-03-09T06:15:00Z",
    updatedAt: "2026-03-09T07:00:00Z",
    reporter: "Siti Rahayu",
  },
  {
    id: "RPT-003",
    title: "Pencemaran sungai di Desa Kebondalem",
    description: "Air sungai berubah warna menjadi hitam dan berbau busuk, diduga limbah pabrik.",
    category: "water_pollution",
    status: "submitted",
    lat: -6.8920,
    lng: 109.3780,
    address: "Desa Kebondalem, Pemalang",
    photo: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
    createdAt: "2026-03-09T09:45:00Z",
    updatedAt: "2026-03-09T09:45:00Z",
    reporter: "Budi Santoso",
  },
  {
    id: "RPT-004",
    title: "Vandalisme di taman kota",
    description: "Bangku taman dan fasilitas umum dicoret-coret dengan cat semprot.",
    category: "vandalism",
    status: "resolved",
    lat: -6.8860,
    lng: 109.3900,
    address: "Taman Kota Pemalang",
    photo: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400",
    createdAt: "2026-03-05T14:20:00Z",
    updatedAt: "2026-03-08T16:30:00Z",
    reporter: "Dewi Lestari",
    assignedTo: "Dinas Kebersihan",
  },
  {
    id: "RPT-005",
    title: "Lampu jalan mati di Jl. Ahmad Yani",
    description: "Sudah 3 hari lampu jalan mati, area menjadi gelap dan rawan kecelakaan.",
    category: "street_light",
    status: "progress",
    lat: -6.8910,
    lng: 109.3860,
    address: "Jl. Ahmad Yani, Pemalang",
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
    createdAt: "2026-03-07T19:00:00Z",
    updatedAt: "2026-03-09T08:00:00Z",
    reporter: "Eko Prasetyo",
    assignedTo: "Dinas PU",
  },
  {
    id: "RPT-006",
    title: "Keributan malam hari di perumahan",
    description: "Suara bising dari karaoke liar setiap malam mengganggu warga sekitar.",
    category: "public_disturbance",
    status: "review",
    lat: -6.8840,
    lng: 109.3810,
    address: "Perumahan Griya Asri, Pemalang",
    photo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    createdAt: "2026-03-08T22:00:00Z",
    updatedAt: "2026-03-09T09:00:00Z",
    reporter: "Nurul Hidayah",
  },
  {
    id: "RPT-007",
    title: "Jembatan retak di Desa Mulyoharjo",
    description: "Retakan besar terlihat pada struktur jembatan penghubung desa.",
    category: "road_damage",
    status: "submitted",
    lat: -6.8950,
    lng: 109.3750,
    address: "Desa Mulyoharjo, Pemalang",
    photo: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
    createdAt: "2026-03-09T07:30:00Z",
    updatedAt: "2026-03-09T07:30:00Z",
    reporter: "Hendra Wijaya",
  },
  {
    id: "RPT-008",
    title: "Sampah di bantaran sungai",
    description: "Tumpukan sampah plastik menghalangi aliran sungai di area permukiman.",
    category: "garbage",
    status: "progress",
    lat: -6.8880,
    lng: 109.3920,
    address: "Bantaran Sungai, Kel. Pelutan",
    photo: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400",
    createdAt: "2026-03-06T10:00:00Z",
    updatedAt: "2026-03-08T14:00:00Z",
    reporter: "Rina Marlina",
    assignedTo: "Dinas Lingkungan Hidup",
  },
];
