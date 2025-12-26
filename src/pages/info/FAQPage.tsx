const FAQPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">How do I know the condition of items?</h3>
            <p className="text-secondary-700">Each item is graded using our condition guide: New with Tags, Like New, Good, or Fair.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">What is your return policy?</h3>
            <p className="text-secondary-700">We offer a 14-day return policy on unworn items with original tags.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
