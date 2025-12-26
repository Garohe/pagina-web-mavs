import { Product, Order, OrderStatus, Coupon } from '@/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Load products from localStorage or return empty array
const loadProducts = (): Product[] => {
  try {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  } catch {
    return [];
  }
};

// Save products to localStorage
const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Load orders from localStorage
const loadOrders = (): Order[] => {
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
};

// Save orders to localStorage
const saveOrders = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

// Load coupons from localStorage
const loadCoupons = (): Coupon[] => {
  try {
    const coupons = localStorage.getItem('coupons');
    return coupons ? JSON.parse(coupons) : [];
  } catch {
    return [];
  }
};

export const mockApi = {
  // Products
  async getProducts(): Promise<Product[]> {
    await delay(500);
    return loadProducts();
  },

  async getProductById(id: string): Promise<Product> {
    await delay(300);
    const products = loadProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Promise<Product> {
    await delay(500);
    const products = loadProducts();
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay(500);
    const products = loadProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(300);
    const products = loadProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
  },

  // Orders
  async getOrders(userId: string): Promise<Order[]> {
    await delay(500);
    const orders = loadOrders();
    return orders.filter(o => o.userId === userId).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getAllOrders(): Promise<Order[]> {
    await delay(500);
    const orders = loadOrders();
    return orders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getOrderById(id: string): Promise<Order> {
    await delay(300);
    const orders = loadOrders();
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  async createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'events'>): Promise<Order> {
    await delay(1000);
    const orders = loadOrders();
    const orderNumber = `VT${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      events: [
        {
          status: 'pending',
          message: 'Order placed successfully',
          timestamp: new Date().toISOString(),
        },
      ],
    };
    orders.push(newOrder);
    saveOrders(orders);

    // Update product stock
    const products = loadProducts();
    orderData.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const variant = product.variants.find(v => v.id === item.variantId);
        if (variant) {
          variant.quantity = Math.max(0, variant.quantity - item.quantity);
          if (variant.quantity === 0) {
            product.soldAt = new Date().toISOString();
          }
        }
      }
    });
    saveProducts(products);

    return newOrder;
  },

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ): Promise<Order> {
    await delay(500);
    const orders = loadOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) {
      throw new Error('Order not found');
    }

    const statusMessages: Record<OrderStatus, string> = {
      pending: 'Order is pending confirmation',
      confirmed: 'Order has been confirmed',
      processing: 'Order is being processed',
      shipped: 'Order has been shipped',
      delivered: 'Order has been delivered',
      cancelled: 'Order has been cancelled',
      refunded: 'Order has been refunded',
    };

    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    if (trackingNumber) orders[index].trackingNumber = trackingNumber;
    if (carrier) orders[index].carrier = carrier;

    orders[index].events.push({
      status,
      message: statusMessages[status],
      timestamp: new Date().toISOString(),
    });

    saveOrders(orders);
    return orders[index];
  },

  // Coupons
  async validateCoupon(code: string, subtotal: number): Promise<Coupon | null> {
    await delay(500);
    const coupons = loadCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) return null;
    if (!coupon.active) return null;
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return null;
    if (coupon.minPurchase && subtotal < coupon.minPurchase) return null;

    return coupon;
  },
};
