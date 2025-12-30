import { useState } from "react";

// Crear custon hook para el fetch (petición a la api)
const usePexels = () => {
  // <<>><======><<>> Estados <<>><======><<>>
  const [ loading, setLoading ] = useState(false); // estado de carga: indicar si la petición esta en curso
  const [ error, setError ] = useState(null); // estado de error

  // cantidad de fotos por página
  const PER_PAGE = 8;

  // función de llamada al fetch
  const getImages = async (query, page = 1) => {
    try {
      // Activar loading antes de la petición y Limpiar error
      setLoading(true);
      setError(null);

      //construir la url
      const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${PER_PAGE}`;

      // variavle para almacenar la respuesta
      const response = await fetch(url, {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      // convertir/traducir la respuesta a "json" para obtener los datos y guardarlos en una variable "data"
      const data = await response.json();

      // devolver un objeto de los datos 
      return {
        photos: data.photos ||  [],
        totalPages: Math.ceil(data.total_result / PER_PAGE), // Calcuar total de pagina por resultados
      };

    } catch (err) {
      console.error(err);
      setError("Error cargando imágenes. Inténtalo de nuevo.");
      return { photos: [], totalPages: 0 }
      
    } finally {
      setLoading(false); // Desactivar loading siempre
    }
  };

  return { loading, error, getImages };
};

export default usePexels;

