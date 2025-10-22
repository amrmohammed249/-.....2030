import React, { useState, useEffect } from 'react';
import { Product, ProductStatus, Category } from '../types';

interface ProductFormProps {
    productToEdit?: Product | null;
    categories: Category[];
    onSave: (product: Omit<Product, 'id'> & { id?: number }) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, categories, onSave, onCancel }) => {
    const initialState = {
        name: '',
        price: '',
        description: '',
        image: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        stock: '0',
        status: 'active' as ProductStatus,
    };
    
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                price: productToEdit.price.toString(),
                description: productToEdit.description,
                image: productToEdit.image,
                categoryId: productToEdit.categoryId,
                stock: productToEdit.stock.toString(),
                status: productToEdit.status,
            });
        } else {
            setFormData(initialState);
        }
    }, [productToEdit, categories]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...(productToEdit || {}),
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock, 10) || 0,
            categoryId: parseInt(String(formData.categoryId), 10),
            status: formData.status as ProductStatus,
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <h2 id="form-title" className="text-2xl font-bold p-6 border-b text-brand-dark">
                    {productToEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                </h2>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required step="0.01" min="0" />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">الكمية المتوفرة</label>
                            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required min="0" />
                        </div>
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">الصنف</label>
                            <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent">
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                            <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent">
                                <option value="active">نشط</option>
                                <option value="inactive">غير نشط</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                            <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" placeholder="https://example.com/image.jpg" required />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required />
                        </div>
                    </div>
                </form>
                <div className="flex justify-end gap-4 p-6 border-t mt-auto bg-gray-50 rounded-b-lg">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">إلغاء</button>
                    <button type="button" onClick={(e) => handleSubmit(e)} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80">
                        {productToEdit ? 'حفظ التغييرات' : 'إضافة المنتج'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
