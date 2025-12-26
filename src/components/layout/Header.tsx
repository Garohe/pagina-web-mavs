import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleMobileMenu, closeMobileMenu, openCart } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

const categories = [
  'Hoodies',
  'Jeans',
  'T-Shirts',
  'Jackets',
  'Pants',
  'Shorts',
  'Activewear',
  'Accessories',
];

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-primary-600 text-white text-center py-2 text-sm">
        Free shipping on orders over $75 | Use code WELCOME10 for 10% off
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-secondary-900">
              Mavs <span className="text-primary-600">Thrift</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-secondary-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link to="/shop" className="text-secondary-700 hover:text-primary-600 transition">
              Shop All
            </Link>
            <div className="relative group">
              <button className="text-secondary-700 hover:text-primary-600 transition">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/shop/${category.toLowerCase()}`}
                    className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" className="text-secondary-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link to="/contact" className="text-secondary-700 hover:text-primary-600 transition">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 hover:bg-secondary-100 rounded-full transition hidden md:block">
              <Search className="w-5 h-5 text-secondary-700" />
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 hover:bg-secondary-100 rounded-full transition">
                  <User className="w-5 h-5 text-secondary-700" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-secondary-200">
                    <p className="text-sm font-medium text-secondary-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-secondary-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition"
                  >
                    My Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 hover:bg-secondary-100 rounded-full transition"
              >
                <User className="w-5 h-5 text-secondary-700" />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="p-2 hover:bg-secondary-100 rounded-full transition relative"
            >
              <ShoppingCart className="w-5 h-5 text-secondary-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 hover:bg-secondary-100 rounded-full transition lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-secondary-700" />
              ) : (
                <Menu className="w-6 h-6 text-secondary-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-secondary-200 pt-4">
            <Link
              to="/"
              onClick={() => dispatch(closeMobileMenu())}
              className="block py-2 text-secondary-700 hover:text-primary-600 transition"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => dispatch(closeMobileMenu())}
              className="block py-2 text-secondary-700 hover:text-primary-600 transition"
            >
              Shop All
            </Link>
            <div className="py-2">
              <p className="font-medium text-secondary-900 mb-2">Categories</p>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/shop/${category.toLowerCase()}`}
                    onClick={() => dispatch(closeMobileMenu())}
                    className="block py-1 text-secondary-600 hover:text-primary-600 transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/about"
              onClick={() => dispatch(closeMobileMenu())}
              className="block py-2 text-secondary-700 hover:text-primary-600 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => dispatch(closeMobileMenu())}
              className="block py-2 text-secondary-700 hover:text-primary-600 transition"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
