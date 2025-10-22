import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, SiteSettings, User } from './types';
import { PRODUCTS, CATEGORIES, USERS } from './constants';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { CartIcon, CogIcon } from './components/icons';
import AdminPanel from './components/AdminPanel';

interface ThemeColors {
  primary: string;
  secondary: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [users, setUsers] = useState<User[]>(USERS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    title: 'متجر بهار ونار',
    description: 'أجود أنواع البهارات والحبوب والبقوليات',
    email: 'info@baharwanar.com',
    phone: '+966 12 345 6789',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://whatsapp.com',
  });
  const [themeColors, setThemeColors] = useState<ThemeColors>({
    primary: '#8B5CF6',
    secondary: '#F59E0B',
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeColors.primary);
    root.style.setProperty('--color-secondary', themeColors.secondary);
  }, [themeColors]);

  const filteredProducts = selectedCategoryId
    ? products.filter(p => p.categoryId === selectedCategoryId && p.status === 'active')
    : products.filter(p => p.status === 'active');

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

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
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
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

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
  };

  const handleSaveTheme = (newColors: ThemeColors) => {
    setThemeColors(newColors);
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


  useEffect(() => {
    document.title = siteSettings.title;
  }, [siteSettings.title]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans" dir="rtl">
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brand-dark">{siteSettings.title}</h1>
          <nav className="hidden md:flex gap-6 items-center">
            <button
                onClick={() => setSelectedCategoryId(null)}
                className={`text-lg ${selectedCategoryId === null ? 'text-brand-accent font-bold' : 'text-gray-600 hover:text-brand-accent'}`}
            >
                كل المنتجات
            </button>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`text-lg ${selectedCategoryId === category.id ? 'text-brand-accent font-bold' : 'text-gray-600 hover:text-brand-accent'}`}
                >
                    {category.name}
                </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-brand-accent">
              <CartIcon className="w-8 h-8" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsAdminPanelOpen(true)} className="text-gray-600 hover:text-brand-accent">
              <CogIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
            <h2 className="text-4xl font-extrabold text-brand-dark mb-2">منتجاتنا</h2>
            <p className="text-lg text-gray-600">{siteSettings.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
            <div className="text-center py-16 col-span-full">
                <p className="text-xl text-gray-500">لا توجد منتجات في هذا الصنف حاليًا.</p>
            </div>
        )}
      </main>
      
      <footer className="bg-brand-dark text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} {siteSettings.title}. جميع الحقوق محفوظة.</p>
          <p className="mt-2">{siteSettings.email} | {siteSettings.phone}</p>
        </div>
      </footer>

      <Cart 
        items={cartItems} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
      
      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        products={products}
        categories={categories}
        settings={siteSettings}
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
}

export default App;
