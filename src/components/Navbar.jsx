import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" />
  </svg>
);

export default function Navbar() {
  // Mengambil totalQty dari context useCart
  const { totalQty } = useCart();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Pencarian disimpan di URL (?q=) agar bisa dibaca halaman Dashboard
  const onSearch = (e) => navigate(`/?q=${encodeURIComponent(e.target.value)}`, { replace: true });

  return (
    <header className="bg-white sticky top-0 z-20 shadow-sm">
      <div className="bg-brand-soft text-brand-dark text-xs text-center py-1.5 font-medium">
        Gratis ongkir untuk pembelian pertama. Pakai kode SEGAR10
      </div>
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link to="/" className="text-2xl font-extrabold text-brand tracking-tight">segarin</Link>
        <div className="order-3 md:order-none w-full md:w-auto md:flex-1">
          <label className="sr-only" htmlFor="cari">Cari produk</label>
          <input id="cari" value={params.get("q") ?? ""} onChange={onSearch} placeholder="Cari produk, toko, atau kategori"
            className="w-full rounded-full bg-slate-100 border border-transparent focus:border-brand focus:bg-white px-5 py-2.5 text-sm" />
        </div>
        <nav className="ml-auto md:ml-0 flex items-center gap-2 text-sm font-semibold">
          <NavLink to="/admin/dashboard" className="px-3 py-2 rounded-full hover:bg-brand-soft">Admin</NavLink>
          <NavLink to="/cart" className="relative p-2 rounded-full hover:bg-brand-soft" aria-label="Keranjang">
            <CartIcon />
            {/* Menampilkan totalQty jika ada item di keranjang */}
            {totalQty > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-sun text-ink text-[11px] rounded-full min-w-5 h-5 px-1 grid place-items-center font-bold">{totalQty}</span>
            )}
          </NavLink>
          <NavLink to="/checkout" className="bg-brand text-white rounded-full px-5 py-2 hover:bg-brand-dark">Checkout</NavLink>
        </nav>
      </div>
    </header>
  );
}
