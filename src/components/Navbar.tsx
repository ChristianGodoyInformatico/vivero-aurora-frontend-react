import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { apiUrl } = getEnvVariables()

interface Category {
  _id: string;
  name: string;
}

import iconImage from '../assets/icono vivero aurora.png';

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${apiUrl}/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="background-navbar text-white font-bold p-1 flex justify-center items-center relative z-50">
      <div className="flex items-center space-x-4">
        {/* Icono del negocio */}
        <Link to={'/'}>
          <img
            src={iconImage}
            alt="Fondo"
            className="w-40 h-15 mr-4 object-cover"
          />
        </Link>

        {/* Menu desplegable de productos */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
          >
            Productos
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 text-white rounded z-50">
              {categories.map(category => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  className="dropdown-item  block hover:bg-green-600 rounded"
                  onClick={() => setDropdownOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Boton de Nosotros */}
      <Link
        to="/about"
        className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 ml-4"
      >
        Nosotros
      </Link>
    </nav>
  );
};

export default Navbar;
