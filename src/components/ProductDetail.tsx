import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  alias: string;
  description: string;
  size: string;
  price: string;
  stockEnabled: boolean;
  enabled: boolean;
  image: {
    _id: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    path: string;
    __v: number;
  };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Realizar la llamada a la API usando el ID del producto
    fetch(`http://localhost:3000/api/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log('el producto es:', product);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-4">
          <img src={`http://localhost:3000/api/image/see-image/${product.image.fileName}`} alt={product.name} className="w-full h-auto object-cover rounded shadow-md" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <h2 className="text-xl text-green-700 mb-4">${product.price}</h2>
          <p className="text-lg italic mb-4">{product.alias}</p>
          <p className="text-lg mb-4">Altura aprox: {product.size}</p>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-sm italic text-gray-600 mb-4">*La imagen de este producto es referencial, para obtener detalles de nuestros productos comunicate con nosotros por via WhatsApp.</p>
          <p className="text-lg mb-4">Disponibilidad: <span className={`font-bold ${product.stockEnabled ? 'text-green-700' : 'text-red-700'}`}>{product.stockEnabled ? 'Hay existencias' : 'No hay existencias'}</span></p>
          <div className="flex items-center space-x-4">
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              <FaWhatsapp className="mr-2" /> Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
