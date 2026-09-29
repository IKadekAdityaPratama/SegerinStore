import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

// Export Default menandai bahwa komponen ini dibaca sebagai AdminLayout
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Menggunakan komponen Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (untuk mobile) */}
        <div className="md:hidden bg-white shadow p-4 flex justify-between">
          <h1 className="font-bold text-brand">segarin admin</h1>
          <button className="p-2 border rounded" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">☰</button>
        </div>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
        <footer className="bg-white border-t p-4 text-center text-sm">© 2025 My Admin App — v1.0.0</footer>
      </div>
    </div>
  );
}
