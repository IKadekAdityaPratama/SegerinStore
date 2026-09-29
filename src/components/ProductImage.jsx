import { useState } from "react";

// Props: product, emojiSize (ukuran emoji cadangan), className (opsional)
export default function ProductImage({ product, emojiSize = "text-7xl", className = "" }) {
  const [failed, setFailed] = useState(false); // useState: status gambar gagal dimuat

  // Conditional rendering: foto jika ada dan berhasil dimuat, selain itu emoji cadangan
  return product.img && !failed ? (
    <img
      src={/^https?:/.test(product.img) ? product.img : `${import.meta.env.BASE_URL}${product.img}`}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  ) : (
    <div className={`${product.bg} w-full h-full grid place-items-center ${emojiSize} ${className}`} aria-hidden="true">
      {product.emoji}
    </div>
  );
}
