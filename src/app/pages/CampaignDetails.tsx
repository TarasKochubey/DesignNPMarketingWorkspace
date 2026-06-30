import { useParams, Link } from 'react-router';
import { ArrowLeft, Calendar, Users, Wallet, Tag, Store, Edit } from 'lucide-react';

// Mock data - в реальному проєкті це буде завантажуватись з API
const campaignData = {
  id: 1,
  name: 'Кешбек Продукти 5%',
  type: 'Кешбек',
  status: 'active',
  startDate: '2026-01-15',
  endDate: '2026-03-15',
  description: 'Отримуйте 5% кешбеку у балах при покупках у продуктових магазинах',
  budgetTotal: 80000,
  audienceSize: 12534,
  selectedCategories: [
    { id: '1', name: 'Продукти харчування', mccCodes: ['5411', '5422'], cashbackRate: 5, icon: '🛒' },
    { id: '2', name: 'Супермаркети', mccCodes: ['5310', '5311'], cashbackRate: 5, icon: '🏪' },
  ],
  selectedPartners: [
    {
      id: '1',
      name: 'СІЛЬПО',
      category: 'Продуктові магазини',
      cashbackRate: 8,
      terminalsCount: 3,
    },
  ],
  selectedAudience: {
    id: '1',
    name: 'Активні користувачі Києва',
    size: 12534,
  },
};

const statusColors = {
  active: 'bg-green-100 text-green-700',
  scheduled: 'bg-blue-100 text-blue-700',
  paused: 'bg-gray-100 text-gray-700',
  ended: 'bg-red-100 text-red-700',
};

const statusLabels = {
  active: 'Активна',
  scheduled: 'Заплановано',
  paused: 'Призупинено',
  ended: 'Завершено',
};

export function CampaignDetails() {
  const { id } = useParams();
  const campaign = campaignData;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/campaigns" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Назад до кампаній
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                {statusLabels[campaign.status as keyof typeof statusLabels]}
              </span>
            </div>
            <p className="text-gray-600">{campaign.description}</p>
          </div>
          
          <Link
            to={`/campaigns/${id}/edit`}
            className="flex items-center gap-2 px-5 py-2.5 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Edit className="w-4 h-4" />
            Редагувати кампанію
          </Link>
        </div>
      </div>

      {/* Campaign Settings */}
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Основна інформація</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Назва кампанії</label>
              <p className="text-gray-900 font-medium">{campaign.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип кампанії</label>
              <p className="text-gray-900 font-medium">{campaign.type}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Опис</label>
              <p className="text-gray-900">{campaign.description}</p>
            </div>
          </div>
        </div>

        {/* Duration & Budget */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Період та бюджет</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата початку</label>
                <p className="text-gray-900 font-semibold">{campaign.startDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата завершення</label>
                <p className="text-gray-900 font-semibold">{campaign.endDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Бюджет</label>
                <p className="text-gray-900 font-semibold">{campaign.budgetTotal.toLocaleString()} балів</p>
              </div>
            </div>
          </div>
        </div>

        {/* Audience */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Цільова аудиторія</h2>
          <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">{campaign.selectedAudience.name}</p>
              <p className="text-sm text-gray-600">{campaign.selectedAudience.size.toLocaleString()} користувачів</p>
            </div>
          </div>
        </div>

        {/* Category Cashback */}
        {campaign.selectedCategories.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Категорійний кешбек</h2>
            <div className="space-y-3">
              {campaign.selectedCategories.map((category) => (
                <div key={category.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{category.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-600">MCC коди: {category.mccCodes.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{category.cashbackRate}%</p>
                    <p className="text-xs text-gray-500">Кешбек</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>ℹ️ Інформація:</strong> Користувачі можуть обрати до 3-х категорій на місяць. 
                Кешбек нараховується у балах, де 1 бал = 1 грн при обміні.
              </p>
            </div>
          </div>
        )}

        {/* Partner Cashback */}
        {campaign.selectedPartners.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Партнерський кешбек</h2>
            <div className="space-y-3">
              {campaign.selectedPartners.map((partner) => (
                <div key={partner.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg">{partner.name}</p>
                    <p className="text-sm text-gray-600">{partner.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {partner.terminalsCount} {partner.terminalsCount === 1 ? 'термінал' : 'терміналів'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{partner.cashbackRate}%</p>
                    <p className="text-xs text-gray-500">Кешбек</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>ℹ️ Інформація:</strong> Кешбек діє автоматично при транзакціях у терміналах партнерів 
                (визначається за MerchantID + TerminalID).
              </p>
            </div>
          </div>
        )}

        {/* Campaign Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Статус кампанії</h2>
          <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              campaign.status === 'active' ? 'bg-green-100' :
              campaign.status === 'scheduled' ? 'bg-blue-100' :
              campaign.status === 'paused' ? 'bg-gray-100' : 'bg-red-100'
            }`}>
              <div className={`w-6 h-6 rounded-full ${
                campaign.status === 'active' ? 'bg-green-500' :
                campaign.status === 'scheduled' ? 'bg-blue-500' :
                campaign.status === 'paused' ? 'bg-gray-500' : 'bg-red-500'
              }`} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {statusLabels[campaign.status as keyof typeof statusLabels]}
              </p>
              <p className="text-sm text-gray-600">
                {campaign.status === 'active' && 'Кампанія активна та приймає транзакції'}
                {campaign.status === 'scheduled' && 'Кампанія буде запущена у визначену дату'}
                {campaign.status === 'paused' && 'Кампанія призупинена'}
                {campaign.status === 'ended' && 'Кампанія завершена'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
