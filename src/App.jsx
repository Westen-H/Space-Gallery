// import { useEffect, useState } from 'react'             
import ImgSearchForm from './components/Form'
import FooterPage from './pages/Footer'
import './App.css'

function App() {
 const [ title, setTitle ] = useState("Space Gallery");

 // Crear variable de estado que contendra los datos de la peticiónde la "api" con valor inicail de array vacio " [] "
 const [ images, setImages ] = useState([]);  

 // función de llamada al fetch
const getImages = async (category) => {
  try {
    // variavle para almacenar la respuesta
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${category}&page=1&per_page=15`,
      {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY
        }
      }
    );

    // transformar la respuesta para obtener los datos
    const data = await response.json();

    // actualizar con las fotos nuevas
    setImages(data.photos);


  } catch (error) {
    console.error("Error en la petición", error)
  }

}

// // decidir cuando se ejecutará la petición
// useEffect(() => {
//   getImages();
// }, []);

console.log(images);

  return (
    <>
      <div>

      </div>
      <h1>{title}</h1>
      <ImgSearchForm
      onTitleChange={setTitle}
      />
      <div className="card">

        <FooterPage/>
      </div>

    </>
  )
}

export default App
