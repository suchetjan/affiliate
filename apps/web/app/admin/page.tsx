import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/products" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Products</h3>
          <p className="text-gray-600">Add and manage products from Lazada & Shopee</p>
        </Link>
        <Link href="/admin/campaigns" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Campaigns</h3>
          <p className="text-gray-600">Create marketing campaigns with UTM tracking</p>
        </Link>
        <Link href="/admin/offers" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Offers</h3>
          <p className="text-gray-600">Add marketplace offers to products</p>
        </Link>
        <Link href="/admin/links" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Links</h3>
          <p className="text-gray-600">Generate and manage short affiliate links</p>
        </Link>
        <Link href="/admin/dashboard" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600">View click stats and performance metrics</p>
        </Link>
      </div>
    </div>
  );
}