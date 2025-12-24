// Pagination.jsx

// Función auxiliar: calcula qué páginas se muestran
const getVisiblePages = (page, totalPages) => {
  // Si hay 5 o menos páginas, se muestran todas
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Inicio: 1 2 3 4 5
  if (page <= 3) {
    return [1, 2, 3, 4, 5];
  }

  // Final: últimas 5
  if (page >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ];
  }

  // Centro: página actual ±2
  return [page - 2, page - 1, page, page + 1, page + 2];
};

// Componente Pagination
const Pagination = ({ page, totalPages, onPageChange }) => {
  // No renderizar si no hay paginación
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <div className="pagination">

      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} > Anterior </button>

      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={p === page ? "active" : ""} aria-current={p === page ? "page" : undefined} >
          {p}
        </button>
      ))}

      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} > Siguiente </button>
    
    </div>
  );
};

export default Pagination;