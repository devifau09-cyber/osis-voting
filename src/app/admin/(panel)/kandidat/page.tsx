"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Candidate {
  id: string;
  orderNumber: string;
  chairmanName: string;
  viceChairmanName: string;
  vision: string;
  missions: string[];
  createdAt: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "c1",
    orderNumber: "01",
    chairmanName: "Budi Santoso",
    viceChairmanName: "Siti Aminah",
    vision: "Mewujudkan OSIS yang inovatif dan berbasis teknologi",
    missions: [
      "Mengoptimalkan teknologi digital",
      "Menyelenggarakan Teaching Factory",
      "Program ekologi interaktif",
    ],
    createdAt: "2026-06-01",
  },
  {
    id: "c2",
    orderNumber: "02",
    chairmanName: "Agus Wijaya",
    viceChairmanName: "Dian Kusuma",
    vision: "OSIS sebagai mitra strategis sekolah",
    missions: [
      "Meningkatkan kedisiplinan",
      "Mengaktifkan mading digital",
    ],
    createdAt: "2026-06-01",
  },
];

export default function DataKandidatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCandidates = mockCandidates.filter((c) =>
    `${c.chairmanName} ${c.viceChairmanName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Data Pasangan Calon
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data kandidat pemilihan OSIS.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20">
              <Plus className="w-5 h-5" />
              <span>Tambah Paslon</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pasangan Calon Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Nama Ketua
                  </label>
                  <input
                    placeholder="Nama lengkap ketua"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Nama Wakil Ketua
                  </label>
                  <input
                    placeholder="Nama lengkap wakil"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Visi
                </label>
                <textarea
                  placeholder="Tuliskan visi..."
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Misi (pisahkan dengan enter)
                </label>
                <textarea
                  placeholder="Tuliskan misi..."
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Cari nama kandidat..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">No. Urut</th>
                <th className="px-6 py-4">Ketua</th>
                <th className="px-6 py-4">Wakil Ketua</th>
                <th className="px-6 py-4">Visi</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg font-bold text-sm">
                      {item.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {item.chairmanName}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {item.viceChairmanName}
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                    {item.vision}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Lihat Detail">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}