import React, { useState } from 'react';
import { Category } from '../../types';
import { PencilIcon, TrashIcon } from '../icons';
import CategoryForm from './CategoryForm';

interface CategorySettingsProps {
    categories: Category[];
    onAdd: (category: Omit<Category, 'id'>) => void;
    onUpdate: (category: Category) => void;
    onDelete: (categoryId: number) => void;
}

const CategorySettings: React.FC<CategorySettingsProps> = ({ categories, onAdd, onUpdate, onDelete }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const handleEditClick = (category: Category) => {
        setCategoryToEdit(category);
        setIsFormOpen(true);
    };

    const handleAddClick = () => {
        setCategoryToEdit(null);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (categoryId: number) => {
        if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا الصنف؟ قد يؤثر هذا على المنتجات المرتبطة به.')) {
            onDelete(categoryId);
        }
    };

    const handleSave = (categoryData: Omit<Category, 'id'> & { id?: number }) => {
        if (categoryData.id) {
            onUpdate(categoryData as Category);
        } else {
            onAdd(categoryData);
        }
        setIsFormOpen(false);
        setCategoryToEdit(null);
    };

    return (
        <>
            <div className="flex justify-end mb-6">
                <button onClick={handleAddClick} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors">
                    إضافة صنف جديد
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto max-w-2xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الصنف</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleEditClick(category)} className="text-brand-accent hover:text-opacity-80" aria-label={`تعديل ${category.name}`}>
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(category.id)} className="text-red-600 hover:text-red-900" aria-label={`حذف ${category.name}`}>
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
                <CategoryForm
                    categoryToEdit={categoryToEdit}
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </>
    );
};

export default CategorySettings;
