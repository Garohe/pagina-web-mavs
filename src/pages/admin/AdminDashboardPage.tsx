const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <p className="text-sm text-secondary-600 mb-2">Total Sales</p>
          <p className="text-3xl font-bold text-secondary-900">$12,450</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-secondary-600 mb-2">Total Orders</p>
          <p className="text-3xl font-bold text-secondary-900">145</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-secondary-600 mb-2">Products</p>
          <p className="text-3xl font-bold text-secondary-900">25</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-secondary-600 mb-2">Customers</p>
          <p className="text-3xl font-bold text-secondary-900">89</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
