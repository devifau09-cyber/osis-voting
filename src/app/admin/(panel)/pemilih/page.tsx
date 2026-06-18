"use client";

import { useState } from "react";
import { Search, Download, CheckCircle, XCircle, UserCheck } from "lucide-react";

interface Voter {
  id: string;
  name: string;
  class: string;
  pin: string;
  hasVoted: boolean;
  votedAt?: string;
}

const mockVoters: Voter[] = [
  {
    id: "v1",
    name: "Ahmad Rizki",
    class: "X.PPLG-1",
    pin: "123456",
    hasVoted: true,
    votedAt: "2026-06-18 09:30",
  },
  {
    id: "v2",
    name: "Siti Nurhaliza",
    class: "X.PPLG-1",
    pin: "234567",
    hasVoted: false,
  },
  {
    id: "v3",
    name: "Budi Santoso",
    class: "X.PPLG-2",
    pin: "345678",
    hasVoted: true,
    votedAt: "2026-06-18 10:15",
  },
  {
    id: "v4",
    name: "Dewi Lestari",
    class: "XI.DKV-1",
    pin: "456789",
    hasVoted: false,
  },
];

export default function DaftarPemilihPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVoters = mockVoters.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalVoters = mockVoters.length;
  const votedCount = mockVoters.filter((v) => v.hasVoted).length;
  const notVotedCount = totalVoters - votedCount;
  const percentage = ((votedCount / totalVoters) * 100).toFixed(1);

  return (
    <main className="pt-20 md:pt-8 px-4 md:px-8 pb-24 md:pb-8 w-full grow">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Pemilih
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor status partisipasi pemilih.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] shadow-md shadow-blue-500/20">
          <Download className="w-5 h-5" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500">Total Pemilih</p>
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalVoters}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500">Sudah Memilih</p>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{votedCount}</p>
          <p className="text-xs text-slate-500 mt-1">{percentage}% partisipasi</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500">Belum Memilih</p>
            <XCircle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-600">{notVotedCount}</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-500">Partisipasi</p>
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              placeholder="Cari nama atau kelas..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Kelas</th>
                <th className="px-6 py-4">PIN</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Waktu Memilih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVoters.map((voter) => (
                <tr key={voter.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {voter.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{voter.class}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-xs">
                      {voter.pin}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {voter.hasVoted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Sudah Memilih
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                        <XCircle className="w-3.5 h-3.5" />
                        Belum Memilih
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {voter.votedAt || "-"}
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