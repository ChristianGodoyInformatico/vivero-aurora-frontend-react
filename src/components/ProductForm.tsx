import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import viveroApi from '../api/viveroApi';
import { Image } from '../interfaces/image';
import { getEnvVariables } from '../helpers/getEnvVariables';
import Swal from 'sweetalert2';
const { apiUrl } = getEnvVariables()

interface Product {
    id?: string;
    name: string;
    alias: string;
    price: string;
    description: string;
    size: string;
    stockEnabled: boolean;
    image?: Image;  // Referencia a la imagen seleccionada
    categoryIds: string[];
}

interface Category {
    _id: string;
    name: string;
    description: string;
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
        categoryIds: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState<Image[]>([]);  // Lista de imágenes disponibles
    const [categories, setCategories] = useState<Category[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showImageSelector, setShowImageSelector] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchProduct();
        }
        fetchImages();
        fetchCategories();
    }, [id]);

    // Obtener el producto actual para edición
    const fetchProduct = async () => {
        try {
            const response = await viveroApi.get(`/product/${id}`);
            setProduct(response.data);
            if (response.data.image) {
                setPreviewImage(`${apiUrl}/image/see-image/${response.data.image.fileName}`);
            }
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    };

    // Obtener todas las imágenes subidas
    const fetchImages = async () => {
        try {
            const response = await viveroApi.get('/image');
            setImages(response.data);
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
        }
    };

    // Obtener todas las categorías disponibles
    const fetchCategories = async () => {
        try {
            const response = await viveroApi.get('/category'); // Ajusta la ruta según tu backend
            setCategories(response.data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    // Manejar la selección de categorías
    const toggleCategorySelection = (categoryId: string) => {
        console.log('la categoria id seleccionada:', categoryId);
        if (product.categoryIds.includes(categoryId)) {
            // Si ya está seleccionada, la eliminamos
            setProduct((prevProduct) => ({
                ...prevProduct,
                categoryIds: prevProduct.categoryIds.filter((id) => id !== categoryId),
            }));
        } else {
            // Si no está seleccionada, la agregamos
            setProduct((prevProduct) => ({
                ...prevProduct,
                categoryIds: [...prevProduct.categoryIds, categoryId],
            }));
        }
    };

    // Manejar la selección de imagen
    const handleImageSelect = (image: Image) => {
        setProduct({ ...product, image });
        setPreviewImage(`${apiUrl}/image/see-image/${image.fileName}`);
        setShowImageSelector(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar que una imagen esté seleccionada
        if (!product.image) {
            // Mostrar alerta usando SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Falta la imagen',
                text: 'Debes seleccionar una imagen para continuar.',
                confirmButtonText: 'Aceptar',
            });
            return; // Detener la ejecución si no hay una imagen seleccionada
        }

        const productData = {
            name: product.name,
            price: product.price,
            alias: product.alias,
            description: product.description,
            size: product.size,
            stockEnabled: product.stockEnabled,
            image: product.image?._id,  // Asegúrate de enviar el ID de la imagen seleccionada
            categoryIds: product.categoryIds,
        };

        try {
            isEditing
                ? await viveroApi.put(`/product/${id}`, productData)
                : await viveroApi.post('/product', productData);
            navigate('/admin/products');
        } catch (error) {
            console.error('Error al guardar el producto:', error);
        }
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
                        name="name"
                        value={product.name || ''}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Alias (Nombre científico)</label>
                    <input
                        type="text"
                        name="alias"
                        value={product.alias || ''}
                        onChange={(e) => setProduct({ ...product, alias: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="text"
                        name="price"
                        value={product.price || ''}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={product.description || ''}
                        name="description"
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
                        name="size"
                        value={product.size || ''}
                        onChange={(e) => setProduct({ ...product, size: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Sección para seleccionar categorías */}
                <div className="mb-4">
                    <label className="block text-gray-700">Categorías</label>
                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6'>
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className={`p-4 border rounded-lg cursor-pointer ${product.categoryIds.includes(category._id)
                                    ? 'bg-green-200 border-green-500'
                                    : 'bg-white'
                                    }`}
                                onClick={() => toggleCategorySelection(category._id)}
                            >
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700">Disponible</label>
                    <input
                        type="checkbox"
                        name="stockEnabled"
                        checked={product.stockEnabled || false}
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

                    {/* Botón para abrir el selector de imágenes */}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
                        onClick={() => setShowImageSelector(true)}  // Mostrar el selector de imágenes
                    >
                        Seleccionar Nueva Imagen
                    </button>

                    {/* Modal de selección de imágenes */}
                    {showImageSelector && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            onClick={() => setShowImageSelector(false)}>
                            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[500px] overflow-y-auto mx-6 my-6 relative no-scrollbar"
                                onClick={(e) => e.stopPropagation()}>

                                <h2 className="text-xl font-bold mb-4">Selecciona una Imagen</h2>
                                <button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    onClick={() => setShowImageSelector(false)}
                                >
                                    X {/* Botón para cerrar el modal */}
                                </button>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {images.map((image) => (
                                        <div
                                            key={image._id}
                                            className={`p-2 cursor-pointer ${product.image?._id === image._id ? 'border-4 border-green-500' : 'border'}`}
                                            onClick={() => handleImageSelect(image)}
                                        >
                                            <img
                                                src={`${apiUrl}/image/see-image/${image.fileName}`}
                                                alt={image.originalName}
                                                className="w-full h-32 object-cover"
                                            />
                                            <p className="text-center mt-2">{image.originalName}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
            </form >
        </div >
    );
};

export default ProductForm;
