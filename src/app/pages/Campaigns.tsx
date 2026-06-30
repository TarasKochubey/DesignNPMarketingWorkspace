import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plus, Search, Edit2, ChevronDown } from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Кешбек Продукти 5%',
    type: 'Категорійний кешбек',
    status: 'active',
    audienceSize: '12,534',
    budgetUsed: 58500,
    budgetTotal: 80000,
    startDate: '2026-01-15',
    endDate: '2026-03-15',
  },
  {
    id: 2,
    name: 'Партнери ОККО та СІЛЬПО',
    type: 'Партнерський кешбек',
    status: 'active',
    audienceSize: '45,821',
    budgetUsed: 125000,
    budgetTotal: 200000,
    startDate: '2026-02-01',
    endDate: '2026-05-31',
  },
  {
    id: 8,
    name: 'Універсальний 2% на все',
    type: 'Універсальний кешбек',
    status: 'active',
    audienceSize: '67,234',
    budgetUsed: 145000,
    budgetTotal: 300000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-700',
  scheduled: 'bg-blue-100 text-blue-700',
  paused: 'bg-gray-100 text-gray-700',
  ended: 'bg-red-100 text-red-700',
};

export function Campaigns() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const handleEditCampaign = (campaign: typeof campaigns[0], e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to edit mode with campaign data
    navigate(`/campaigns/edit/${campaign.id}`, { state: { campaign } });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Кампанії</h1>
            <p className="text-gray-600">Управління та моніторинг маркетингових кампаній</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Створити кампанію
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCreateDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowCreateDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  <div className="p-2">
                    <Link
                      to="/campaigns/new"
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="font-medium text-gray-900 mb-1">Wizard (покроковий)</div>
                      <div className="text-xs text-gray-600">Створення через таби та кроки</div>
                    </Link>
                    <Link
                      to="/campaigns/new-single"
                      className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                      onClick={() => setShowCreateDropdown(false)}
                    >
                      <div className="font-medium text-gray-900 mb-1">Single Page (одна сторінка)</div>
                      <div className="text-xs text-gray-600">Всі налаштування на одній сторінці</div>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук кампаній..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Всі статуси</option>
            <option value="active">Активні</option>
            <option value="scheduled">Заплановані</option>
            <option value="paused">Призупинені</option>
            <option value="ended">Завершені</option>
          </select>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Всі типи</option>
            <option value="Категорійний кешбек">Категорійний кешбек</option>
            <option value="Партнерський кешбек">Партнерський кешбек</option>
            <option value="Універсальний кешбек">Універсальний кешбек</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Назва кампанії
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => {
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">
                        {campaign.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => handleEditCampaign(campaign, e)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Редагувати
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}