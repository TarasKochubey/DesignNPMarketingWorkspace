import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft, 
  Download, 
  Check,
  X,
  AlertCircle,
  Clock,
  ChevronDown,
  Search,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter
} from 'lucide-react';

export default function DesignPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <Link 
            to="/campaigns" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до поточного дизайну
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Кампанії
              </h1>
              <p className="text-sm text-gray-600">
                Управління маркетинговими кампаніями
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Експортувати
              </button>
              <Link
                to="/design-preview/campaigns/new"
                className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Створити кампанію
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        {/* Filters & Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук кампаній..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              <Calendar className="w-4 h-4" />
              Період
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              <Filter className="w-4 h-4" />
              Статус
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              Тип
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Назва кампанії
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Тип
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Період
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Використано
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      #{campaign.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {campaign.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {campaign.startDate} — {campaign.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 w-24">
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                campaign.used > 80
                                  ? 'bg-red-500'
                                  : campaign.used > 50
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${campaign.used}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{campaign.used}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/design-preview/campaigns/${campaign.id}/edit`}
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Показувати</span>
              <select className="px-3 py-1.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>50</option>
                <option>100</option>
                <option>200</option>
              </select>
              <span className="text-sm text-gray-600">із 200</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, '...', 23, 24].map((page, idx) => (
                <button
                  key={idx}
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

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    active: {
      icon: <Check className="w-3.5 h-3.5" />,
      color: 'text-green-700',
      bg: 'bg-green-50',
    },
    paused: {
      icon: <Clock className="w-3.5 h-3.5" />,
      color: 'text-yellow-700',
      bg: 'bg-yellow-50',
    },
    ended: {
      icon: <X className="w-3.5 h-3.5" />,
      color: 'text-red-700',
      bg: 'bg-red-50',
    },
    draft: {
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      color: 'text-gray-700',
      bg: 'bg-gray-50',
    },
    scheduled: {
      icon: <Clock className="w-3.5 h-3.5" />,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
    },
  };

  const config = configs[status] || configs.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${
        config.bg
      } ${config.color} rounded-full text-xs font-medium`}
    >
      {config.icon}
      {status === 'active' && 'Активна'}
      {status === 'paused' && 'Призупинено'}
      {status === 'ended' && 'Завершена'}
      {status === 'draft' && 'Чернетка'}
      {status === 'scheduled' && 'Заплановано'}
    </span>
  );
}

// Mock Data
const campaigns = [
  {
    id: '00001',
    name: 'Літня кешбек акція',
    type: 'Категорійний кешбек',
    status: 'active',
    used: 65,
    startDate: '01.06.2024',
    endDate: '31.08.2024',
  },
  {
    id: '00002',
    name: 'Реферальна програма',
    type: 'Реферальна програма',
    status: 'active',
    used: 42,
    startDate: '15.05.2024',
    endDate: '15.12.2024',
  },
  {
    id: '00003',
    name: 'Програма лояльності',
    type: 'Програма лояльності',
    status: 'paused',
    used: 28,
    startDate: '01.01.2024',
    endDate: '31.12.2024',
  },
  {
    id: '00004',
    name: 'Промо на ресторани',
    type: 'Промо-кампанія',
    status: 'active',
    used: 87,
    startDate: '20.06.2024',
    endDate: '20.07.2024',
  },
  {
    id: '00005',
    name: 'Кешбек на АЗС',
    type: 'Категорійний кешбек',
    status: 'draft',
    used: 0,
    startDate: '01.08.2024',
    endDate: '31.08.2024',
  },
  {
    id: '00006',
    name: 'Партнерський кешбек Сільпо',
    type: 'Партнерський кешбек',
    status: 'ended',
    used: 100,
    startDate: '01.03.2024',
    endDate: '31.05.2024',
  },
  {
    id: '00007',
    name: 'Бонуси за рекомендації',
    type: 'Реферальна програма',
    status: 'scheduled',
    used: 0,
    startDate: '01.09.2024',
    endDate: '30.11.2024',
  },
];