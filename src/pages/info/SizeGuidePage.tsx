const SizeGuidePage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Size Guide</h1>
        <div className="card p-8">
          <p className="mb-6">All measurements are provided for each product. Please refer to the measurements table on the product page.</p>
          <table className="w-full">
            <thead className="bg-secondary-100">
              <tr>
                <th className="p-3 text-left">Size</th>
                <th className="p-3 text-left">Chest (in)</th>
                <th className="p-3 text-left">Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3">XS</td><td className="p-3">34-36</td><td className="p-3">28-30</td></tr>
              <tr className="border-b"><td className="p-3">S</td><td className="p-3">36-38</td><td className="p-3">30-32</td></tr>
              <tr className="border-b"><td className="p-3">M</td><td className="p-3">38-40</td><td className="p-3">32-34</td></tr>
              <tr className="border-b"><td className="p-3">L</td><td className="p-3">40-42</td><td className="p-3">34-36</td></tr>
              <tr className="border-b"><td className="p-3">XL</td><td className="p-3">42-44</td><td className="p-3">36-38</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
