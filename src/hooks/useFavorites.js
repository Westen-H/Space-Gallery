// importaciones
import { useState, useEffect } from "react";

// Crear el hook
const useFavorites = () => {
  // crear estado para favoritos: array vacio / Cargar favoritos desde localStorage al iniciar
const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
});

  // Guardar favorito cuando cambien
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // función para añadir favorito, sino esta
  const addFavorite = (image) => {
    // obtener el estado previo
    setFavorites((estadoPrevio) => {
      // si el "id" ya existe en la lista no hacer nada
      if (estadoPrevio.some((fav) => fav.id === image.id)) {
        return estadoPrevio;
      }
      // si la imagen es nueva, crear nuevo array actualizado, con la imagen
      return [...estadoPrevio, image];
    });
  };

  // funcion para eliminar imagen de favorito
  const removeFavorite = (imageId) => {
    // setear las fotos con las que no coincida fav.id, así dejarlo fuera (eliminando fav.id)
    setFavorites((prev) => prev.filter((fav) => fav.id !== imageId));
  };

  // funcion de utilidad para saver si una imagen es favorita o no
  const isFavorite = (imageId) => {
    // saber si existe en favorito con "some"
    return favorites.some((fav) => fav.id === imageId); // true o false
  };

  // función alternar favorito para el boton favorito
  const toggleFavorite = (image) => {
    if (isFavorite(image.id)) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  };

  // devolver las utilides para que se puedan usar
  return {
    favorites, // Array con todas las fotos guardadas
    addFavorite, // Función para guardar una foto
    removeFavorite, // Función para eliminar una foto
    isFavorite, // Función para saber si una foto ya es favorita
    toggleFavorite, // Función alternar favorito
  };
};

export default useFavorites;
