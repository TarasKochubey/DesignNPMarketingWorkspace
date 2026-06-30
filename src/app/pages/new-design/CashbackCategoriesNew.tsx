import { Link } from 'react-router';
import { ArrowLeft, Plus, Edit, Trash2, Tag as TagIcon, Search, ChevronDown } from 'lucide-react';

export default function CashbackCategoriesNew() {
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
                Категорії кешбеку
              </h1>
              <p className="text-sm text-gray-600">
                Управління MCC кодами та категоріями торгових точок
              </p>
            </div>
            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Додати категорію
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
                placeholder="Пошук категорій або MCC коду..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              Сортувати
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MCC Код
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Назва категорії
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Опис
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Стандартна ставка
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
                {categories.map((category) => (
                  <tr key={category.mcc} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-medium text-purple-600">
                        {category.mcc}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TagIcon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{category.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Власні:</span>
                          <span className="font-semibold text-green-600">{category.ownRate}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Кредит:</span>
                          <span className="font-semibold text-orange-600">{category.creditRate}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.campaigns}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/design-preview/cashback-categories/${category.mcc}/edit`}
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
              Показано 1-15 із 47 категорій
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((page) => (
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

const categories = [
  {
    mcc: '5812',
    name: 'Ресторани',
    description: 'Ресторани, кафе, їдальні та заклади харчування',
    ownRate: 5.0,
    creditRate: 3.0,
    campaigns: 8,
  },
  {
    mcc: '5541',
    name: 'АЗС',
    description: 'Автозаправочні станції та станції обслуговування',
    ownRate: 3.0,
    creditRate: 2.0,
    campaigns: 12,
  },
  {
    mcc: '5411',
    name: 'Супермаркети',
    description: 'Продуктові магазини та супермаркети',
    ownRate: 2.0,
    creditRate: 1.5,
    campaigns: 15,
  },
  {
    mcc: '5912',
    name: 'Аптеки',
    description: 'Аптеки та медичні товари',
    ownRate: 4.0,
    creditRate: 3.0,
    campaigns: 5,
  },
  {
    mcc: '5311',
    name: 'Універмаги',
    description: 'Торгові центри та універмаги',
    ownRate: 2.5,
    creditRate: 1.5,
    campaigns: 10,
  },
  {
    mcc: '5651',
    name: 'Одяг та взуття',
    description: 'Магазини одягу, взуття та аксесуарів',
    ownRate: 3.5,
    creditRate: 2.5,
    campaigns: 7,
  },
  {
    mcc: '5732',
    name: 'Електроніка',
    description: 'Магазини електроніки та побутової техніки',
    ownRate: 2.0,
    creditRate: 1.0,
    campaigns: 6,
  },
  {
    mcc: '5814',
    name: 'Фастфуд',
    description: 'Заклади швидкого харчування',
    ownRate: 4.0,
    creditRate: 3.0,
    campaigns: 9,
  },
  {
    mcc: '5999',
    name: 'Інше',
    description: 'Різні спеціалізовані магазини',
    ownRate: 1.0,
    creditRate: 0.5,
    campaigns: 3,
  },
  {
    mcc: '7832',
    name: 'Кінотеатри',
    description: 'Кінотеатри та розважальні заклади',
    ownRate: 5.0,
    creditRate: 4.0,
    campaigns: 4,
  },
];