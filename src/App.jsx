// <<>><======><<>> Importaciones <<>><======><<>>
import { useState } from 'react';
import './App.css'

import HeaderPage from './pages/Header' 
import FooterPage from './pages/Footer'

import ImagesForm from './components/Form';
import Pagination from './components/Pagination';
// import Gallery from './components/Gallery';

import useSearch from './hooks/useSearch';
import Gallery from './components/Gallery';

function App() {
  // <<>><======><<>> Estado de <<>><======><<>>
  const [ title, setTitle ] = useState("Space Gallery"); // estado para eltitulo adaptativo

  // Desestructurar el custon Hook useSearch para usarlo
  const { images, page, totalPages, currentQuery, loading, error, search } = useSearch();

  // a
  return (
    <>
      <div className='header-container'>
        <HeaderPage/>
      </div>
      <main>
        <div>
          <h1>{title}</h1>
          <ImagesForm
          onSearch={(query) => search(query, 1)}
          onTitleChange={setTitle}
          />
        </div>
                {/* Estado vacío */}
        {images.length === 0 && (
          <p className="empty-state">
            Escribe una categoría y descubre imágenes increíbles 📸
          </p>
        )}
        {/* loading mientras se espera cargar la imagen */}
        {loading && error && (
          <p style={{ marginTop: "30px", color: "red"}}>Cargando imágenes...</p>
        )}

        {!loading && !error && (<Gallery images={images} />)}
        
        <Pagination page={page} totalPages={totalPages} onPageChange={(p) => search(currentQuery, p)} />
      </main>
      <div className='footer-container'>
        <FooterPage/>
      </div>

    </>
  );
}

export default App