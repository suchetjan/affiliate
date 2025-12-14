'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  clicksByProduct: Array<{
    product_id: string;
    product_title: string;
    clicks: string;
  }>;
  clicksByCampaign: Array<{
    campaign_id: string;
    campaign_name: string;
    clicks: string;
  }>;
  topProducts: Array<{
    product_id: string;
    product_title: string;
    clicks: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/dashboard');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);



  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Clicks by Product</h2>
          <div className="space-y-2">
            {stats.clicksByProduct.map((item) => (
              <div key={item.product_id} className="flex justify-between items-center">
                <span className="text-gray-600 truncate">{item.product_title}</span>
                <span className="font-semibold">{item.clicks}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Clicks by Campaign</h2>
          <div className="space-y-2">
            {stats.clicksByCampaign.map((item) => (
              <div key={item.campaign_id} className="flex justify-between items-center">
                <span className="text-gray-600">{item.campaign_name}</span>
                <span className="font-semibold">{item.clicks}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <div className="space-y-2">
            {stats.topProducts.map((item, index) => (
              <div key={item.product_id} className="flex justify-between items-center">
                <span className="text-gray-600 truncate">
                  #{index + 1} {item.product_title}
                </span>
                <span className="font-semibold">{item.clicks}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}