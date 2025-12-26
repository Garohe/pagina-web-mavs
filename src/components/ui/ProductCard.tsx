import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getProductPrice, getConditionBadgeColor, getTotalStock, getStockBadge } from '@/utils/helpers';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { min, max, hasRange } = getProductPrice(product);
  const totalStock = getTotalStock(product);
  const stockBadge = getStockBadge(totalStock);

  return (
    <div className="card overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 space-y-2">
            {product.featured && (
              <span className="badge bg-primary-600 text-white px-2 py-1">
                Featured
              </span>
            )}
            <span className={`badge ${getConditionBadgeColor(product.condition)} px-2 py-1 block w-fit`}>
              {product.condition}
            </span>
          </div>

          {/* Stock Badge */}
          {totalStock <= 5 && (
            <div className="absolute top-3 right-3">
              <span className={`badge ${stockBadge.className} px-2 py-1`}>
                {stockBadge.text}
              </span>
            </div>
          )}

          {/* Sold Badge */}
          {product.soldAt && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-6 py-3 font-bold text-lg transform -rotate-12">
                SOLD OUT
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition">
              <Heart className="w-5 h-5 text-secondary-700" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition">
              <ShoppingCart className="w-5 h-5 text-secondary-700" />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-secondary-900 mb-1 hover:text-primary-600 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-secondary-600 mb-2">{product.brand}</p>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-secondary-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-secondary-600">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-secondary-900">
            {hasRange ? `${formatPrice(min)} - ${formatPrice(max)}` : formatPrice(min)}
          </span>
          {/* Discount badge */}
          <span className="badge bg-red-100 text-red-800 text-xs">
            20% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
