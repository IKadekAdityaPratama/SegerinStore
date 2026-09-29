import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar (berisi pencarian) */}
      <Navbar />
      {/* Main Section: konten halaman tampil lewat Outlet */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6"><Outlet /></main>
      {/* Footer */}
      <footer className="bg-brand-dark text-white/90 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
          <div><p className="text-xl font-extrabold text-white">segarin</p><p className="mt-1">Belanja kebutuhan harian dengan cepat dan hemat.</p></div>
          <div><p className="font-semibold text-white">Bantuan</p><p>Cara pemesanan</p><p>Pengiriman</p><p>Pengembalian</p></div>
          <div><p className="font-semibold text-white">Tentang</p><p>© 2025 E-Commerce Simple App</p><p>Version 1.0</p></div>
        </div>
      </footer>
    </div>
  );
}
