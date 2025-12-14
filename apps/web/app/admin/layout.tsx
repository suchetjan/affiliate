import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                Affiliate Admin
              </Link>
              <div className="flex space-x-4">
                <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/admin/campaigns" className="text-gray-600 hover:text-gray-900">
                  Campaigns
                </Link>
                <Link href="/admin/links" className="text-gray-600 hover:text-gray-900">
                  Links
                </Link>
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}