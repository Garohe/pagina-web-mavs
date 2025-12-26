const TermsPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <p className="text-secondary-600">Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By using Vintage Threads, you agree to these terms and conditions.</p>
          <h2>2. Use of Service</h2>
          <p>You must be at least 18 years old to make purchases on our website.</p>
          <h2>3. Product Descriptions</h2>
          <p>We strive to provide accurate product descriptions. All sales are final on correctly described items.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
