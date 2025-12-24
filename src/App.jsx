// importanciones  
import HeaderPage from './pages/Header' 
import FooterPage from './pages/Footer'
import './App.css'

import usePexels from './hooks/usePexels';
import ImagesForm from './components/Form';
import { useState } from 'react';

function App() {
  // <<>><======><<>> Estados <<>><======><<>>
  const [ title, setTitle ] = useState("Space Gallery");
  const [ currentQuery, setCurrentQuery ] = useState(""); // estado para la consulta actual
  const [ page, setPage ] = useState(1); // pagina de inicio

  // desestructurar el hook del fetch
  const { images, totalPages, getImages } = usePexels();

  // funcion manejadora de busqueda
  const handleSearch = (query, pageNumber = 1) => {
    // evitar estados inconsistentes o vacios
    if (!query) return;
    if (totalPages > 0 && (pageNumber < 1 || pageNumber > totalPages)) return;

    setCurrentQuery(query);
    setPage(pageNumber);
    getImages(query, pageNumber);
  };

  // función para la paginanción
  const getVisiblePages = () => {
    const pages = [];
   
    if (totalPages <= 5) {
          for (let i = start; i <= end; i++) {
      pages.push(i);
    }
      return pages;
    }

    // caso iniciañ: 5 páginas
    if (page <= 3) {
      return [1, 2, 3, 4, 5]
    }

      // Caso final: últimas 5 páginas
  if (page >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ];
  }

  // Caso intermedio: centrado
  return [page - 2, page - 1, page, page + 1, page + 2];
  }

  return (
    <>
      <div className='header-container'>
        <HeaderPage/>
      </div>

      <div>
        <h1>{title}</h1>
        <ImagesForm
        onSearch={(query) => handleSearch(query, 1)}
        onTitleChange={setTitle}
        />
      </div>

      <div className="gallery">
        {images.map((img) => (
          <div key={img.id} className='image-card'>
            <img src={img.src.medium} alt={img.alt} />
            <p>{img.alt}</p>
            <a href={img.url} target='_blank' rel='noreferrer'
            >
              Ver en Pexels
            </a>
          </div>
        ))}
      </div>

      {images.length > 0 && totalPages > 1 && (
        <div className='pagination' >
          <button onClick={() => handleSearch(currentQuery, page - 1)} disabled={page === 1} >Anterior</button>

          {getVisiblePages().map((actualPag) => (
            <button key={actualPag} onClick={() => handleSearch(currentQuery, actualPag)} className={actualPag === page ? 'active' : ""} >{actualPag}</button>
          ))}

          <button onClick={() => handleSearch(currentQuery, page + 1)} disabled={page === totalPages} >Siguiente</button>
        </div>
      )}

      <div className='footer-container'>
        <FooterPage/>
      </div>

    </>
  );
}

export default App