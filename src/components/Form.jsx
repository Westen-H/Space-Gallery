import { useState } from "react";

// Recibe un callback opcional para ejecutar la búsqueda en el componente padre.
const ImagesForm = ({ onSearch, onTitleChange }) => {
  // Estado controlado del texto que escribe el usuario.
  const [query, setQuery] = useState("");
//   const [ catTitle, setCatTitle ] = useState("");

  // Maneja el envío y evita buscar si el texto está vacío.
  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = query.trim();
    if (!texto) return;
    onSearch?.(texto);
  };

  // crear titulo reflejado, de la categoria buscado
  const handleReflectedTitle = (e) => {
    const value = e.target.value;
    setQuery(value);
    onTitleChange?.(value ||'Space Gallery')
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Buscar imagen</legend>

        <input
          type="text"
          value={query}
          onChange={handleReflectedTitle}
          placeholder="Ej. atardecer en la playa"
        />
        <input type="submit" value="Buscar" />
      </fieldset>
    </form>
  );
};

export default ImagesForm;
