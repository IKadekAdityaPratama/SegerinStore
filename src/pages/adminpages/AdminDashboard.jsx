import { useState } from "react";
import { Link } from "react-router-dom";
import ProductImage from "../../components/ProductImage";
import Pagination from "../../components/Pagination";
import { useProducts } from "../../utils/ProductContext";
import { rupiah } from "../../utils/data";

const PER_PAGE = 5;

export default function AdminDashboard() {
  const { products, deleteProduct } = useProducts(); // useContext
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const handleDelete = (p) => {
    if (window.confirm(`Apakah kamu yakin ingin menghapus "${p.name}"?`)) deleteProduct(p.id);
  };

  const filtered = products.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm">
      <h1 className="text-xl font-bold mb-4">Manajemen Produk</h1>
      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
        <input value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} placeholder="Cari produk..."
          className="border border-slate-200 focus:border-brand rounded-lg px-3 py-2 sm:w-72" />
        <Link to="/admin/add-product" className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark text-center">+ Tambah Produk</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr><th className="p-2">#</th><th className="p-2">Foto</th><th className="p-2">Nama</th><th className="p-2">Harga</th><th className="p-2">Stok</th><th className="p-2">Aksi</th></tr>
          </thead>
          <tbody>
            {/* Conditional rendering: data kosong */}
            {rows.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-slate-500">Produk tidak ditemukan.</td></tr>}
            {rows.map((p, i) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="p-2">{(current - 1) * PER_PAGE + i + 1}</td>
                <td className="p-2"><div className="w-14 h-14 rounded-lg overflow-hidden"><ProductImage product={p} emojiSize="text-2xl" /></div></td>
                <td className="p-2">{p.name}<br /><small className="text-slate-500">#{p.category_name}</small></td>
                <td className="p-2">{rupiah(p.price)}</td>
                <td className="p-2">{p.stock === 0 ? <span className="text-red-600">Habis</span> : p.stock}</td>
                <td className="p-2 space-x-3 whitespace-nowrap">
                  <Link to={`/admin/edit-product/${p.id}`} className="text-brand-dark hover:underline">Edit</Link>
                  <button onClick={() => handleDelete(p)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={current} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
