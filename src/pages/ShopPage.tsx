import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setFilters, setSortBy, clearFilters } from '@/store/slices/productsSlice';
import { ProductCategory, ProductSize, ProductCondition, SortOption } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ShopPage = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { filteredItems, loading, filters, sortBy } = useAppSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<ProductCondition[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      dispatch(setFilters({ ...filters, category: formattedCategory as ProductCategory }));
    } else {
      dispatch(clearFilters());
    }
  }, [category]);

  const handleApplyFilters = () => {
    dispatch(setFilters({
      category: category ? (category.charAt(0).toUpperCase() + category.slice(1)) as ProductCategory : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
      colors: selectedColors.length > 0 ? selectedColors : undefined,
      conditions: selectedConditions.length > 0 ? selectedConditions : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      search: searchQuery || undefined,
    }));
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedConditions([]);
    setSelectedBrands([]);
    setSearchQuery('');
    dispatch(clearFilters());
  };

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['Black', 'White', 'Navy', 'Blue', 'Red', 'Green', 'Brown', 'Gray'];
  const conditions: ProductCondition[] = ['New with Tags', 'Like New', 'Good', 'Fair'];
  const brands = ['Levi\'s', 'Champion', 'Nike', 'Adidas', 'Carhartt', 'Tommy Hilfiger', 'Ralph Lauren'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <p className="text-secondary-600 mt-1">{filteredItems.length} products found</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
            className="input w-48"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline lg:hidden"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 flex-shrink-0`}
        >
          <div className="card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
              <button
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Clear All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="input"
              />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-secondary-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (selectedSizes.includes(size)) {
                        setSelectedSizes(selectedSizes.filter((s) => s !== size));
                      } else {
                        setSelectedSizes([...selectedSizes, size]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition ${
                      selectedSizes.includes(size)
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:border-primary-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Color
              </label>
              <div className="space-y-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedColors([...selectedColors, color]);
                        } else {
                          setSelectedColors(selectedColors.filter((c) => c !== color));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span className="text-sm text-secondary-700">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Condition
              </label>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedConditions([...selectedConditions, condition]);
                        } else {
                          setSelectedConditions(selectedConditions.filter((c) => c !== condition));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span className="text-sm text-secondary-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Brand
              </label>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                        }
                      }}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                    />
                    <span className="text-sm text-secondary-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <button onClick={handleApplyFilters} className="btn btn-primary w-full">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <LoadingSpinner />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-secondary-600 mb-4">No products found</p>
              <button onClick={handleClearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
