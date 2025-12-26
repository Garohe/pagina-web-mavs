const ConditionGuidePage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Condition Guide</h1>
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">New with Tags</h3>
            <p>Brand new, never worn, with original tags attached.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Like New</h3>
            <p>Excellent condition with no visible flaws. Gently used.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Good</h3>
            <p>Normal wear with minor signs of use. Still in great shape.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Fair</h3>
            <p>Visible wear but still functional. Perfect for casual use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionGuidePage;
