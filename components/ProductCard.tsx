import React from 'react';
import { type Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2 relative">
      {isOutOfStock && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          نفدت الكمية
        </div>
      )}
      <img src={product.image} alt={product.name} className={`w-full h-48 object-cover ${isOutOfStock ? 'grayscale' : ''}`} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-lg font-semibold text-brand-accent">
            {product.price.toFixed(2)} ر.س
          </p>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`font-bold py-2 px-4 rounded-lg transition-colors ${
              isOutOfStock 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-primary text-white hover:bg-opacity-80'
            }`}
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
