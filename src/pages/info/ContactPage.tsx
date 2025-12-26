const ContactPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Contact Us</h1>
        <div className="card p-8">
          <p className="mb-6 text-secondary-700">Have questions? We'd love to hear from you!</p>
          <div className="space-y-4">
            <p><strong>Email:</strong> support@mavsthrift.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
