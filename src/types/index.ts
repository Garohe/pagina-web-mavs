// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  avatar?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

// Product Types
export type ProductCondition = 'New with Tags' | 'Like New' | 'Good' | 'Fair';
export type ProductCategory = 'Hoodies' | 'Jeans' | 'T-Shirts' | 'Jackets' | 'Pants' | 'Shorts' | 'Activewear' | 'Accessories';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface ProductVariant {
  id: string;
  color: string;
  size: ProductSize;
  sku: string;
  quantity: number;
  price: number;
  images?: string[];
}

export interface ProductMeasurements {
  chest?: number;
  length?: number;
  shoulders?: number;
  sleeves?: number;
  waist?: number;
  inseam?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  brand: string;
  condition: ProductCondition;
  material: string;
  careInstructions: string;
  variants: ProductVariant[];
  measurements: ProductMeasurements;
  images: string[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  soldAt?: string;
  rating: number;
  reviewCount: number;
}

// Cart Types
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  reservedAt: string;
}

export interface Cart {
  items: CartItem[];
  appliedCoupon?: Coupon;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
export type ShippingMethod = 'standard' | 'express' | 'overnight';

export interface OrderItem {
  productId: string;
  variantId: string;
  productName: string;
  productImage: string;
  color: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  events: OrderEvent[];
}

export interface OrderEvent {
  status: OrderStatus;
  message: string;
  timestamp: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

// Coupon Types
export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  expiresAt?: string;
  active: boolean;
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  sizes?: ProductSize[];
  colors?: string[];
  conditions?: ProductCondition[];
  brands?: string[];
  search?: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
