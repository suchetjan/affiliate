'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Campaign {
  id: string;
  name: string;
  utm_campaign: string;
  start_at: string;
  end_at: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    utm_campaign: '',
    start_at: '',
    end_at: '',
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/campaigns');
        const data = await res.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    };
    
    fetchCampaigns();
  }, []);

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', utm_campaign: '', start_at: '', end_at: '' });
        const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/campaigns').then(r => r.json());
        setCampaigns(data);
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Campaigns</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>
        <form onSubmit={createCampaign} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Campaign Name"
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            value={formData.utm_campaign}
            onChange={(e) => setFormData({ ...formData, utm_campaign: e.target.value })}
            placeholder="UTM Campaign"
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            value={formData.start_at}
            onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            value={formData.end_at}
            onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Campaign
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UTM Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  <Link href={`/campaign/${campaign.id}`}>{campaign.name}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {campaign.utm_campaign}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(campaign.start_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(campaign.end_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}