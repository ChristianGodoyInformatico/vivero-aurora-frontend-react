import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { apiUrl } = getEnvVariables()

interface Category {
    _id: string;
    name: string;
}

const ManageCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend
        fetch(`${apiUrl}/category`)
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleEdit = (id: string) => {
        navigate(`/admin/categories/edit/${id}`);
        console.log(`Editar categoría con ID: ${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Eliminar categoría con ID: ${id}`);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestionar Categorías</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Crear Nueva Categoría
                </button>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded"
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4 border-b">Nombre</th>
                        <th className="text-left py-2 px-4 border-b">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category._id}>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">
                                <div className="flex">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 hover:bg-yellow-600 transition"
                                        onClick={() => handleEdit(category._id)}
                                    >
                                        <FaEdit className="mr-2" /> Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition ml-4"
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        <FaTrash className="mr-2" /> Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCategories;
