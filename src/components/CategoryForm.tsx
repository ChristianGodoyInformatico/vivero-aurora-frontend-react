import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Category {
    id?: string;
    name: string;
    description: string
}

const CategoryForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>({
        name: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            // Estamos en modo edición
            setIsEditing(true);
            // Obtener la categoría desde el backend
            fetch(`http://localhost:3000/api/category/${id}`)
                .then((response) => response.json())
                .then((data) => setCategory(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEditing
            ? `http://localhost:3000/api/category/${id}`
            : 'http://localhost:3000/api/category';

        const method = isEditing ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
            .then((response) => response.json())
            .then(() => {
                // Redirigir a la página de gestión de categorías
                navigate('/admin/categories');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre de la Categoría</label>
                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={category.description}
                        onChange={(e) =>
                            setCategory({ ...category, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
