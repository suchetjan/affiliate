'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  image_url: string;
  offers: Array<{
    id: string;
    marketplace: string;
    store_name: string;
    price: number;
    last_checked_at: string;
  }>;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    title: '', 
    image_url: '', 
    offers: [{ platform: 'lazada', url: '' }] 
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ title: '', image_url: '', offers: [{ platform: 'lazada', url: '' }] });
        const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/products').then(r => r.json());
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={addProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Product Title"
              className="px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="Image URL"
              className="px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Marketplace Offers</h3>
            {formData.offers.map((offer, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <select
                  value={offer.platform}
                  onChange={(e) => {
                    const newOffers = [...formData.offers];
                    newOffers[index].platform = e.target.value;
                    setFormData({ ...formData, offers: newOffers });
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="lazada">Lazada</option>
                  <option value="shopee">Shopee</option>
                </select>
                <input
                  type="url"
                  value={offer.url}
                  onChange={(e) => {
                    const newOffers = [...formData.offers];
                    newOffers[index].url = e.target.value;
                    setFormData({ ...formData, offers: newOffers });
                  }}
                  placeholder="Marketplace URL"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    const newOffers = formData.offers.filter((_, i) => i !== index);
                    setFormData({ ...formData, offers: newOffers });
                  }}
                  className="px-3 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData({ 
                  ...formData, 
                  offers: [...formData.offers, { platform: 'lazada', url: '' }] 
                });
              }}
              className="px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
            >
              Add Offer
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img src={product.image_url} alt={product.title} className="w-full h-48 object-none" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
              <div className="space-y-2">
                {product.offers?.map((offer) => {
                  const bestPrice = product.offers.reduce((best, o) => o.price < best.price ? o : best);
                  const isBest = offer.id === bestPrice.id;
                  return (
                    <div key={offer.id} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-600 capitalize">{offer.marketplace}</span>
                        <div className="text-xs text-gray-400">{offer.store_name}</div>
                        <div className="text-xs text-gray-400">{offer.last_checked_at}</div>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${isBest ? 'text-green-600' : 'text-gray-900'}`}>
                          ${offer.price}
                        </span>
                        {isBest && <div className="text-xs text-green-600 font-medium">Best Price</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}