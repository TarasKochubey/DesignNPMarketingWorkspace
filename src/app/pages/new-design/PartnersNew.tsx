import { Link } from 'react-router';
import { ArrowLeft, Plus, Edit, Trash2, Handshake, Search, ChevronDown, Check, X } from 'lucide-react';

export default function PartnersNew() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <Link 
            to="/design-preview" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до кампаній
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Партнери
              </h1>
              <p className="text-sm text-gray-600">
                Управління партнерами та їх торговими точками
              </p>
            </div>
            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Додати партнера
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        {/* Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук партнерів..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              Статус
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              Категорія
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Партнер
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категорія
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Торгових точок
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ставка кешбеку
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Активних кампаній
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      #{partner.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Handshake className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {partner.name}
                          </div>
                          <div className="text-xs text-gray-500">{partner.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {partner.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partner.locations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Власні:</span>
                          <span className="font-semibold text-green-600">{partner.ownRate}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Кредит:</span>
                          <span className="font-semibold text-orange-600">{partner.creditRate}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PartnerStatusBadge status={partner.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {partner.campaigns}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/design-preview/partners/${partner.id}/edit`}
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Показано 1-10 із 45 партнерів
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1.5 text-sm rounded ${
                    page === 1
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnerStatusBadge({ status }: { status: 'active' | 'inactive' }) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
        <Check className="w-3.5 h-3.5" />
        Активний
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium">
      <X className="w-3.5 h-3.5" />
      Неактивний
    </span>
  );
}

const partners = [
  {
    id: 'PTR001',
    name: 'Сільпо',
    contact: 'partnership@silpo.ua',
    category: 'Супермаркети',
    locations: 342,
    ownRate: 5.0,
    creditRate: 3.0,
    status: 'active' as const,
    campaigns: 8,
  },
  {
    id: 'PTR002',
    name: 'ОККО',
    contact: 'b2b@okko.ua',
    category: 'АЗС',
    locations: 156,
    ownRate: 4.0,
    creditRate: 2.5,
    status: 'active' as const,
    campaigns: 6,
  },
  {
    id: 'PTR003',
    name: 'McDonald\'s',
    contact: 'partners@mcdonalds.ua',
    category: 'Фастфуд',
    locations: 89,
    ownRate: 7.0,
    creditRate: 5.0,
    status: 'active' as const,
    campaigns: 12,
  },
  {
    id: 'PTR004',
    name: 'Rozetka',
    contact: 'partnership@rozetka.ua',
    category: 'Електроніка',
    locations: 45,
    ownRate: 3.0,
    creditRate: 2.0,
    status: 'active' as const,
    campaigns: 5,
  },
  {
    id: 'PTR005',
    name: 'Аптека Доброго Дня',
    contact: 'info@apteka.ua',
    category: 'Аптеки',
    locations: 218,
    ownRate: 6.0,
    creditRate: 4.0,
    status: 'active' as const,
    campaigns: 7,
  },
  {
    id: 'PTR006',
    name: 'Multiplex',
    contact: 'partner@multiplex.ua',
    category: 'Кінотеатри',
    locations: 28,
    ownRate: 10.0,
    creditRate: 8.0,
    status: 'inactive' as const,
    campaigns: 0,
  },
  {
    id: 'PTR007',
    name: 'Інші Кав\'ярні',
    contact: 'hello@inshi.coffee',
    category: 'Кав\'ярні',
    locations: 64,
    ownRate: 8.0,
    creditRate: 6.0,
    status: 'active' as const,
    campaigns: 9,
  },
];