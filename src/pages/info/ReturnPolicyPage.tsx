const ReturnPolicyPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Return & Refund Policy</h1>
        <div className="prose max-w-none">
          <h2>14-Day Return Policy</h2>
          <p>We accept returns within 14 days of delivery for unworn items with tags attached.</p>
          <h2>How to Return</h2>
          <ol>
            <li>Contact our support team</li>
            <li>Pack the item securely</li>
            <li>Ship it back using our prepaid label</li>
          </ol>
          <h2>Refunds</h2>
          <p>Refunds are processed within 5-7 business days after we receive your return.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
