import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Affiliate Web App
        </h1>
        <p className="text-gray-600 mb-8">
          Price comparison and affiliate link management for Lazada & Shopee
        </p>
        <div className="space-y-4">
          <Link
            href="/admin"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Admin Panel
          </Link>
          <Link
            href="/admin/dashboard"
            className="block w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Analytics Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}