// Fix: Replaced placeholder content with mock data for products, categories, users, and settings to resolve 'Cannot find name' errors and provide data for the application to render.
import { Product, Category, User, SiteSettings } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'قهوة' },
  { id: 2, name: 'حلويات' },
  { id: 3, name: 'مشروبات باردة' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'قهوة V60',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1557769566-36e622424859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 1,
    description: 'قهوة مختصة محضرة بطريقة التقطير V60، تتميز بنكهاتها الغنية والواضحة.',
    stock: 10,
    status: 'active',
  },
  {
    id: 2,
    name: 'كيكة العسل',
    price: 25.50,
    image: 'https://images.unsplash.com/photo-1586985289936-2403b88d3555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 2,
    description: 'طبقات من البسكويت الرقيق مع كريمة العسل الغنية، مزينة بفتات البسكويت.',
    stock: 5,
    status: 'active',
  },
  {
    id: 3,
    name: 'موهيتو ليمون ونعناع',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1551538850-2f348ae6b3a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 3,
    description: 'مشروب منعش يجمع بين حمضية الليمون ونكهة النعناع الطازج مع الصودا.',
    stock: 15,
    status: 'active',
  },
  {
    id: 4,
    name: 'كورتادو',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1572403106143-865b11a43254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 1,
    description: 'مزيج متوازن بين الإسبريسو والحليب المبخر بنسبة متساوية.',
    stock: 20,
    status: 'active',
  },
  {
    id: 5,
    name: 'تشيز كيك بالتوت',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1565010693538-6625b5971488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 2,
    description: 'طبقة من البسكويت المقرمش مع كريمة الجبن الغنية وصلصة التوت اللذيذة.',
    stock: 0,
    status: 'inactive',
  },
  {
    id: 6,
    name: 'آيس تي خوخ',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1621263765181-23d336fed5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categoryId: 3,
    description: 'شاي مثلج بنكهة الخوخ الحلوة والمنعشة، مثالي لأيام الصيف.',
    stock: 8,
    status: 'active',
  }
];

export const INITIAL_USERS: User[] = [
    { id: 1, name: 'أحمد عبدالله', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'فاطمة محمد', email: 'editor@example.com', role: 'editor' },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
    title: 'مقهى',
    description: 'متجر إلكتروني لبيع القهوة والحلويات',
    email: 'contact@example.com',
    phone: '+966123456789',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://whatsapp.com',
};

export const INITIAL_THEME_COLORS = {
    primary: '#6B4F4B',
    secondary: '#A5A58D',
};
