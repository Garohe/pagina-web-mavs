import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mavs Thrift</h3>
            <p className="text-secondary-300 text-sm mb-4">
              Premium vintage clothing and accessories. Each piece is carefully curated to bring you unique, sustainable fashion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-secondary-300 hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop/jackets" className="text-secondary-300 hover:text-white transition">
                  Jackets
                </Link>
              </li>
              <li>
                <Link to="/shop/jeans" className="text-secondary-300 hover:text-white transition">
                  Jeans
                </Link>
              </li>
              <li>
                <Link to="/shop/hoodies" className="text-secondary-300 hover:text-white transition">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="text-secondary-300 hover:text-white transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-secondary-300 hover:text-white transition">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/condition-guide" className="text-secondary-300 hover:text-white transition">
                  Condition Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-secondary-300 hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-secondary-300 hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-secondary-300 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-secondary-800 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="btn btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 Mavs Thrift. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/terms" className="text-secondary-400 hover:text-white transition">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-secondary-400 hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
