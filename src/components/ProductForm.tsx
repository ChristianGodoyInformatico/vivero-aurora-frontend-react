import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Product {
    id?: string;
    name: string;
    alias: string;
    price: string;
    description: string;
    size: string;
    stockEnabled: boolean;
    image?: ImageInterface;
}

export interface ImageInterface {
    _id: number,
    fileName: string,
    path: string
}

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        name: '',
        alias: '',
        price: '',
        description: '',
        size: '',
        stockEnabled: true,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Estamos en modo edición
            setIsEditing(true);
            // Obtener el producto desde el backend
            fetch(`http://localhost:3000/api/product/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setProduct(data);
                    console.log('que llega del producto?', data);
                    setPreviewImage(`http://localhost:3000/api/image/see-image/${data.image.fileName}`); // Mostrar la imagen existente
                })
                .catch((error) => console.error('Error:', error));
        }
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('size', product.size);
        formData.append('stockEnabled', product.stockEnabled.toString());

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        const url = isEditing
            ? `http://localhost:3000/api/product/${id}`
            : 'http://localhost:3000/api/product';
        const method = isEditing ? 'PATCH' : 'POST';

        console.log('que hay en el form data?', formData);

        await fetch(url, {
            method: method,
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('cual es la data?', data);

                // navigate('/admin/products')
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre del Producto</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Alias (Nombre cientifico)</label>
                    <input
                        type="text"
                        value={product.alias}
                        onChange={(e) => setProduct({ ...product, alias: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="text"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={product.description}
                        onChange={(e) =>
                            setProduct({ ...product, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Tamaño</label>
                    <input
                        type="text"
                        value={product.size}
                        onChange={(e) => setProduct({ ...product, size: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Disponible</label>
                    <input
                        type="checkbox"
                        checked={product.stockEnabled}
                        onChange={(e) =>
                            setProduct({ ...product, stockEnabled: e.target.checked })
                        }
                        className="mr-2"
                    />
                    <span>¿Está disponible?</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Imagen del Producto</label>
                    {previewImage && (
                        <div className="mb-4">
                            <img
                                src={previewImage}
                                alt="Previsualización de la imagen"
                                className="h-48 object-cover"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
