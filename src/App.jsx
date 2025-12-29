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
  const [ title, setTitle ] = useState("Space Gallery");

  // Desestructurar el custon Hook useSearch para usarlo
  const { images, page, totalPages, currentQuery, search } = useSearch();

  // a
  return (
    <>
      <div className='header-container'>
        <HeaderPage/>
      </div>

      <div>
        <h1>{title}</h1>
        <ImagesForm
        onSearch={(query) => search(query, 1)}
        onTitleChange={setTitle}
        />
      </div>

      <Gallery images={images} />

      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => search(currentQuery, p)} />

      <div className='footer-container'>
        <FooterPage/>
      </div>

    </>
  );
}

export default App