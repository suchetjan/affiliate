'use client';

import { useState, useEffect } from 'react';

interface Link {
  id: string;
  short_code: string;
  target_url: string;
  product: { id: string; title: string };
  campaign: { id: string; name: string };
}

interface Product {
  id: string;
  title: string;
}

interface Campaign {
  id: string;
  name: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [formData, setFormData] = useState({
    product_id: '',
    campaign_id: '',
    target_url: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [linksRes, productsRes, campaignsRes] = await Promise.all([
          fetch(process.env.NEXT_PUBLIC_API_URL + '/api/links'),
          fetch(process.env.NEXT_PUBLIC_API_URL + '/api/products'),
          fetch(process.env.NEXT_PUBLIC_API_URL + '/api/campaigns')
        ]);
        
        const [linksData, productsData, campaignsData] = await Promise.all([
          linksRes.json(),
          productsRes.json(),
          campaignsRes.json()
        ]);
        
        setLinks(linksData);
        setProducts(productsData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    
    fetchData();
  }, []);

  const createLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ product_id: '', campaign_id: '', target_url: '' });
        const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/links').then(r => r.json());
        setLinks(data);
      }
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  };

  const handleCopy = (shortCode: string) => {
    const shortUrl = `${window.location.origin}/go/${shortCode}`;
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert('Short URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Affiliate Links</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Generate Link</h2>
        <form onSubmit={createLink} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.product_id}
            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          <select
            value={formData.campaign_id}
            onChange={(e) => setFormData({ ...formData, campaign_id: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Campaign</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
          <input
            type="url"
            value={formData.target_url}
            onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
            placeholder="Target URL"
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="md:col-span-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Generate Link
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">COPY</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {link.short_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {link.product.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {link.campaign.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <button onClick={() => handleCopy(link.short_code)} className="px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50">COPY</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}