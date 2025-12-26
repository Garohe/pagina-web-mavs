import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { formatPrice, calculateCartSubtotal, calculateShipping, calculateTax } from '@/utils/helpers';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { items: products } = useAppSelector((state) => state.products);

  const subtotal = calculateCartSubtotal({ items }, products);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <ShoppingBag className="w-24 h-24 text-secondary-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Your Cart is Empty</h1>
        <p className="text-secondary-600 mb-8">Add some vintage pieces to get started!</p>
        <Link to="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;
            const variant = product.variants.find((v) => v.id === item.variantId);
            if (!variant) return null;

            return (
              <div key={`${item.productId}-${item.variantId}`} className="card p-4 flex space-x-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link to={`/product/${product.id}`} className="font-semibold text-secondary-900 hover:text-primary-600">
                    {product.name}
                  </Link>
                  <p className="text-sm text-secondary-600">
                    {variant.color} / {variant.size}
                  </p>
                  <p className="text-lg font-bold text-secondary-900 mt-2">
                    {formatPrice(variant.price)}
                  </p>

                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.productId, variantId: item.variantId, quantity: Math.max(1, item.quantity - 1) }))}
                        className="p-1 hover:bg-secondary-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-secondary-100 rounded">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.productId, variantId: item.variantId, quantity: item.quantity + 1 }))}
                        className="p-1 hover:bg-secondary-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart({ productId: item.productId, variantId: item.variantId }))}
                      className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-secondary-900">
                    {formatPrice(variant.price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-secondary-700">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-secondary-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-secondary-700">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-secondary-200 pt-3 flex justify-between text-lg font-bold text-secondary-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-primary w-full mb-4">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="btn btn-outline w-full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
