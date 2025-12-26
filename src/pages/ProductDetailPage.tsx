import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Package, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchProductById } from '@/store/slices/productsSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { openCart } from '@/store/slices/uiSlice';
import { formatPrice, getConditionBadgeColor, getAvailableColors, getAvailableSizes, getVariant } from '@/utils/helpers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductCard from '@/components/ui/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: products, loading } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'size' | 'shipping' | 'reviews'>('description');

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (id && !product) {
      dispatch(fetchProductById(id));
    }
  }, [id, product, dispatch]);

  useEffect(() => {
    if (product) {
      const colors = getAvailableColors(product);
      if (colors.length > 0 && !selectedColor) {
        setSelectedColor(colors[0]);
      }
      if (selectedColor) {
        const sizes = getAvailableSizes(product, selectedColor);
        if (sizes.length > 0 && !selectedSize) {
          setSelectedSize(sizes[0]);
        }
      }
    }
  }, [product, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error('Please select color and size');
      return;
    }

    const variant = getVariant(product!, selectedColor, selectedSize);
    if (!variant) {
      toast.error('Selected variant not available');
      return;
    }

    if (variant.quantity < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    dispatch(addToCart({
      productId: product!.id,
      variantId: variant.id,
      quantity,
    }));

    toast.success('Added to cart!');
    dispatch(openCart());
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading || !product) {
    return (
      <div className="container-custom py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const colors = getAvailableColors(product);
  const sizes = getAvailableSizes(product, selectedColor);
  const selectedVariant = getVariant(product, selectedColor, selectedSize);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className={`badge ${getConditionBadgeColor(product.condition)} px-3 py-1`}>
              {product.condition}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
            {product.name}
          </h1>

          <p className="text-lg text-secondary-600 mb-4">{product.brand}</p>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-secondary-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-secondary-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-secondary-900">
                {selectedVariant ? formatPrice(selectedVariant.price) : formatPrice(product.variants[0].price)}
              </span>
              <span className="text-2xl text-secondary-400 line-through">
                {selectedVariant ? formatPrice(selectedVariant.price * 1.25) : formatPrice(product.variants[0].price * 1.25)}
              </span>
              <span className="badge bg-red-100 text-red-800">20% OFF</span>
            </div>
          </div>

          {/* Stock Status */}
          {selectedVariant && (
            <div className="mb-6">
              {selectedVariant.quantity === 0 ? (
                <span className="badge badge-danger">Sold Out</span>
              ) : selectedVariant.quantity <= 2 ? (
                <span className="badge badge-warning">Only {selectedVariant.quantity} left!</span>
              ) : (
                <span className="badge badge-success">In Stock</span>
              )}
            </div>
          )}

          {/* Color Selection */}
          {colors.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Color: <span className="font-bold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize('');
                    }}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:border-primary-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Size: <span className="font-bold">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:border-primary-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-secondary-300 rounded-lg hover:bg-secondary-100 transition"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-secondary-300 rounded-lg hover:bg-secondary-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button onClick={handleAddToCart} className="btn btn-primary flex-1 flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="btn btn-outline p-3">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <button onClick={handleBuyNow} className="btn btn-secondary w-full mb-8">
            Buy Now
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-secondary-700">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-secondary-700">Easy Returns</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-secondary-700">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-sm text-secondary-700">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className="border-b border-secondary-200 mb-6">
          <div className="flex space-x-8">
            {['description', 'size', 'shipping', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-4 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="prose max-w-none">
          {activeTab === 'description' && (
            <div>
              <p className="text-secondary-700">{product.description}</p>
              <h3 className="mt-6 mb-3">Material & Care</h3>
              <p className="text-secondary-700">{product.material}</p>
              <p className="text-secondary-700 mt-2">{product.careInstructions}</p>
            </div>
          )}

          {activeTab === 'size' && (
            <div>
              <h3 className="mb-4">Measurements</h3>
              <table className="w-full">
                <tbody>
                  {Object.entries(product.measurements).map(([key, value]) => (
                    <tr key={key} className="border-b border-secondary-200">
                      <td className="py-2 font-medium capitalize">{key}</td>
                      <td className="py-2">{value}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div>
              <h3 className="mb-4">Shipping & Returns</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Free shipping on orders over $75</li>
                <li>Standard shipping: 5-7 business days</li>
                <li>Express shipping available</li>
                <li>14-day return policy</li>
                <li>Items must be unworn with tags attached</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <p className="text-secondary-600">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
