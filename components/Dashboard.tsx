import React, { useState } from 'react';
import { Product, Category, SiteSettings, User } from '../types';
import { CogIcon, BoxIcon, ShoppingBagIcon, CreditCardIcon, UserGroupIcon, PercentIcon, UserShieldIcon, DevicePhoneMobileIcon, TruckFrontIcon } from './icons';

import GeneralSettings from './dashboard/GeneralSettings';
import ProductSettings from './dashboard/ProductSettings';
import CategorySettings from './dashboard/CategorySettings';
import AppearanceSettings from './dashboard/AppearanceSettings';
import UserManagement from './dashboard/UserManagement';
import Placeholder from './dashboard/Placeholder';


interface DashboardProps {
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

type ActiveView = 'general' | 'products' | 'categories' | 'appearance' | 'orders' | 'customers' | 'discounts' | 'payments' | 'shipping' | 'staff';

const Dashboard: React.FC<DashboardProps> = (props) => {
    const [activeView, setActiveView] = useState<ActiveView>('general');

    const menuItems = [
        { id: 'general', label: 'الإعدادات العامة', icon: CogIcon },
        { id: 'products', label: 'المنتجات', icon: BoxIcon },
        { id: 'categories', label: 'الأصناف', icon: ShoppingBagIcon },
        { id: 'appearance', label: 'المظهر', icon: DevicePhoneMobileIcon },
        { id: 'staff', label: 'المستخدمون والصلاحيات', icon: UserShieldIcon },
        { id: 'orders', label: 'الطلبات', icon: ShoppingBagIcon },
        { id: 'customers', label: 'العملاء', icon: UserGroupIcon },
        { id: 'discounts', label: 'الخصومات', icon: PercentIcon },
        { id: 'payments', label: 'المدفوعات', icon: CreditCardIcon },
        { id: 'shipping', label: 'الشحن', icon: TruckFrontIcon },
    ];
    
    const renderContent = () => {
        switch (activeView) {
            case 'general':
                return <GeneralSettings settings={props.settings} onSave={props.onSaveSettings} />;
            case 'products':
                return <ProductSettings 
                            products={props.products} 
                            categories={props.categories}
                            onAdd={props.onAddProduct}
                            onUpdate={props.onUpdateProduct}
                            onDelete={props.onDeleteProduct}
                        />;
            case 'categories':
                 return <CategorySettings 
                            categories={props.categories}
                            onAdd={props.onAddCategory}
                            onUpdate={props.onUpdateCategory}
                            onDelete={props.onDeleteCategory}
                        />;
            case 'appearance':
                return <AppearanceSettings themeColors={props.themeColors} onSave={props.onSaveTheme} />;
            case 'staff':
                return <UserManagement 
                            users={props.users}
                            onAdd={props.onAddUser}
                            onUpdate={props.onUpdateUser}
                            onDelete={props.onDeleteUser}
                        />;
            case 'orders':
            case 'customers':
            case 'discounts':
            case 'payments':
            case 'shipping':
                const currentItem = menuItems.find(item => item.id === activeView);
                return <Placeholder title={currentItem?.label || ''} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full">
            <aside className="w-64 bg-white border-l p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-500 px-2">القائمة</h3>
                <ul>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveView(item.id as ActiveView)}
                                className={`w-full text-right flex items-center gap-3 p-3 rounded-lg text-md font-medium transition-colors ${
                                    activeView === item.id 
                                        ? 'bg-brand-primary text-white' 
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
