import React from 'react';
import { Product, Category, SiteSettings, User } from '../types';
import { CloseIcon } from './icons';
import Dashboard from './Dashboard';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    categories: Category[];
    settings: SiteSettings;
    users: User[];
    onAddProduct: (product: Omit<Product, 'id'>) => void;
    onUpdateProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
    onAddCategory: (category: Omit<Category, 'id'>) => void;
    onUpdateCategory: (category: Category) => void;
    onDeleteCategory: (categoryId: number) => void;
    onSaveSettings: (settings: SiteSettings) => void;
    themeColors: { primary: string; secondary: string };
    onSaveTheme: (colors: { primary: string; secondary: string }) => void;
    onAddUser: (user: Omit<User, 'id'>) => void;
    onUpdateUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    if (!props.isOpen) {
        return null;
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" dir="rtl" role="dialog" aria-modal="true">
            <div className="w-full h-full bg-gray-100 shadow-2xl relative flex flex-col">
                <div className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-2xl font-bold text-brand-dark">لوحة التحكم</h2>
                    <button onClick={props.onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <Dashboard {...props} />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
