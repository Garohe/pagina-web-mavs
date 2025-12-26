import { supabase } from '@/lib/supabase';
import type { Order, OrderStatus } from '@/types';

export const ordersService = {
  // Create order
  async createOrder(orderData: any): Promise<Order> {
    const orderNumber = `MT${Date.now().toString().slice(-8)}`;

    // 1. Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: orderData.userId,
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        tax: orderData.tax,
        discount: orderData.discount || 0,
        total: orderData.total,
        status: 'pending',
        payment_method: orderData.paymentMethod,
        payment_intent_id: orderData.paymentIntentId,
        shipping_method: orderData.shippingMethod,
        estimated_delivery: orderData.estimatedDelivery,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create order items
    const orderItems = orderData.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      variant_id: item.variantId,
      product_name: item.productName,
      product_image: item.productImage,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 3. Create shipping address
    const { error: addressError } = await supabase
      .from('order_shipping_addresses')
      .insert({
        order_id: order.id,
        first_name: orderData.shippingAddress.firstName,
        last_name: orderData.shippingAddress.lastName,
        address: orderData.shippingAddress.address,
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.state,
        zip_code: orderData.shippingAddress.zipCode,
        country: orderData.shippingAddress.country,
        phone: orderData.shippingAddress.phone,
      });

    if (addressError) throw addressError;

    // 4. Create initial event
    const { error: eventError } = await supabase
      .from('order_events')
      .insert({
        order_id: order.id,
        status: 'pending',
        message: 'Order placed successfully',
      });

    if (eventError) throw eventError;

    // 5. Update product stock
    for (const item of orderData.items) {
      const { data: variant } = await supabase
        .from('product_variants')
        .select('quantity')
        .eq('id', item.variantId)
        .single();

      if (variant) {
        await supabase
          .from('product_variants')
          .update({ quantity: Math.max(0, variant.quantity - item.quantity) })
          .eq('id', item.variantId);
      }
    }

    // Return the created order
    return this.getOrderById(order.id);
  },

  // Get order by ID
  async getOrderById(id: string): Promise<Order> {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        shipping_address:order_shipping_addresses(*),
        events:order_events(*)
      `)
      .eq('id', id)
      .single();

    if (orderError) throw orderError;
    if (!order) throw new Error('Order not found');

    return {
      id: order.id,
      orderNumber: order.order_number,
      userId: order.user_id,
      items: (order.items || []).map((item: any) => ({
        productId: item.product_id,
        variantId: item.variant_id,
        productName: item.product_name,
        productImage: item.product_image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: parseFloat(item.price),
      })),
      subtotal: parseFloat(order.subtotal),
      shipping: parseFloat(order.shipping),
      tax: parseFloat(order.tax),
      discount: parseFloat(order.discount),
      total: parseFloat(order.total),
      shippingAddress: order.shipping_address ? {
        id: order.shipping_address.id,
        firstName: order.shipping_address.first_name,
        lastName: order.shipping_address.last_name,
        address: order.shipping_address.address,
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        zipCode: order.shipping_address.zip_code,
        country: order.shipping_address.country,
        phone: order.shipping_address.phone,
      } : {} as any,
      shippingMethod: order.shipping_method,
      paymentMethod: order.payment_method,
      status: order.status,
      trackingNumber: order.tracking_number,
      carrier: order.carrier,
      estimatedDelivery: order.estimated_delivery,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      events: (order.events || []).map((event: any) => ({
        status: event.status,
        message: event.message,
        timestamp: event.created_at,
      })),
    };
  },

  // Get orders by user
  async getOrdersByUser(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        shipping_address:order_shipping_addresses(*),
        events:order_events(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      userId: order.user_id,
      items: (order.items || []).map((item: any) => ({
        productId: item.product_id,
        variantId: item.variant_id,
        productName: item.product_name,
        productImage: item.product_image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: parseFloat(item.price),
      })),
      subtotal: parseFloat(order.subtotal),
      shipping: parseFloat(order.shipping),
      tax: parseFloat(order.tax),
      discount: parseFloat(order.discount),
      total: parseFloat(order.total),
      shippingAddress: order.shipping_address ? {
        id: order.shipping_address.id,
        firstName: order.shipping_address.first_name,
        lastName: order.shipping_address.last_name,
        address: order.shipping_address.address,
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        zipCode: order.shipping_address.zip_code,
        country: order.shipping_address.country,
        phone: order.shipping_address.phone,
      } : {} as any,
      shippingMethod: order.shipping_method,
      paymentMethod: order.payment_method,
      status: order.status,
      trackingNumber: order.tracking_number,
      carrier: order.carrier,
      estimatedDelivery: order.estimated_delivery,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      events: (order.events || []).map((event: any) => ({
        status: event.status,
        message: event.message,
        timestamp: event.created_at,
      })),
    }));
  },

  // Get all orders (Admin only)
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        shipping_address:order_shipping_addresses(*),
        events:order_events(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(order => ({
      id: order.id,
      orderNumber: order.order_number,
      userId: order.user_id,
      items: (order.items || []).map((item: any) => ({
        productId: item.product_id,
        variantId: item.variant_id,
        productName: item.product_name,
        productImage: item.product_image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: parseFloat(item.price),
      })),
      subtotal: parseFloat(order.subtotal),
      shipping: parseFloat(order.shipping),
      tax: parseFloat(order.tax),
      discount: parseFloat(order.discount),
      total: parseFloat(order.total),
      shippingAddress: order.shipping_address ? {
        id: order.shipping_address.id,
        firstName: order.shipping_address.first_name,
        lastName: order.shipping_address.last_name,
        address: order.shipping_address.address,
        city: order.shipping_address.city,
        state: order.shipping_address.state,
        zipCode: order.shipping_address.zip_code,
        country: order.shipping_address.country,
        phone: order.shipping_address.phone,
      } : {} as any,
      shippingMethod: order.shipping_method,
      paymentMethod: order.payment_method,
      status: order.status,
      trackingNumber: order.tracking_number,
      carrier: order.carrier,
      estimatedDelivery: order.estimated_delivery,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      events: (order.events || []).map((event: any) => ({
        status: event.status,
        message: event.message,
        timestamp: event.created_at,
      })),
    }));
  },

  // Update order status (Admin only)
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ): Promise<Order> {
    const updates: any = { status };
    if (trackingNumber) updates.tracking_number = trackingNumber;
    if (carrier) updates.carrier = carrier;

    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);

    if (error) throw error;

    // Add event
    const statusMessages: Record<OrderStatus, string> = {
      pending: 'Order is pending confirmation',
      confirmed: 'Order has been confirmed',
      processing: 'Order is being processed',
      shipped: 'Order has been shipped',
      delivered: 'Order has been delivered',
      cancelled: 'Order has been cancelled',
      refunded: 'Order has been refunded',
    };

    await supabase
      .from('order_events')
      .insert({
        order_id: orderId,
        status,
        message: statusMessages[status],
      });

    return this.getOrderById(orderId);
  },
};
