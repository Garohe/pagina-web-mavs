import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { closeCart } from '@/store/slices/uiSlice';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { formatPrice, getReservationTimeLeft, formatTimeLeft } from '@/utils/helpers';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const { isCartOpen } = useAppSelector((state) => state.ui);
  const { items } = useAppSelector((state) => state.cart);
  const { items: products } = useAppSelector((state) => state.products);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!isCartOpen || items.length === 0) return;

    const interval = setInterval(() => {
      const newTimeLeft: { [key: string]: number } = {};
      items.forEach((item) => {
        newTimeLeft[`${item.productId}-${item.variantId}`] = getReservationTimeLeft(item.reservedAt);
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCartOpen, items]);

  const handleUpdateQuantity = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, variantId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string, variantId: string) => {
    dispatch(removeFromCart({ productId, variantId }));
  };

  const subtotal = items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (!variant) return total;
    return total + variant.price * item.quantity;
  }, 0);

  const freeShippingThreshold = 75;
  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={() => dispatch(closeCart())}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-secondary-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-secondary-900">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-secondary-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="p-4 bg-primary-50 border-b border-primary-100">
            <div className="mb-2">
              {amountUntilFreeShipping > 0 ? (
                <p className="text-sm text-secondary-700">
                  Add <span className="font-bold text-primary-600">{formatPrice(amountUntilFreeShipping)}</span> more for free shipping!
                </p>
              ) : (
                <p className="text-sm font-medium text-primary-600">
                  You qualify for free shipping!
                </p>
              )}
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-secondary-300 mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">Your cart is empty</h3>
              <p className="text-secondary-600 mb-6">Add some vintage pieces to get started!</p>
              <Link
                to="/shop"
                onClick={() => dispatch(closeCart())}
                className="btn btn-primary"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                const variant = product.variants.find((v) => v.id === item.variantId);
                if (!variant) return null;

                const itemTimeLeft = timeLeft[`${item.productId}-${item.variantId}`] || 0;

                return (
                  <div key={`${item.productId}-${item.variantId}`} className="flex space-x-4 border-b border-secondary-200 pb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => dispatch(closeCart())}
                        className="font-medium text-secondary-900 hover:text-primary-600 transition"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-secondary-600">
                        {variant.color} / {variant.size}
                      </p>
                      <p className="text-sm font-medium text-secondary-900 mt-1">
                        {formatPrice(variant.price)}
                      </p>

                      {/* Timer */}
                      {itemTimeLeft > 0 && (
                        <p className="text-xs text-orange-600 mt-1">
                          Reserved: {formatTimeLeft(itemTimeLeft)}
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 hover:bg-secondary-100 rounded transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 bg-secondary-100 rounded">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="p-1 hover:bg-secondary-100 rounded transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemove(item.productId, item.variantId)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-secondary-200 bg-secondary-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-secondary-900">Subtotal</span>
              <span className="text-2xl font-bold text-secondary-900">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-secondary-600 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <Link
              to="/cart"
              onClick={() => dispatch(closeCart())}
              className="btn btn-secondary w-full mb-2"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={() => dispatch(closeCart())}
              className="btn btn-primary w-full"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
