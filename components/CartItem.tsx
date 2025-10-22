
import React from 'react';
import { type CartItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon } from './icons';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (amount: number) => {
    const newQuantity = item.quantity + amount;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    } else {
      onRemoveItem(item.id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md ml-4" />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-500 text-sm">{item.price.toFixed(2)} ر.س</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <button onClick={() => handleQuantityChange(1)} className="p-2 hover:bg-gray-100">
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>
          <span className="px-3 text-lg font-medium">{item.quantity}</span>
          <button onClick={() => handleQuantityChange(-1)} className="p-2 hover:bg-gray-100">
            <MinusIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <button onClick={() => onRemoveItem(item.id)} className="mr-4 text-gray-500 hover:text-red-500">
          <TrashIcon className="w-5 h-5" />
        </button>
        <p className="font-semibold w-20 text-left">
          {(item.price * item.quantity).toFixed(2)} ر.س
        </p>
      </div>
    </div>
  );
};

export default CartItemComponent;
