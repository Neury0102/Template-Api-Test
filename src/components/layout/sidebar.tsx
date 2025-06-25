'use client';

import { Home, User, Settings, Package } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Sidebar = () => {
  const t = useTranslations('sidebar');

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
      </div>
      <nav>
        <ul>
          {/* <li className="mb-4">
            <Link href="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700">
              <Home className="w-6 h-6" />
              <span className="ml-3">{t('home')}</span>
            </Link>
          </li> */}
          {/* <li className="mb-4">
            <Link href="/dashboard/profile" className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700">
              <User className="w-6 h-6" />
              <span className="ml-3">{t('profile')}</span>
            </Link>
          </li> */}
          {/* <li className="mb-4">
            <Link href="/dashboard/settings" className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700">
              <Settings className="w-6 h-6" />
              <span className="ml-3">{t('settings')}</span>
            </Link>
          </li> */}
          <li className="mb-4">
            <Link href="/dashboard/products" className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700">
              <Package className="w-6 h-6" />
              <span className="ml-3">{t('products')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
