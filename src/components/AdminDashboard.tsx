import React, { useEffect } from 'react';
import { FaImages, FaListAlt, FaProductHunt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin-login');
        }
    }, [navigate]);

    return (
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Botón de Administración de Productos */}
        <Link to="/admin/products" className="flex items-center justify-center p-6 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 transition duration-300">
          <FaProductHunt className="text-3xl mr-4" />
          <span className="text-xl">Administrar Productos</span>
        </Link>

        {/* Botón de Administración de Categorías */}
        <Link to="/admin/categories" className="flex items-center justify-center p-6 bg-yellow-500 text-white rounded shadow-lg hover:bg-yellow-600 transition duration-300">
          <FaListAlt className="text-3xl mr-4" /> {/* Icono de categorías */}
          <span className="text-xl">Administrar Categorías</span>
        </Link>
        
        {/* Botón de Administración de Medios */}
        <Link to="/admin/media" className="flex items-center justify-center p-6 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300">
          <FaImages className="text-3xl mr-4" /> {/* Icono de imágenes */}
          <span className="text-xl">Administrar Medios</span>
        </Link>
      </div>
    </div>
      );
};

export default AdminDashboard;
