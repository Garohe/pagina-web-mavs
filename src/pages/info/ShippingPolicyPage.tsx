const ShippingPolicyPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Shipping Policy</h1>
        <div className="prose max-w-none">
          <h2>Shipping Methods</h2>
          <ul>
            <li><strong>Standard Shipping:</strong> 5-7 business days - $5.99</li>
            <li><strong>Express Shipping:</strong> 2-3 business days - $12.99</li>
            <li><strong>Overnight Shipping:</strong> 1 business day - $24.99</li>
          </ul>
          <h2>Free Shipping</h2>
          <p>Free standard shipping on orders over $75!</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
