import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getEnvVariables } from '../helpers/getEnvVariables';
import viveroApi from '../api/viveroApi';
import Swal from 'sweetalert2';
const { apiUrl } = getEnvVariables()

interface Product {
    _id: string;
    name: string;
    enabled: boolean;
}

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        // Obtener los productos desde el backend
        fetch(`${apiUrl}/product`)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error:', error));
    }

    const handleEdit = (id: string) => {
        navigate(`/admin/products/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: '¿Estás seguro que desea eliminarla?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarla',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await viveroApi.delete(`/product/${id}`);
                Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
                getProducts(); // refrescar la carga de productos
            }
        });
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestionar Productos</h1>
            <div className="flex justify-between items-center mb-4">
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Crear Nuevo Producto
                </button> */}

                <Link to="/admin/products/create"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Crear Nuevo Producto
                </Link>
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
                        <th className="text-left py-2 px-4 border-b">Estado</th>
                        <th className="text-left py-2 px-4 border-b">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product._id}>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">
                                {product.enabled ? 'Activo' : 'Inactivo'}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <div className="flex">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 hover:bg-yellow-600 transition"
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        <FaEdit className="mr-2" /> Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition ml-4"
                                        onClick={() => handleDelete(product._id)}
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

export default ManageProducts;
