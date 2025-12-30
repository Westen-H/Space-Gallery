// Importaciones
import { useState } from "react"
import useFavorites from "./useFavorites";

const useFavoritesModal = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    // desestructurar desde useFavorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // funcionalidades de estado abierto o cerrado
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        favorites,
        toggleFavorite,
        isFavorite
    };
};

export default useFavoritesModal