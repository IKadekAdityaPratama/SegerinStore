import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../utils/ProductContext";

const empty = { name: "", price: "", stock: "", category: 1, img: "", desc: "" };

// Dipakai untuk Tambah Produk (/admin/add-product) dan Edit Produk (/admin/edit-product/:id)
export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, getCategories } = useProducts();
  const existing = id ? products.find((p) => p.id === Number(id)) : null;

  const [form, setForm] = useState(existing ?? empty);
  const [errors, setErrors] = useState({});

  if (id && !existing) {
    return <div className="bg-white p-6 rounded-2xl">Produk tidak ditemukan. <Link to="/admin/dashboard" className="text-brand underline">Kembali</Link></div>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Nama produk wajib diisi";
    if (!(Number(form.price) > 0)) err.price = "Harga harus lebih dari 0";
    if (!(Number(form.stock) >= 0) || form.stock === "") err.stock = "Stok tidak boleh kosong";
    setErrors(err);
    if (Object.keys(err).length) return;
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (existing) updateProduct(existing.id, data); else addProduct(data);
    navigate("/admin/dashboard");
  };

  const field = "w-full mt-1 rounded-lg border border-slate-200 focus:border-brand px-3 py-2";
  const err = (k) => errors[k] && <span className="text-red-600 text-sm font-normal">{errors[k]}</span>;
  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-sm max-w-xl space-y-4">
      <h1 className="text-xl font-bold">{existing ? "Edit Produk" : "Tambah Produk"}</h1>
      <label className="block text-sm font-semibold">Nama produk<input name="name" value={form.name} onChange={handleChange} className={field} />{err("name")}</label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-semibold">Harga (Rp)<input name="price" type="number" min="0" value={form.price} onChange={handleChange} className={field} />{err("price")}</label>
        <label className="block text-sm font-semibold">Stok<input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={field} />{err("stock")}</label>
      </div>
      <label className="block text-sm font-semibold">Kategori
        <select name="category" value={form.category} onChange={handleChange} className={field}>
          {getCategories().map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold">Foto (path atau URL)
        <input name="img" value={form.img} onChange={handleChange} placeholder="images/kaos.jpg atau https://..." className={field} />
      </label>
      <label className="block text-sm font-semibold">Deskripsi<textarea name="desc" rows="3" value={form.desc} onChange={handleChange} className={field} /></label>
      <div className="flex gap-3">
        <button className="bg-brand text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-dark">Simpan</button>
        <Link to="/admin/dashboard" className="px-6 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">Batal</Link>
      </div>
    </form>
  );
}
