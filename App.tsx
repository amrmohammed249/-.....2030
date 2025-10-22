// Fix: Replaced placeholder with a functional React component to serve as the application's root. This resolves the "'App.tsx' is not a module" error in index.tsx.
import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, SiteSettings, User } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_SITE_SETTINGS, INITIAL_USERS, INITIAL_THEME_COLORS } from './constants';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import { CartIcon, CogIcon } from './components/icons';

// Helper to get state from localStorage or use a default value
const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
    }
    return defaultValue;
};


const App: React.FC = () => {
    // State management
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    
    // Persistent state for settings and theme
    const [settings, setSettings] = useState<SiteSettings>(() => getInitialState('siteSettings', INITIAL_SITE_SETTINGS));
    const [themeColors, setThemeColors] = useState(() => getInitialState('themeColors', INITIAL_THEME_COLORS));

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

    // Effect to apply theme colors and save them to localStorage
    useEffect(() => {
        document.documentElement.style.setProperty('--color-primary', themeColors.primary);
        document.documentElement.style.setProperty('--color-secondary', themeColors.secondary);
        try {
            localStorage.setItem('themeColors', JSON.stringify(themeColors));
        } catch (error) {
            console.error('Error saving theme to localStorage:', error);
        }
    }, [themeColors]);
    
    // Effect to save site settings to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('siteSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings to localStorage:', error);
        }
    }, [settings]);


    // Cart Handlers
    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const handleRemoveFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // Admin Panel Handlers
    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };
    const handleDeleteProduct = (productId: number) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const handleAddCategory = (category: Omit<Category, 'id'>) => {
        setCategories(prev => [...prev, { ...category, id: Date.now() }]);
    };
    const handleUpdateCategory = (updatedCategory: Category) => {
        setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    };
    const handleDeleteCategory = (categoryId: number) => {
        setCategories(prev => prev.filter(c => c.id !== categoryId));
    };
    
    const handleAddUser = (user: Omit<User, 'id'>) => {
        setUsers(prev => [...prev, { ...user, id: Date.now() }]);
    };
    const handleUpdateUser = (updatedUser: User) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    };
    const handleDeleteUser = (userId: number) => {
        setUsers(prev => prev.filter(u => u.id !== userId));
    };
    
    const handleSaveSettings = (newSettings: SiteSettings) => {
        setSettings(newSettings);
    };
    const handleSaveTheme = (colors: { primary: string; secondary: string }) => {
        setThemeColors(colors);
    };
    
    const filteredProducts = activeCategoryId
        ? products.filter(p => p.categoryId === activeCategoryId)
        : products;

    return (
        <div className="bg-gray-50 min-h-screen font-sans" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-3xl font-bold text-brand-dark">{settings.title}</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-brand-primary">
                                <CartIcon className="w-8 h-8" />
                                {totalCartItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                                        {totalCartItems}
                                    </span>
                                )}
                            </button>
                             <button onClick={() => setIsAdminPanelOpen(true)} className="text-gray-600 hover:text-brand-primary">
                                <CogIcon className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 {/* Category Filters */}
                 <div className="mb-8 flex justify-center flex-wrap gap-4">
                    <button 
                        onClick={() => setActiveCategoryId(null)}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${!activeCategoryId ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                    >
                        الكل
                    </button>
                    {categories.map(category => (
                        <button 
                            key={category.id}
                            onClick={() => setActiveCategoryId(category.id)}
                            className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeCategoryId === category.id ? 'bg-brand-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                         product.status === 'active' && <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </main>

            {/* Cart Sidebar */}
            <Cart 
                items={cartItems}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
            />

            {/* Admin Panel */}
            <AdminPanel
                isOpen={isAdminPanelOpen}
                onClose={() => setIsAdminPanelOpen(false)}
                products={products}
                categories={categories}
                settings={settings}
                users={users}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onAddCategory={handleAddCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
                onSaveSettings={handleSaveSettings}
                themeColors={themeColors}
                onSaveTheme={handleSaveTheme}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
            />
        </div>
    );
};

export default App;