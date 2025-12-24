import { useState } from "react";

// Crear hook para el fetch
const usePexels = () => {
  // Crear variable de estado que contendra los datos de la peticiónde la "api" con valor inicail de array vacio " [] "
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // estado del total de paginas

  // cantidad de fotos por pagina
  const PER_PAGE = 10;

  // función de llamada al fetch
  const getImages = async (query, page = 1) => {
    try {
      //construir la url
      const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${PER_PAGE}`;

      // variavle para almacenar la respuesta
      const response = await fetch(url, {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      // transformar la respuesta para obtener los datos
      const data = await response.json();

      // actualizar con las fotos nuevas
      setImages(data.photos || []);
      setTotalPages(Math.ceil(data.total_results / PER_PAGE))

    } catch (error) {
      console.error("Error en la petición", error);
      setImages([]);
      setTotalPages(0);
    }
  };

  return { images, totalPages, getImages };
};

export default usePexels;
