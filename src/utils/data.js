// Data dummy sementara. Field: id, name, slug, price, stock, category, category_name, rating, img
// (+ tambahan tampilan: oldPrice, store, sold, emoji, bg, desc)
export const categories = [
  { id: 1, name: "Fashion" },
  { id: 2, name: "Elektronik" },
  { id: 3, name: "Kecantikan" },
  { id: 4, name: "Rumah" },
];
const P = (id, name, slug, price, oldPrice, stock, category, rating, sold, store, emoji, bg, img, desc) => ({
  id, name, slug, price, oldPrice, stock, category,
  category_name: categories.find((c) => c.id === category).name,
  rating, sold, store, emoji, bg, img: `images/${img}.jpg`, desc,
});
export const products = [
  P(1, "Kaos Oversize Katun Combed Kuning", "kaos-oversize-kuning", 68000, 85000, 12, 1, 4.8, 1240, "Kaosan Denpasar", "👕", "bg-yellow-100", "kaos", "Kaos oversize katun combed 30s. Adem, tidak gerah, dan nyaman dipakai seharian."),
  P(2, "Celana Chino Slim Fit Hitam", "celana-chino-hitam", 175000, 220000, 5, 1, 4.7, 530, "Kaosan Denpasar", "👖", "bg-slate-200", "celana", "Potongan slim fit dengan bahan yang tidak mudah kusut. Cocok untuk kuliah maupun kerja."),
  P(3, "Sneakers Putih Klasik", "sneakers-putih", 350000, null, 0, 1, 4.9, 2210, "Sol Sepatu", "👟", "bg-sky-100", "sneakers", "Sneakers putih polos yang cocok untuk semua gaya. Sol empuk anti selip."),
  P(4, "Headphone Bluetooth 5.3 Noise Cancelling", "headphone-bluetooth", 399000, 550000, 8, 2, 4.6, 890, "Gadget Bali", "🎧", "bg-indigo-100", "headphone", "Baterai tahan 30 jam, mic jernih untuk meeting, dan bisa dipakai sambil mengisi daya."),
  P(5, "Kamera Mirrorless 24MP Kit Lensa", "kamera-mirrorless", 6500000, 7200000, 2, 2, 4.9, 47, "Gadget Bali", "📷", "bg-zinc-200", "kamera", "Sensor 24MP, video 4K, cocok untuk pemula sampai kreator konten."),
  P(6, "Serum Niacinamide 10% Wajah Cerah", "serum-niacinamide", 89000, 120000, 20, 3, 4.8, 5320, "Glow Lab", "🧴", "bg-pink-100", "serum", "Membantu menyamarkan noda dan membuat kulit tampak lebih cerah. Tekstur ringan."),
  P(7, "Botol Minum Stainless 750ml", "botol-minum-stainless", 79000, 99000, 30, 4, 4.7, 3100, "Rumah Nyaman", "🥤", "bg-teal-100", "botol", "Menjaga minuman dingin 12 jam dan panas 8 jam. Bebas BPA, tutup anti bocor."),
  P(8, "Lampu Meja LED Dimmable", "lampu-meja-led", 129000, null, 6, 4, 4.5, 410, "Rumah Nyaman", "💡", "bg-amber-100", "lampu", "Tiga mode cahaya, hemat energi, dan lengan fleksibel untuk belajar atau kerja."),
];
export const rupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");
export const diskon = (p) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);
