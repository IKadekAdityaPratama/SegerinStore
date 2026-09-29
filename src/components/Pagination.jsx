// Props: currentPage, totalPages, onPageChange
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Conditional rendering
  const btn = "px-3 py-1 rounded-md text-sm";
  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className={`${btn} bg-brand text-white disabled:bg-slate-200 disabled:text-slate-400`}>Sebelumnya</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => onPageChange(n)}
          className={`${btn} ${n === currentPage ? "bg-brand-dark text-white" : "bg-slate-100 hover:bg-slate-200"}`}>{n}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className={`${btn} bg-brand text-white disabled:bg-slate-200 disabled:text-slate-400`}>Berikutnya</button>
    </div>
  );
}
