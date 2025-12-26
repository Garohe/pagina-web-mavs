import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          Add New Product
        </Link>
      </div>
      <div className="card p-6 text-center text-secondary-600">
        <p>Product management table will be displayed here</p>
      </div>
    </div>
  );
};

export default AdminProductsPage;
