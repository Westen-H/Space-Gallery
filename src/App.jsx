// importanciones  
import HeaderPage from './pages/Header' 
import FooterPage from './pages/Footer'
import './App.css'

import usePexels from './hooks/usePexels';
import ImagesForm from './components/Form';
import Pagination from './components/Pagination';
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

      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => handleSearch(currentQuery, p)} />

      <div className='footer-container'>
        <FooterPage/>
      </div>

    </>
  );
}

export default App