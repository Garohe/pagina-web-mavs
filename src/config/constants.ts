// App Configuration
export const APP_NAME = 'Mavs Thrift';
export const APP_DESCRIPTION = 'Premium vintage clothing and accessories from Mavs Thrift';
export const CONTACT_EMAIL = 'support@mavsthrift.com';
export const CONTACT_PHONE = '(555) 123-4567';

// Business Info
export const BUSINESS_HOURS = 'Mon-Fri 9AM-6PM EST';
export const FREE_SHIPPING_THRESHOLD = 75;
export const TAX_RATE = 0.08; // 8%

// Cart
export const CART_RESERVATION_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

// Shipping
export const SHIPPING_RATES = {
  standard: 5.99,
  express: 12.99,
  overnight: 24.99,
} as const;

// Social Media (update with real links later)
export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
  twitter: '#',
  email: CONTACT_EMAIL,
};

// Admin
export const ADMIN_EMAIL = 'admin@mavsthrift.com';

// Pagination
export const PRODUCTS_PER_PAGE = 12;
export const ORDERS_PER_PAGE = 10;

// Image Upload
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
