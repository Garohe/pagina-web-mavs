import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Package, Truck, Shield } from 'lucide-react';
import { useAppSelector } from '@/store';
import ProductCard from '@/components/ui/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600',
    title: 'Vintage Jackets Collection',
    subtitle: 'Curated 90s denim & leather jackets',
    cta: 'Shop Jackets',
    link: '/shop/jackets',
  },
  {
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1600',
    title: 'Premium Vintage Jeans',
    subtitle: 'Levi\'s, Wrangler & more',
    cta: 'Shop Jeans',
    link: '/shop/jeans',
  },
  {
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600',
    title: 'Classic Hoodies',
    subtitle: 'Champion, Nike, Adidas',
    cta: 'Shop Hoodies',
    link: '/shop/hoodies',
  },
];

const categories = [
  { name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', link: '/shop/jackets' },
  { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', link: '/shop/jeans' },
  { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600', link: '/shop/hoodies' },
  { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', link: '/shop/t-shirts' },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { items: products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const featuredProducts = products.filter((p) => p.featured && !p.soldAt).slice(0, 4);
  const newArrivals = products.filter((p) => !p.soldAt).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);
  const recentlySold = products.filter((p) => p.soldAt).slice(0, 4);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6 text-secondary-900" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6 text-secondary-900" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-secondary-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Free Shipping</h3>
                <p className="text-sm text-secondary-600">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Easy Returns</h3>
                <p className="text-sm text-secondary-600">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Secure Checkout</h3>
                <p className="text-sm text-secondary-600">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <ShoppingBag className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Unique Pieces</h3>
                <p className="text-sm text-secondary-600">Curated vintage items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Hand-picked vintage pieces that stand out from the crowd
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/shop" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Explore our carefully curated categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-xl aspect-square shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Fresh vintage finds added this week
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Recently Sold */}
      {recentlySold.length > 0 && (
        <section className="bg-secondary-50 py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Recently Sold
              </h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                These unique pieces found their new homes
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlySold.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Get notified about new arrivals, exclusive deals, and vintage fashion tips
          </p>
          <form className="max-w-md mx-auto flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-secondary-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
