
import React from 'react';
import { type CartItem } from '../types';
import { CloseIcon } from './icons';
import CartItemComponent from './CartItem';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-brand-dark">سلة التسوق</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 p-8">سلة التسوق فارغة.</p>
            ) : (
              items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">المجموع الفرعي</span>
                <span className="text-xl font-bold text-brand-accent">{subtotal.toFixed(2)} ر.س</span>
              </div>
              <button className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg text-lg hover:bg-opacity-80 transition-colors">
                إتمام الطلب
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
