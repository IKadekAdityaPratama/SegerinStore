import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Toast from "../../components/Toast";
import { useProducts } from "../../utils/ProductContext";
import { useCart } from "../../utils/CartContext";

export default function Dashboard() {
  const { products, getCategories } = useProducts(); // data dari context
  const { addToCart } = useCart();
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").toLowerCase();
  // useState: kategori aktif (0 = semua) dan pesan notifikasi
  const [category, setCategory] = useState(0);
  const [toast, setToast] = useState("");

  const handleAdd = (p) => {
    addToCart(p);
    setToast(`${p.name} masuk keranjang`);
    setTimeout(() => setToast(""), 1800);
  };

  const filtered = products.filter(
    (p) => (p.name + p.store).toLowerCase().includes(query) && (category === 0 || p.category === category)
  );
  const chips = [{ id: 0, name: "Semua" }, ...getCategories()];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-brand text-white p-6 md:p-10 relative overflow-hidden">
        <p className="inline-block bg-sun text-ink text-xs font-bold rounded-full px-3 py-1">Promo akhir bulan</p>
        <h1 className="text-3xl md:text-5xl font-extrabold mt-3 max-w-xl leading-tight">Belanja hemat sampai 30%, dikirim hari ini.</h1>
        <p className="mt-2 text-white/90 max-w-md">Pilih dari ribuan produk pilihan dari toko terpercaya.</p>
        <div className="absolute -right-4 -bottom-6 text-[9rem] md:text-[12rem] opacity-90 select-none" aria-hidden="true">🛒</div>
      </section>

      <section aria-label="Kategori" className="flex gap-3 overflow-x-auto pb-1">
        {chips.map((c) => (
          <button key={c.id} onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === c.id ? "bg-brand text-white" : "bg-white hover:bg-brand-soft"}`}>
            {c.name}
          </button>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-extrabold mb-3">{query ? `Hasil untuk "${params.get("q")}"` : "Dashboard Produk"}</h2>
        {/* Conditional rendering: hasil kosong vs daftar produk */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center">
            <p className="text-5xl">🔍</p>
            <p className="font-bold mt-2">Produk tidak ditemukan</p>
            <p className="text-slate-500 text-sm">Coba kata kunci lain atau ganti kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {/* p adalah props untuk mengirim data produk ke ProductCard */}
            {filtered.map((item) => <ProductCard key={item.id} p={item} onAdd={handleAdd} />)}
          </div>
        )}
      </section>
      <Toast message={toast} />
    </div>
  );
}
