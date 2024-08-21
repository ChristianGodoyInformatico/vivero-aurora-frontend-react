import React from 'react';
import CategoryList from './CategoryList';
import Location from './Location';

import backgroundImage from '../assets/GettyImages-1363636142.jpg'; // Importar la imagen
import ProductList from './ProductList';

const Home: React.FC = () => {
  return (
    <div className="w-full mx-0 relative">
      {/* Imagen de fondo con texto */}
      <div className="relative w-full h-96">
        <img
          src={backgroundImage}
          alt="Fondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">Bienvenidos a nuestra página</h1>
        </div>
      </div>

      <div className="w-full mx-auto p-4">
        {/* Texto de bienvenida */}
        <div className="container mx-auto px-4 text-center mb-5">
          <p className="text-lg">
            Bienvenidos a nuestro vivero, un rincón donde la naturaleza y el compromiso con el medio ambiente florecen juntos. Aquí, nos dedicamos a promover el cultivo de árboles nativos, vitales para la preservación de nuestra biodiversidad y la salud de nuestro ecosistema.
          </p>
        </div>

        {/* Listado de Categorías */}
        <CategoryList />

        {/* Listado de Productos */}
        <div className='container mx-auto mt-5 px-4 text-center'>
          <p className="text-lg">
            Bienvenidos a nuestro vivero, un rincón donde la naturaleza y el compromiso con el medio ambiente florecen juntos. Aquí, nos dedicamos a promover el cultivo de árboles nativos, vitales para la preservación de nuestra biodiversidad y la salud de nuestro ecosistema.
          </p>
        </div>
        <ProductList type='top' />
        <div className='my-10'></div>
        {/* Snippet de Google Maps */}
        <Location />
      </div>
    </div>
  );
};

export default Home;