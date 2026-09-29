# Segarin - Prototipe E-Commerce React (Modul 2)

Struktur mengikuti modul dan proyek dosen:

    src/
    ├─ main.jsx, App.jsx, index.css
    ├─ utils/        CartContext, ProductContext, data.js (data dummy)
    ├─ components/   Navbar, Sidebar, ProductCard, ProductImage, Pagination, Toast
    ├─ layouts/      MainLayout, AdminLayout
    └─ pages/
       ├─ frontpages/  Dashboard, ProductDetail, Cart, Checkout
       └─ adminpages/  AdminDashboard, AboutPage, ProductForm, ProductEdit

Konsep: Component, Props (`ProductCard p={...}`, `Sidebar`, `Pagination`), Conditional Rendering,
useState, useContext (`useCart`, `useProducts`).

## Menjalankan
    npm install
    npm run dev
Halaman depan: `/`  |  Admin: `/admin/dashboard`

## Foto produk
Taruh di `public/images/` (lihat DAFTAR-FOTO.txt). Jika belum ada, emoji tampil sebagai cadangan.

## Deploy
- **Vercel**: import repo, Deploy (vercel.json sudah menangani refresh halaman).
- **GitHub Pages**: ganti `NAMA-REPO` di script `deploy` pada package.json, lalu `npm run deploy`
  (build otomatis menyalin index.html ke 404.html agar refresh halaman tidak error).
