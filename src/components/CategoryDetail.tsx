import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { apiUrl } = getEnvVariables()

interface Category {
  _id: string;
  name: string;
  description: string;
  principalImage: {
    path: string;
    fileName: string;
  };
  secondaryImage: {
    path: string;
    fileName: string;
  };
}

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/category/${id}`)
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!category) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="relative w-full h-96"> 
        <img
          src={`${apiUrl}/image/see-image/${category.principalImage ? category.principalImage.fileName : 'https://via.placeholder.com/150'}`} 
          alt="Fondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">{category.name}</h1>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">Productos</h2>
      {/* Listado de Productos */}
      <ProductList type='category' categoryId={id}/>

    </div>
  );
};

export default CategoryDetail;
