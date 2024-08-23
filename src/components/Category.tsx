import React from 'react';
import { Link } from 'react-router-dom';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { apiUrl } = getEnvVariables()

interface CategoryProps {
  id: string;
  name: string;
  image: string;
}

const Category: React.FC<CategoryProps> = ({ id, name, image }) => {
  return (
    <div className="text-center m-4">
      <Link to={`/category/${id}`} className="mt-2 block text-blue-500">
        <img
          src={`${apiUrl}/image/see-image/${image}`}
          alt={name}
          className="w-36 h-32 rounded-full mx-auto"
        />
        <span className="mt-2 block text-black font-bold">{name}</span>
      </Link>
    </div>
  );
};

export default Category;
