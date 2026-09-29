import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import { rupiah, diskon } from "../utils/data";

// Props: p (objek produk), onAdd (fungsi tambah ke keranjang dari parent)
export default function ProductCard({ p, onAdd }) {
  const habis = p.stock === 0;
  const persen = diskon(p);
  return (
    <article className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${p.slug}`} className="block relative">
        <div className={`aspect-square overflow-hidden ${habis ? "grayscale opacity-60" : ""}`}>
          <ProductImage product={p} />
        </div>
        {/* Conditional rendering: badge diskon / stok habis */}
        {persen > 0 && !habis && (
          <span className="absolute top-2 left-2 bg-sun text-ink text-xs font-bold rounded-full px-2 py-0.5">-{persen}%</span>
        )}
        {habis && <span className="absolute inset-0 grid place-items-center text-sm font-bold">Stok habis</span>}
      </Link>
      <div className="p-3 flex flex-col flex-1 gap-1">
        <Link to={`/product/${p.slug}`} className="text-sm font-medium leading-snug line-clamp-2 hover:text-brand-dark">{p.name}</Link>
        <p className="font-bold text-base">{rupiah(p.price)}</p>
        {p.oldPrice && <p className="text-xs text-slate-400 line-through -mt-1">{rupiah(p.oldPrice)}</p>}
        <p className="text-xs text-slate-500">{p.store}</p>
        <p className="text-xs text-slate-500"><span className="text-amber-500">★</span> {p.rating} · {p.sold.toLocaleString("id-ID")} terjual</p>
        {!habis && p.stock <= 5 && <p className="text-xs text-red-600 font-medium">Sisa {p.stock}</p>}
        <button onClick={() => onAdd(p)} disabled={habis}
          className="mt-auto rounded-full border border-brand text-brand font-semibold text-sm py-1.5 hover:bg-brand hover:text-white disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent disabled:cursor-not-allowed">
          {habis ? "Tidak tersedia" : "+ Keranjang"}
        </button>
      </div>
    </article>
  );
}
