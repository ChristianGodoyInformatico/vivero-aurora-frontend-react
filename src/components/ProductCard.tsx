import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    image: ImageInterface;
    stockStatus: 'available' | 'out of stock';
}

export interface ImageInterface {
    _id: number,
    fileName: string,
    path: string
}

const ProductCard: React.FC<Product> = ({ name, price, image, stockStatus }) => {
    const urlName = encodeURIComponent(name.toLowerCase().replace(/ /g, '-'));

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <Link to={`/products/${urlName}`} className="mt-2 block text-blue-500">
                <div className="relative">
                    <img
                        // src={ imageUrl} 
                        src={`http://localhost:3000/api/image/see-image/${image.fileName}`}
                        alt={name}
                        className="w-full h-40 object-cover" />
                    {stockStatus === 'out of stock' && (
                        <div className="absolute bottom-0 left-0 w-full bg-orange-500 text-white text-center py-1">
                            Agotado
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-green-900">{name}</h3>
                    <p className="text-green-700">${price.toLocaleString()}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
