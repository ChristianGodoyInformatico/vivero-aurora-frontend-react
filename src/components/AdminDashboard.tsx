import React, { useEffect } from 'react';
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
          <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
            {/* Botón para la gestión de categorías */}
            <Link
              to="/admin/categories"
              className="bg-blue-500 text-white py-8 px-16 rounded-lg text-center text-xl font-semibold hover:bg-blue-600 transition duration-300 w-full md:w-1/3"
            >
              Gestionar Categorías
            </Link>
    
            {/* Botón para la gestión de productos */}
            <Link
              to="/admin/products"
              className="bg-green-500 text-white py-8 px-16 rounded-lg text-center text-xl font-semibold hover:bg-green-600 transition duration-300 w-full md:w-1/3"
            >
              Gestionar Productos
            </Link>
          </div>
        </div>
      );
};

export default AdminDashboard;
