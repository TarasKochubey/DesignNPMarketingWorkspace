import { Link } from 'react-router';
import { ArrowLeft, Plus, Edit, Trash2, Users as UsersIcon, Filter, Search, ChevronDown } from 'lucide-react';

export default function AudiencesNew() {
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
                Аудиторії
              </h1>
              <p className="text-sm text-gray-600">
                Управління сегментами користувачів
              </p>
            </div>
            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Створити аудиторію
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук аудиторій..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-100">
              <Filter className="w-4 h-4" />
              Тип
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-3 gap-6">
          {audiences.map((audience) => (
            <div key={audience.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {audience.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {audience.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Користувачів</span>
                  <span className="font-semibold text-gray-900">
                    {audience.users.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Активних кампаній</span>
                  <span className="font-semibold text-gray-900">{audience.campaigns}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {audience.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const audiences = [
  {
    id: 1,
    name: 'Всі користувачі',
    description: 'Всі зареєстровані користувачі платформи',
    users: 125430,
    campaigns: 12,
    tags: ['Базова', 'Автоматична'],
  },
  {
    id: 2,
    name: 'Нові користувачі',
    description: 'Користувачі, зареєстровані менше 30 днів тому',
    users: 8750,
    campaigns: 5,
    tags: ['Онбординг', 'Активація'],
  },
  {
    id: 3,
    name: 'VIP клієнти',
    description: 'Користувачі з витратами більше 50 000 грн',
    users: 3240,
    campaigns: 8,
    tags: ['Premium', 'Високий дохід'],
  },
  {
    id: 4,
    name: 'Активні користувачі',
    description: 'Здійснили транзакцію за останні 7 днів',
    users: 45600,
    campaigns: 15,
    tags: ['Активність', 'Регулярні'],
  },
  {
    id: 5,
    name: 'Київ та область',
    description: 'Користувачі з Києва та Київської області',
    users: 52100,
    campaigns: 6,
    tags: ['Географія', 'Київ'],
  },
  {
    id: 6,
    name: 'Неактивні 30+ днів',
    description: 'Користувачі без транзакцій понад 30 днів',
    users: 15800,
    campaigns: 2,
    tags: ['Реактивація', 'Повернення'],
  },
];
