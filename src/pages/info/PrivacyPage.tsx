const PrivacyPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-secondary-600">Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide when creating an account, placing orders, and contacting us.</p>
          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to process orders, improve our service, and communicate with you.</p>
          <h2>3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information.</p>
          <h2>4. Contact Us</h2>
          <p>For privacy concerns, email us at privacy@mavsthrift.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
