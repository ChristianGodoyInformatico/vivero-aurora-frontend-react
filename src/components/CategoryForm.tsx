import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import viveroApi from '../api/viveroApi'; // Ajusta esto según tu proyecto
import { Image } from '../interfaces/image';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { apiUrl } = getEnvVariables()


interface Category {
    id?: string;
    name: string;
    description: string;
    principalImage?: Image;
    secondaryImage?: Image;
}

const CategoryForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [category, setCategory] = useState<Category>({
        name: '',
        description: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState<Image[]>([]);
    const [showImageSelector, setShowImageSelector] = useState<'principal' | 'secondary' | null>(null);
    const [previewPrincipalImage, setPreviewPrincipalImage] = useState<string | null>(null);
    const [previewSecondaryImage, setPreviewSecondaryImage] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchCategory();
        }
        fetchImages();
    }, [id]);

    // Obtener la categoría actual para edición
    const fetchCategory = async () => {
        try {
            const response = await viveroApi.get(`/category/${id}`);
            setCategory(response.data);
            if (response.data.principalImage) {
                setPreviewPrincipalImage(`${apiUrl}/image/see-image/${response.data.principalImage.fileName}`);
            }
            if (response.data.secondaryImage) {
                setPreviewSecondaryImage(`${apiUrl}/image/see-image/${response.data.secondaryImage.fileName}`);
            }
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
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

    // Manejar la selección de imagen
    const handleImageSelect = (image: Image) => {
        if (showImageSelector === 'principal') {
            setCategory({ ...category, principalImage: image });
            setPreviewPrincipalImage(`${apiUrl}/image/see-image/${image.fileName}`);
        } else if (showImageSelector === 'secondary') {
            setCategory({ ...category, secondaryImage: image });
            setPreviewSecondaryImage(`${apiUrl}/image/see-image/${image.fileName}`);
        }
        setShowImageSelector(null);  // Cerrar el selector de imágenes
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const categoryData = {
            name: category.name,
            description: category.description,
            principalImage: category.principalImage?._id,
            secondaryImage: category.secondaryImage?._id,
        };

        try {
            isEditing
                ? await viveroApi.patch(`/category/${id}`, categoryData)
                : await viveroApi.post('/category', categoryData);
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error al guardar la categoría:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                {isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {/* Campos del formulario */}
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre de la Categoría</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name || ''}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={category.description || ''}
                        name="description"
                        onChange={(e) =>
                            setCategory({ ...category, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Previsualización y selección de Principal Image */}
                <div className="mb-4">
                    <label className="block text-gray-700">Imagen Principal</label>
                    {previewPrincipalImage && (
                        <div className="mb-4">
                            <img
                                src={previewPrincipalImage}
                                alt="Previsualización de la imagen principal"
                                className="h-48 object-cover"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
                        onClick={() => setShowImageSelector('principal')}
                    >
                        Seleccionar Imagen Principal
                    </button>
                </div>

                {/* Previsualización y selección de Secondary Image */}
                <div className="mb-4">
                    <label className="block text-gray-700">Imagen Secundaria</label>
                    {previewSecondaryImage && (
                        <div className="mb-4">
                            <img
                                src={previewSecondaryImage}
                                alt="Previsualización de la imagen secundaria"
                                className="h-48 object-cover"
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
                        onClick={() => setShowImageSelector('secondary')}
                    >
                        Seleccionar Imagen Secundaria
                    </button>
                </div>

                {/* Modal de selección de imágenes */}
                {showImageSelector && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowImageSelector(null)}  // Cierra el modal al hacer clic fuera
                    >
                        <div
                            className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[500px] overflow-y-auto mx-6 my-6 relative no-scrollbar"
                            onClick={(e) => e.stopPropagation()}  // Evita el cierre del modal al hacer clic dentro
                        >
                            <h2 className="text-xl font-bold mb-4">Selecciona una Imagen</h2>
                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => setShowImageSelector(null)}  // Cerrar modal con el botón X
                            >
                                X
                            </button>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {images.map((image) => (
                                    <div
                                        key={image._id}
                                        className={`p-2 cursor-pointer ${showImageSelector == 'principal' ?
                                            (category.principalImage?._id === image._id ? 'border-4 border-green-500' : 'border') : 
                                            (category.secondaryImage?._id === image._id ? 'border-4 border-green-500' : 'border')}`}
                                        onClick={() => handleImageSelect(image)} // Selecciona la imagen
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

                {/* Botón de guardar */}
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                    {isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
