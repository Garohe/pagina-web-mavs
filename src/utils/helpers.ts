import { Product, ProductVariant, Cart, Coupon } from '@/types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const getProductPrice = (product: Product): { min: number; max: number; hasRange: boolean } => {
  const prices = product.variants.map(v => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return {
    min,
    max,
    hasRange: min !== max,
  };
};

export const getProductOriginalPrice = (product: Product): { min: number; max: number; hasRange: boolean } | null => {
  // Check if any variant has a higher "original" price (we'll calculate a 20% markup for display)
  const prices = product.variants.map(v => v.price * 1.25); // Simulating 20% discount
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return {
    min,
    max,
    hasRange: min !== max,
  };
};

export const getProductDiscount = (): number => {
  return 20; // 20% discount for display
};

export const getAvailableColors = (product: Product): string[] => {
  return [...new Set(product.variants.map(v => v.color))];
};

export const getAvailableSizes = (product: Product, selectedColor?: string): string[] => {
  let variants = product.variants;
  if (selectedColor) {
    variants = variants.filter(v => v.color === selectedColor);
  }
  return [...new Set(variants.map(v => v.size))];
};

export const getVariant = (
  product: Product,
  color?: string,
  size?: string
): ProductVariant | undefined => {
  return product.variants.find(v =>
    (!color || v.color === color) && (!size || v.size === size)
  );
};

export const isProductInStock = (product: Product): boolean => {
  return product.variants.some(v => v.quantity > 0);
};

export const getTotalStock = (product: Product): number => {
  return product.variants.reduce((sum, v) => sum + v.quantity, 0);
};

export const getVariantStock = (variant: ProductVariant): number => {
  return variant.quantity;
};

export const getStockBadge = (stock: number): { text: string; className: string } => {
  if (stock === 0) {
    return { text: 'SOLD OUT', className: 'badge-danger' };
  }
  if (stock === 1) {
    return { text: 'Only 1 left', className: 'badge-warning' };
  }
  if (stock <= 5) {
    return { text: `Only ${stock} left`, className: 'badge-warning' };
  }
  if (stock <= 20) {
    return { text: 'Low stock', className: 'badge-info' };
  }
  return { text: 'In stock', className: 'badge-success' };
};

export const calculateCartSubtotal = (cart: Cart, products: Product[]): number => {
  return cart.items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    const variant = product.variants.find(v => v.id === item.variantId);
    if (!variant) return total;
    return total + variant.price * item.quantity;
  }, 0);
};

export const calculateDiscount = (subtotal: number, coupon?: Coupon): number => {
  if (!coupon) return 0;
  if (coupon.discountType === 'percentage') {
    return subtotal * (coupon.discountValue / 100);
  }
  return coupon.discountValue;
};

export const calculateShipping = (subtotal: number, freeShippingThreshold = 75): number => {
  if (subtotal >= freeShippingThreshold) return 0;
  return 5.99;
};

export const calculateTax = (subtotal: number, taxRate = 0.08): number => {
  return subtotal * taxRate;
};

export const getReservationTimeLeft = (reservedAt: string): number => {
  const RESERVATION_TIME = 15 * 60 * 1000; // 15 minutes
  const reservedTime = new Date(reservedAt).getTime();
  const now = Date.now();
  const timeLeft = RESERVATION_TIME - (now - reservedTime);
  return Math.max(0, timeLeft);
};

export const formatTimeLeft = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const getConditionBadgeColor = (condition: string): string => {
  switch (condition) {
    case 'New with Tags':
      return 'bg-green-100 text-green-800';
    case 'Like New':
      return 'bg-blue-100 text-blue-800';
    case 'Good':
      return 'bg-yellow-100 text-yellow-800';
    case 'Fair':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-secondary-100 text-secondary-800';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateOrderNumber = (): string => {
  return `VT${Date.now().toString().slice(-8)}`;
};

export const getShippingCost = (method: string): number => {
  switch (method) {
    case 'standard':
      return 5.99;
    case 'express':
      return 12.99;
    case 'overnight':
      return 24.99;
    default:
      return 5.99;
  }
};

export const getEstimatedDelivery = (method: string): string => {
  const now = new Date();
  let days = 5;

  switch (method) {
    case 'standard':
      days = 5;
      break;
    case 'express':
      days = 2;
      break;
    case 'overnight':
      days = 1;
      break;
  }

  const deliveryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};
