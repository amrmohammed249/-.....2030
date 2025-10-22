import React, { useState } from 'react';
import { User } from '../../types';
import { PencilIcon, TrashIcon } from '../icons';
import UserForm from './UserForm';

interface UserManagementProps {
    users: User[];
    onAdd: (user: Omit<User, 'id'>) => void;
    onUpdate: (user: User) => void;
    onDelete: (userId: number) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAdd, onUpdate, onDelete }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    const handleEditClick = (user: User) => {
        setUserToEdit(user);
        setIsFormOpen(true);
    };

    const handleAddClick = () => {
        setUserToEdit(null);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (userId: number) => {
        if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المستخدم؟')) {
            onDelete(userId);
        }
    };

    const handleSave = (userData: Omit<User, 'id'> & { id?: number }) => {
        if (userData.id) {
            onUpdate(userData as User);
        } else {
            onAdd(userData);
        }
        setIsFormOpen(false);
        setUserToEdit(null);
    };
    
    const roleLabels: { [key in User['role']]: string } = {
        admin: 'مدير',
        editor: 'محرر',
    };

    return (
        <>
            <div className="flex justify-end mb-6">
                <button onClick={handleAddClick} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors">
                    إضافة مستخدم جديد
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصلاحية</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {roleLabels[user.role]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleEditClick(user)} className="text-brand-accent hover:text-opacity-80" aria-label={`تعديل ${user.name}`}>
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(user.id)} className="text-red-600 hover:text-red-900" aria-label={`حذف ${user.name}`}>
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
                <UserForm
                    userToEdit={userToEdit}
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </>
    );
};

export default UserManagement;
