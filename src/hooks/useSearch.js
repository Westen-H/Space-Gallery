// Importatciones
import { useState } from "react";
import usePexels from "./usePexels";

// Crear hook personalizado(custon), puente entre la interfaz de usuario y el fetch de usePExel
const useSearch = () => {
  // <<>><======><<>> Estados de búsqueda <<>><======><<>>
  // crear estados: consulta actual y pagina
  const [currentQuery, setCurrentQuery] = useState(""); // empieza vacia
  const [page, setPage] = useState(1); // pagina de inicio

  // Desestructurar hook del fetch , usePexels(), para consumir la conexión con la api
  const { images, totalPages, loading, error, getImages } = usePexels();

  // función logica del search al presionar el boton de buscar, recive la consulta y el numero de pagina
  const search = (newQuery, pageNumber) => {
    // No hacer nada si no hay consulta
    if (!newQuery) return;
    // si hay datos: verificar que la página sea valida, si no lo es no hace nada
    if (totalPages > 0 && (pageNumber < 1 || pageNumber > totalPages)) return;

    setCurrentQuery(newQuery); // actualizar la categoría buscada
    setPage(pageNumber); // actualizar la pagina actual
    getImages(newQuery, pageNumber); // llamar la "api" con la consulta y la pagina
  };

  // devolver un objeto con todo lo que necesita el componente para funcionar
  return {
    images,
    page,
    totalPages,
    loading,
    error,
    currentQuery,
    search,
  };
};
export default useSearch;
