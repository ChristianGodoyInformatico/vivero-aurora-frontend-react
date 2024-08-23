import React, { useEffect, useState } from 'react';
import viveroApi from '../api/viveroApi';
import { getEnvVariables } from '../helpers/getEnvVariables';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';
import { Image } from '../interfaces/image';
const { apiUrl } = getEnvVariables()

const MediaManager: React.FC = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await viveroApi.get('/image');
    setImages(response.data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await viveroApi.post('/image/upload', formData);
      fetchImages();
      setSelectedFile(null);
    }
  };

  const handleDeleteImage = (imageId: string) => {
    // Activar el modal de confirmación con SweetAlert2
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
        await viveroApi.delete(`/media/${imageId}`);
        Swal.fire('Eliminada', 'La imagen ha sido eliminada', 'success');
        fetchImages(); // Refrescar las imágenes después de eliminar
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Gestión de Medios</h1>

      {/* Botón para subir imágenes */}
      <div className="flex items-center mb-8">
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="imageUpload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300">
          Subir Imagen
        </label>
        {selectedFile && (
          <button
            onClick={handleUpload}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Confirmar Subida
          </button>
        )}
      </div>

      {/* Galería de imágenes subidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {images.map((image: Image) => (
          <div key={image._id} className="border p-2 relative">
            <img
              src={`${apiUrl}/image/see-image/${image.fileName}`} // Ajusta esto si tu backend sirve las imágenes en otra ruta
              alt={image.originalName}
              className="w-full h-32 object-cover"
            />
            <p className="text-center mt-2">{image.originalName}</p>
            {/* Botón de eliminación */}
            <button
              onClick={() => handleDeleteImage(image._id!)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition duration-300"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaManager;
