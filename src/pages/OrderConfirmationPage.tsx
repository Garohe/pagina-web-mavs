import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
  return (
    <div className="container-custom py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Order Confirmed!</h1>
        <p className="text-secondary-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <Link to="/orders" className="btn btn-primary w-full block">
            View My Orders
          </Link>
          <Link to="/shop" className="btn btn-outline w-full block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
