import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryLabels, categoryIcons, type ReportCategory, PEMALANG_CENTER } from "@/data/mockData";
import ReportMap from "@/components/ReportMap";

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<ReportCategory | "">("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState({ lat: PEMALANG_CENTER[0], lng: PEMALANG_CENTER[1] });
  const [detecting, setDetecting] = useState(false);

  const detectLocation = () => {
    setDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setDetecting(false);
        },
        () => setDetecting(false)
      );
    } else {
      setDetecting(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Laporan Terkirim!</h2>
          <p className="mb-6 text-muted-foreground">
            Terima kasih atas laporan Anda. Tim kami akan segera meninjau dan menindaklanjuti.
          </p>
          <p className="mb-6 rounded-lg bg-muted p-3 font-mono text-sm text-foreground">
            ID Laporan: RPT-{String(Math.floor(Math.random() * 900) + 100)}
          </p>
          <Button onClick={() => setSubmitted(false)}>Buat Laporan Lain</Button>
        </motion.div>
      </div>
    );
  }

  const pinReport = category
    ? [{
        id: "new",
        title: "Lokasi Laporan",
        description: "",
        category: category as ReportCategory,
        status: "submitted" as const,
        lat: location.lat,
        lng: location.lng,
        address: "",
        photo: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: "",
      }]
    : [];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Laporkan Masalah</h1>
        <p className="mb-8 text-muted-foreground">
          Bantu kami memperbaiki Pemalang dengan melaporkan masalah yang Anda temui.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Foto</label>
            <div className="flex items-center gap-4">
              <label className="flex h-32 w-32 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary">
                {photo ? (
                  <img src={photo} alt="Preview" className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <Camera className="h-8 w-8 text-muted-foreground" />
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              <p className="text-xs text-muted-foreground">
                Ambil atau unggah foto masalah yang ingin dilaporkan
              </p>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Kategori</label>
            <Select value={category} onValueChange={(v) => setCategory(v as ReportCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori masalah" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(categoryLabels) as ReportCategory[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {categoryIcons[key]} {categoryLabels[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Deskripsi</label>
            <Textarea
              placeholder="Jelaskan masalah yang Anda temui..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Lokasi</label>
            <div className="mb-3 flex items-center gap-2">
              <Button type="button" variant="outline" onClick={detectLocation} disabled={detecting} className="gap-2">
                <MapPin className="h-4 w-4" />
                {detecting ? "Mendeteksi..." : "Deteksi Lokasi Otomatis"}
              </Button>
              <span className="text-xs text-muted-foreground">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </span>
            </div>
            <ReportMap reports={pinReport} height="250px" showPopups={false} />
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full gap-2 text-base">
            <Send className="h-5 w-5" />
            Kirim Laporan
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
