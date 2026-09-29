// Props: message. Tidak dirender jika message kosong.
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink text-white text-sm px-5 py-3 rounded-full shadow-lg z-30">
      ✓ {message}
    </div>
  );
}
