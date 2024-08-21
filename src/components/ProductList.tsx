import React, { useEffect, useState } from 'react';
import ProductCard, { ImageInterface } from './ProductCard';
import viveroApi from '../api/viveroApi';

interface Product {
  _id: number;
  name: string;
  price: number;
  image: ImageInterface;
  categoryId: string;
  stockStatus: 'available' | 'out of stock';
}

interface ProductListProps {
  type?: string;
  categoryId?: string;
}

const ProductList: React.FC<ProductListProps> = ({ type, categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let url = '/product'

    switch (type) {
      case 'category':
        url += `/by-category/${categoryId}`;
        break;
      case 'top':
        url += `/top/views`;
        break;
      default:
        break;
    }

    viveroApi.get(url)
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => console.error('Error:', error));


  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            stockStatus={product.stockStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
