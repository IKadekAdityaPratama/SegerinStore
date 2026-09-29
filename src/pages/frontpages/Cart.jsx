import { Link } from "react-router-dom";
import ProductImage from "../../components/ProductImage";
import { useCart } from "../../utils/CartContext";
import { rupiah } from "../../utils/data";

export default function Cart() {
  // Mengambil cart, updateQty, removeFromCart dari context useCart
  const { cart, totalQty, totalPrice, updateQty, removeFromCart } = useCart();

  // Conditional rendering: keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="text-xl font-extrabold mt-3">Keranjangmu masih kosong</h1>
        <p className="text-slate-500 text-sm mt-1">Yuk, isi dengan produk yang kamu suka.</p>
        <Link to="/" className="inline-block mt-4 bg-brand text-white font-bold rounded-full px-6 py-2.5 hover:bg-brand-dark">Mulai belanja</Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <section>
        <h1 className="text-2xl font-extrabold mb-3">Keranjang</h1>
        <div className="bg-white rounded-3xl divide-y divide-slate-100">
          {/* Menampilkan item di cart */}
          {cart.map((item) => (
            <div key={item.id} className="p-4 flex gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0"><ProductImage product={item} emojiSize="text-4xl" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500">{item.store}</p>
                <p className="font-medium leading-snug">{item.name}</p>
                <p className="font-bold mt-1">{rupiah(item.price)}</p>
                <div className="flex items-center justify-end gap-4 mt-2">
                  <button onClick={() => removeFromCart(item.id)} className="text-sm text-slate-400 hover:text-red-600">Hapus</button>
                  <div className="flex items-center border border-slate-200 rounded-full">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8" aria-label="Kurangi">−</button>
                    <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8" aria-label="Tambah">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="bg-white rounded-3xl p-5 lg:sticky lg:top-28 space-y-3">
        <h2 className="font-bold">Ringkasan belanja</h2>
        <p className="flex justify-between text-sm"><span className="text-slate-500">Total harga ({totalQty} barang)</span><span>{rupiah(totalPrice)}</span></p>
        <p className="flex justify-between font-extrabold text-lg border-t border-slate-100 pt-3"><span>Total</span><span>{rupiah(totalPrice)}</span></p>
        <Link to="/checkout" className="block text-center bg-brand text-white font-bold rounded-full py-2.5 hover:bg-brand-dark">Beli ({totalQty})</Link>
      </aside>
    </div>
  );
}
