import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { PencilIcon, TrashIcon } from '../icons';
import ProductForm from '../ProductForm';

interface ProductSettingsProps {
    products: Product[];
    categories: Category[];
    onAdd: (product: Omit<Product, 'id'>) => void;
    onUpdate: (product: Product) => void;
    onDelete: (productId: number) => void;
}

const ProductSettings: React.FC<ProductSettingsProps> = ({ products, categories, onAdd, onUpdate, onDelete }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsFormOpen(true);
    };

    const handleAddClick = () => {
        setProductToEdit(null);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (productId: number) => {
        if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
            onDelete(productId);
        }
    };

    const handleSave = (productData: Omit<Product, 'id'> & { id?: number }) => {
        if (productData.id) {
            onUpdate(productData as Product);
        } else {
            onAdd(productData);
        }
        setIsFormOpen(false);
        setProductToEdit(null);
    };
    
    const getCategoryName = (categoryId: number) => {
        return categories.find(c => c.id === categoryId)?.name || 'غير مصنف';
    };

    return (
        <>
            <div className="flex justify-end mb-6">
                <button onClick={handleAddClick} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors">
                    إضافة منتج جديد
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المنتج</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="mr-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">{getCategoryName(product.categoryId)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.status === 'active' ? 'نشط' : 'غير نشط'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2)} ر.س</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleEditClick(product)} className="text-brand-accent hover:text-opacity-80" aria-label={`تعديل ${product.name}`}>
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(product.id)} className="text-red-600 hover:text-red-900" aria-label={`حذف ${product.name}`}>
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isFormOpen && (
                <ProductForm
                    productToEdit={productToEdit}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </>
    );
};

export default ProductSettings;
