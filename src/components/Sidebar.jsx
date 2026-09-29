import { NavLink } from "react-router-dom";

// Props: sidebarOpen (boolean state dari AdminLayout), setSidebarOpen (fungsi pengubah state)
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const link = ({ isActive }) => `p-2 rounded-lg font-medium ${isActive ? "bg-brand-soft text-brand-dark" : "hover:bg-slate-100"}`;
  const close = () => setSidebarOpen(false);
  return (
    <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-64 bg-white shadow-md`}>
      <div className="p-4 font-extrabold text-xl text-brand">segarin admin</div>
      <nav className="flex flex-col p-4 space-y-1">
        <NavLink to="/admin/dashboard" onClick={close} className={link}>Manajemen Produk</NavLink>
        <NavLink to="/admin/add-product" onClick={close} className={link}>Tambah Produk</NavLink>
        <NavLink to="/admin/about" onClick={close} className={link}>About</NavLink>
        <NavLink to="/" onClick={close} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">← Lihat toko</NavLink>
      </nav>
    </div>
  );
}
