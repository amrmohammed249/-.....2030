import React, { useState, useEffect } from 'react';
import { Category } from '../../types';

interface CategoryFormProps {
    categoryToEdit?: Category | null;
    onSave: (category: Omit<Category, 'id'> & { id?: number }) => void;
    onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryToEdit, onSave, onCancel }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
        } else {
            setName('');
        }
    }, [categoryToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({
            id: categoryToEdit?.id,
            name: name,
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <h2 id="form-title" className="text-2xl font-bold p-6 border-b text-brand-dark">
                    {categoryToEdit ? 'تعديل الصنف' : 'إضافة صنف جديد'}
                </h2>
                <form onSubmit={handleSubmit} className="p-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">اسم الصنف</label>
                        <input 
                          type="text" 
                          name="name" 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" 
                          required 
                        />
                    </div>
                </form>
                <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-lg">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">إلغاء</button>
                    <button type="submit" onClick={handleSubmit} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80">
                        {categoryToEdit ? 'حفظ التغييرات' : 'إضافة الصنف'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;
