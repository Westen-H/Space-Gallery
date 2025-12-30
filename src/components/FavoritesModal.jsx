// Crear componente para el emergente que contedrá las fotos de favoritos
const FavoritesModal = ({ favorites, onClose, onToggleFavorite, isFavorite }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="modal-close" onClick={onClose}>✖</button>

        <h2>❤️ Tus favoritos</h2>

        {favorites.length === 0 && (
          <p>No tienes imágenes en favoritos todavía.</p>
        )}

        <div className="gallery-container">
          {favorites.map((img) => (
            <article key={img.id} className="image-card">
              <div className="image-wrapper">
                <img src={img.src.medium} alt={img.alt} />

                <div className="image-overlay">
                  <button
                    className="favorite-btn"
                    onClick={() => onToggleFavorite(img)}
                  >
                    {isFavorite(img.id) ? "❤️" : "🤍"}
                  </button>

                  <a href={img.url} target="_blank" rel="noreferrer" className="btn-pexel">
                    Ver en Pexels
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FavoritesModal;