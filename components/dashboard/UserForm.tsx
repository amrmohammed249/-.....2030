import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../types';

interface UserFormProps {
    userToEdit?: User | null;
    onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
    onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onSave, onCancel }) => {
    const initialState = {
        name: '',
        email: '',
        role: 'editor' as UserRole,
    };
    
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                name: userToEdit.name,
                email: userToEdit.email,
                role: userToEdit.role,
            });
        } else {
            setFormData(initialState);
        }
    }, [userToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: userToEdit?.id,
            ...formData,
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <h2 id="form-title" className="text-2xl font-bold p-6 border-b text-brand-dark">
                    {userToEdit ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
                </h2>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">الصلاحية</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent">
                            <option value="editor">محرر</option>
                            <option value="admin">مدير</option>
                        </select>
                    </div>
                </form>
                <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-lg">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">إلغاء</button>
                    <button type="button" onClick={handleSubmit} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-80">
                        {userToEdit ? 'حفظ التغييرات' : 'إضافة المستخدم'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
