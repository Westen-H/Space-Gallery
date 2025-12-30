import { useState } from "react";

// Crear hook para el fetch
const usePexels = () => {
  // <<>><======><<>> Estados <<>><======><<>>
  // Crear variable de estado que contendra los datos de la peticiónde la "api" con valor inicail de array vacio " [] "
  const [ images, setImages ] = useState([]);
  const [ totalPages, setTotalPages]  = useState(0); // estado del total de paginas
  const [ loading, setLoading ] = useState(false); // estado de carga
  const [ error, setError ] = useState(null); // estado de error

  // cantidad de fotos por página
  const PER_PAGE = 8;

  // función de llamada al fetch
  const getImages = async (query, page = 1) => {
    try {
      // Activar loading antes de la petición
      setLoading(true)
      // Limpiar error
      setError(null);

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

    } catch (err) {
      console.error(err);
      setError( err.message.includes("401") ? "Error de autenticación con la API." : "No se pudieron cargar las imágenes. Inténtalo de nuevo." );
      setImages([]);
      setTotalPages(0);
    } finally {
      setLoading(false); // Desactivar loading siempre
    }
  };

  return { images, totalPages, loading, error, getImages };
};

export default usePexels;
