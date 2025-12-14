'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  image_url: string;
  offers: Array<{
    id: string;
    marketplace: string;
    store_name: string;
    price: number;
  }>;
  links: Array<{
    id: string;
    short_code: string;
    target_url: string;
  }>;
}

interface Campaign {
  id: string;
  name: string;
  start_at: string;
  end_at: string;
  products: Product[];
}

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params.id as string;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!campaignId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns/${campaignId}`);
        const campaignData = await res.json();

        setCampaign(campaignData);
        setProducts(campaignData.products || []);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
      }
    };

    fetchData();
  }, [campaignId]);

  const getBestPrice = (offers: Product['offers']) => {
    if (!offers?.length) return null;
    return offers.reduce((best, offer) =>
      offer.price < best.price ? offer : best
    );
  };

  const getAffiliateLink = (product: Product) => {
    const link = product.links?.[0]; // Get first link for this product
    return link ? `${process.env.NEXT_PUBLIC_API_URL}/go/${link.short_code}` : '#';
  };

  if (!campaign) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{campaign.name}</h1>
          <p className="text-lg text-gray-600">
            Compare prices and find the best deals from Lazada & Shopee
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const bestPrice = getBestPrice(product.offers);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-64 object-none"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {product.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {product.offers?.map((offer) => (
                      <div key={offer.id} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500 capitalize">
                            {offer.marketplace}
                          </span>
                          <div className="text-xs text-gray-400">{offer.store_name}</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${bestPrice?.id === offer.id ? 'text-green-600' : 'text-gray-900'
                            }`}>
                            ${offer.price}
                          </span>
                          {bestPrice?.id === offer.id && (
                            <div className="text-xs text-green-600 font-medium">Best Price</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {
                      product.links?.map((link) => {
                        const hostname = new URL(link.target_url).hostname

                        const platform =
                          hostname.includes('lazada')
                            ? 'Lazada'
                            : hostname.includes('shopee')
                              ? 'Shopee'
                              : 'Marketplace'

                        return (
                          <a
                            key={link.id}
                            href={`/go/${link.short_code}`}
                            className="block w-full py-2 px-4 rounded-md text-center font-medium transition-colors bg-orange-600 hover:bg-orange-700 text-white"
                            target='_'
                          >
                            Buy on {platform}
                          </a>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}