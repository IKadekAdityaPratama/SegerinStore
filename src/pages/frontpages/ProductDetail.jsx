import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductImage from "../../components/ProductImage";
import { useProducts } from "../../utils/ProductContext";
import { useCart } from "../../utils/CartContext";
import { rupiah, diskon } from "../../utils/data";

export default function ProductDetail() {
  // Mengambil slug/ID produk dari URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const p = products.find((x) => x.slug === id || String(x.id) === id);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  // State untuk rating dan review
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!p) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <p className="font-bold">Produk tidak ditemukan</p>
        <Link to="/" className="text-brand underline">Kembali ke beranda</Link>
      </div>
    );
  }

  const habis = p.stock === 0;
  const persen = diskon(p);
  const handleAdd = () => { addToCart(p, qty); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  const handleBuy = () => { addToCart(p, qty); navigate("/checkout"); };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    setReviews([...reviews, { id: Date.now(), rating, review }]);
    setRating(0); setReview("");
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[minmax(0,360px)_1fr_300px] gap-6 items-start">
        <div className={`rounded-3xl aspect-square overflow-hidden ${habis ? "grayscale opacity-60" : ""}`}>
          <ProductImage product={p} emojiSize="text-[9rem]" />
        </div>

        <div className="bg-white rounded-3xl p-6">
          <Link to="/" className="text-sm text-brand font-semibold">← Kembali</Link>
          <h1 className="text-2xl font-extrabold mt-2 leading-snug">{p.name}</h1>
          <p className="text-sm text-slate-500 mt-1"><span className="text-amber-500">★</span> {p.rating} · {p.sold.toLocaleString("id-ID")} terjual · {p.category_name}</p>
          <div className="mt-4 flex items-baseline gap-3 flex-wrap">
            <p className="text-3xl font-extrabold">{rupiah(p.price)}</p>
            {persen > 0 && (<>
              <span className="bg-sun text-xs font-bold rounded-full px-2 py-0.5">-{persen}%</span>
              <span className="text-slate-400 line-through">{rupiah(p.oldPrice)}</span>
            </>)}
          </div>
          <h2 className="font-bold mt-6">Deskripsi</h2>
          <p className="text-slate-600 mt-1 max-w-prose">{p.desc}</p>
          <p className="mt-4 text-sm text-slate-500">Dijual oleh <b className="text-ink">{p.store}</b></p>
        </div>

        <aside className="bg-white rounded-3xl p-5 lg:sticky lg:top-28 space-y-3">
          <h2 className="font-bold">Atur jumlah</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 text-lg" aria-label="Kurangi">−</button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(p.stock, q + 1))} disabled={habis} className="w-9 h-9 text-lg" aria-label="Tambah">+</button>
            </div>
            <p className="text-sm text-slate-500">{habis ? "Stok habis" : `Stok ${p.stock}`}</p>
          </div>
          <p className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><b>{rupiah(p.price * qty)}</b></p>
          <button onClick={handleAdd} disabled={habis} className="w-full rounded-full bg-brand text-white font-bold py-2.5 hover:bg-brand-dark disabled:bg-slate-200 disabled:text-slate-400">
            {added ? "✓ Masuk keranjang" : "+ Keranjang"}
          </button>
          <button onClick={handleBuy} disabled={habis} className="w-full rounded-full border border-brand text-brand font-bold py-2.5 hover:bg-brand-soft disabled:border-slate-200 disabled:text-slate-400">Beli langsung</button>
        </aside>
      </div>

      {/* Ulasan pembeli */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white rounded-3xl p-6">
          <h2 className="text-lg font-extrabold mb-3">Ulasan Pembeli</h2>
          {reviews.length === 0 ? (
            <p className="text-slate-500">Belum ada ulasan.</p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="bg-slate-50 rounded-2xl p-4">
                  <p aria-label={`${r.rating} bintang`}>
                    <span className="text-amber-500">{"★".repeat(r.rating)}</span><span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
                  </p>
                  <p className="text-slate-700 mt-1">{r.review}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 space-y-3">
          <h2 className="text-lg font-extrabold">Tulis Ulasan</h2>
          <div className="flex gap-1" role="group" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((s) => (
              <button type="button" key={s} onClick={() => setRating(s)} aria-label={`${s} bintang`}
                className={`text-3xl ${s <= rating ? "text-amber-500" : "text-slate-300"}`}>★</button>
            ))}
          </div>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} rows="3" placeholder="Tulis pengalaman Anda..."
            className="w-full border border-slate-200 focus:border-brand rounded-xl p-3" />
          <button className="rounded-full bg-brand text-white font-bold px-6 py-2 hover:bg-brand-dark">Kirim</button>
        </form>
      </div>
    </div>
  );
}
