import { useState } from "react";
import usePexels from "./usePexels"

const useSearchBlocks = () => {
    // crear estado para guardar en un arreglo/array los bloques (respuetas, paginación etc..)
    const [ blocks, setBlocks ] = useState([]); // blocks es el array de búsquedas

    // Desestructurar hook del fetch , logica basica de usePexels(), para consumir la conexión con la api
    const { getImages, loading, error } = usePexels();

    // llamar a la api, crear bloque nuevo y añadirlo al arreglo 
    const addSearchBlock = async (query) => {
        // evitar repetir la última búsqueda
        if (blocks.length > 0 && blocks[0].query === query) {
        return;
        }
        // desestructurar getImages para consegir las imagenes y el total de páginas de la llamada a la api
        const { photos, totalPages } = await getImages(query, 1);

        // crear el nuevo bloque
        const newBlock = {
            id: crypto.randomUUID(), // "id" encriptado generado aleatoreamente
            query,
            page: 1,
            images: photos,
            totalPages,
        };

        // actualizar/establecer el nuevo block al final del arreglo del valor anterior
        setBlocks((valorAnterior) => [newBlock, ...valorAnterior ]); // mostrar el nuevo blocke siempre primero
    };

    // Moverse entre paginas: vuelve a llamar a la pagina y solo cambiar ese bloque
    const updatePage = async (blockId, newPage) => {
        // actualizar el número de página 
        setBlocks((valorPrevio) =>
            valorPrevio.map((block) => block.id === blockId? { ...block, page: newPage } : block)
        );

        // buscar en los datos actaules  qué palabra tenía el "id" 
        const block = blocks.find((blck) => blck.id === blockId);
        if (!block) return; // si no hay, no hacer nada

        // pedir las fotos de la nueva página
        const { photos } = await getImages(block.query, newPage);

        // actualizar: recorrer array y cambiar las fotos con las nuevas
        setBlocks((valorAnterior) => 
        valorAnterior.map((block) => block.id === blockId ? {...block, images: photos } : block))
    }

    // devolver un objeto con todo lo que necesita el componente para funcionar: bloques, funciones loading y error del fetch
    return {
        blocks,
        addSearchBlock,
        updatePage,
        loading,
        error,
    };
}

export default useSearchBlocks; // exportar el hook