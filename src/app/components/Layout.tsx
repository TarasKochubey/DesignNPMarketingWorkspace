import { Outlet, Link, useLocation } from 'react-router';
import { Megaphone, Tag, Handshake, Palette, Share2 } from 'lucide-react';

const navItems = [
  { path: '/campaigns', label: 'Кампанії', icon: Megaphone },
  { path: '/cashback-categories', label: 'Категорії кешбеку', icon: Tag },
  { path: '/partners', label: 'Партнери', icon: Handshake },
  { path: '/referral', label: 'Реферальна програма', icon: Share2 },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-xs text-gray-500">Marketing Workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Dev Tools Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/dev-ui-kit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <Palette className="w-5 h-5" />
              <span className="font-medium text-sm">Dev UI Kit</span>
            </Link>
          </div>
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">МК</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Адміністратор маркетингу</p>
              <p className="text-xs text-gray-500 truncate">admin@novapay.ua</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}