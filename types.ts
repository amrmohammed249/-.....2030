// Fix: Replaced constants and self-import with proper type definitions to resolve circular dependencies and missing types across the app.
export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  description: string;
  stock: number;
  status: ProductStatus;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = 'admin' | 'editor';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface SiteSettings {
  title: string;
  description: string;
  email: string;
  phone: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
}
