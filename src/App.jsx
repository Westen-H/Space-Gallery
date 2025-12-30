// <<>><======><<>> Importaciones <<>><======><<>>
import { useState } from "react";
import "./App.css";

import HeaderPage from "./pages/Header";
import FooterPage from "./pages/Footer";

import ImagesForm from "./components/Form";
import Pagination from "./components/Pagination";
import Gallery from './components/Gallery';
import FavoritesModal from "./components/FavoritesModal";


import useSearchBlocks from "./hooks/useSearchBlocks";
import useFavoritesModal from "./hooks/useFavoritesModal";


function App() {
  // <<>><======><<>> Estados <<>><======><<>>
  const [title, setTitle] = useState("Space Gallery"); // estado para eltitulo adaptativo

  // Desestructurar el custon Hook useSearch para usarlo
  const { blocks, addSearchBlock, updatePage, error, loading } =
    useSearchBlocks();
  const { isOpen: isFavoritesOpen, open: openFavorites, close: closeFavorites, favorites, toggleFavorite, isFavorite } = useFavoritesModal();

  // rendeizar la app
  return (
    <>
      <div className="header-container">
        <HeaderPage onOpenFavorites={openFavorites}/>
      </div>

      <main>
        <div>
          <h1>{title}</h1>

          <ImagesForm onSearch={addSearchBlock} onTitleChange={setTitle} />
        </div>

        {/* Estado vacío */}
        {blocks.length === 0 && (
          <p className="empty-state">
            Escribe una categoría y descubre imágenes increíbles 📸
          </p>
        )}

        {/* Loading / Error global */}
        {loading && <p style={{ marginTop: "30px" }}>Cargando imágenes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* BLOQUES */}
        {blocks.map((block) => (
          <section key={block.id} style={{ marginBottom: "3rem" }}>
            <h2 style={{ textTransform: "capitalize" }}>
              Resultados para: {block.query}
            </h2>

            <Gallery images={block.images} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />


            <Pagination
              page={block.page}
              totalPages={block.totalPages}
              onPageChange={(p) => updatePage(block.id, p)}
            />
          </section>
        ))}
      </main>
      {isFavoritesOpen && ( <FavoritesModal favorites={favorites} onClose={closeFavorites} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} /> )}

      <div className="footer-container">
        <FooterPage />
      </div>
    </>
  );
}

export default App;
