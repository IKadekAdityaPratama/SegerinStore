import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartContext";
import { rupiah } from "../../utils/data";

const payments = ["Transfer Bank", "E-Wallet", "Bayar di Tempat"];

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", address: "", payment: payments[0] });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Nama penerima wajib diisi";
    if (form.address.trim().length < 10) err.address = "Alamat minimal 10 karakter";
    setErrors(err);
    if (Object.keys(err).length === 0) { setOrderId("SGR-" + Date.now().toString().slice(-6)); clearCart(); }
  };

  // Conditional rendering 1: pesanan berhasil
  if (orderId) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center">
        <p className="text-6xl">🎉</p>
        <h1 className="text-2xl font-extrabold text-brand-dark mt-3">Pesanan berhasil dibuat</h1>
        <p className="mt-2">Nomor pesanan <b>{orderId}</b></p>
        <p className="text-slate-500 text-sm">Terima kasih, {form.name}. Pembayaran lewat {form.payment}.</p>
        <Link to="/" className="inline-block mt-5 bg-brand text-white font-bold rounded-full px-6 py-2.5 hover:bg-brand-dark">Lanjut belanja</Link>
      </div>
    );
  }
  // Conditional rendering 2: keranjang kosong
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center">
        <p className="font-bold">Belum ada produk untuk di-checkout</p>
        <Link to="/" className="text-brand underline">Pilih produk dulu</Link>
      </div>
    );
  }

  const field = "w-full mt-1 rounded-xl border border-slate-200 focus:border-brand px-4 py-2.5";
  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 space-y-4" noValidate>
        <h1 className="text-2xl font-extrabold">Checkout</h1>
        <label className="block text-sm font-semibold">Nama penerima
          <input name="name" value={form.name} onChange={handleChange} className={field} />
          {errors.name && <span className="text-red-600 text-sm font-normal">{errors.name}</span>}
        </label>
        <label className="block text-sm font-semibold">Alamat pengiriman
          <textarea name="address" value={form.address} onChange={handleChange} rows="3" className={field} />
          {errors.address && <span className="text-red-600 text-sm font-normal">{errors.address}</span>}
        </label>
        <fieldset>
          <legend className="text-sm font-semibold">Metode pembayaran</legend>
          <div className="flex flex-wrap gap-2 mt-1">
            {payments.map((pay) => (
              <button type="button" key={pay} onClick={() => setForm({ ...form, payment: pay })}
                className={`rounded-full px-4 py-2 text-sm font-semibold border ${form.payment === pay ? "bg-brand text-white border-brand" : "border-slate-200 hover:bg-brand-soft"}`}>{pay}</button>
            ))}
          </div>
        </fieldset>
        <button className="w-full rounded-full bg-brand text-white font-bold py-3 hover:bg-brand-dark">Buat pesanan</button>
      </form>
      <aside className="bg-white rounded-3xl p-5 lg:sticky lg:top-28">
        <h2 className="font-bold mb-2">Ringkasan pesanan</h2>
        {cart.map((item) => (
          <p key={item.id} className="flex justify-between gap-3 text-sm py-1"><span className="truncate">{item.name} ×{item.qty}</span><span>{rupiah(item.price * item.qty)}</span></p>
        ))}
        <p className="flex justify-between font-extrabold text-lg border-t border-slate-100 mt-3 pt-3"><span>Total</span><span>{rupiah(totalPrice)}</span></p>
      </aside>
    </div>
  );
}
