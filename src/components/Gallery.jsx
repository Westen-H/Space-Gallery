// Componente para renderizar en pantalla el arreglo de imagenes que el hook (usePexel) obtiene de la api
const Gallery = ({ images }) => {
  // verificar si el arreglo (objeto recibido) esta vacio, de ser así devolver null para no dibujar nada
  if (!images.length) return null;

  // renderizar el componente
  return (
    <div className="gallery-container">
      {images.map((img) => (
        <article key={img.id} className="image-card"> {/* usar el id que da pexel com key(identificador unico) */}
          <div className="image-wrapper">
            <img src={img.src.medium} alt={img.alt} loading="lazy" />
            <div className="image-overlay">
              <p className="image-description">{img.alt || "sin descripción"}</p>
              <a href={img.url} target="_blank" rel="noreferrer" className="btn-pexel">
                Ver en Pexels
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Gallery;
