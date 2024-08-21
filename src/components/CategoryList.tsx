import React, { useEffect, useState } from 'react';
import Category from './Category';

interface Category {
  _id: string;
  name: string;
  description: string;
  principalImage: {
    fileName: string;
    path: string;
  };
  secondaryImage: {
    fileName: string;
    path: string;
  };
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='text-center'>
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>
      <div className="flex flex-wrap justify-center">
        {categories.map(category => (
          <Category
            key={category._id}
            id={category._id}
            name={category.name}
            image={category.secondaryImage ? category.secondaryImage.fileName : 'https://via.placeholder.com/150'}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
