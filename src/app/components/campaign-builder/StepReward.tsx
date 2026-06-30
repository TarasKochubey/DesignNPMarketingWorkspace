import { Coins, Percent, DollarSign, Zap, AlertCircle } from 'lucide-react';
import { CashbackCategorySetup } from './CashbackCategorySetup';
import { PartnerCashbackSetup } from './PartnerCashbackSetup';
import { UniversalCashbackSetup } from './UniversalCashbackSetup';

interface StepRewardProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const rewardTypes = [
  {
    id: 'cashback_percent',
    label: 'Відсотковий кешбек',
    description: 'Відсоток від транзакції',
    icon: Percent,
  },
  {
    id: 'cashback_fixed',
    label: 'Фіксований бонус',
    description: 'Фіксована кількість балів',
    icon: DollarSign,
  },
  {
    id: 'points_multiplier',
    label: 'Множник балів',
    description: 'Подвоєння чи потроєння балів',
    icon: Zap,
  },
];

export function StepReward({ formData, updateFormData }: StepRewardProps) {
  // Check campaign type
  const isCashbackCampaign = formData.type === 'cashback';
  const isPartnerCashbackCampaign = formData.type === 'partner_cashback';
  const isUniversalCashbackCampaign = formData.type === 'universal_cashback';

  // If no campaign type selected, show message
  if (!formData.type) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Не вибрано тип кампанії
          </h3>
          <p className="text-gray-600 mb-4">
            Будь ласка, поверніться на крок "Основне" та оберіть тип кампанії, щоб налаштувати винагороду
          </p>
        </div>
      </div>
    );
  }

  // If cashback, show the advanced category setup
  if (isCashbackCampaign) {
    return <CashbackCategorySetup formData={formData} updateFormData={updateFormData} />;
  }

  // If partner cashback, show the partner setup
  if (isPartnerCashbackCampaign) {
    return <PartnerCashbackSetup formData={formData} updateFormData={updateFormData} />;
  }

  // If universal cashback, show the universal setup
  if (isUniversalCashbackCampaign) {
    return <UniversalCashbackSetup formData={formData} updateFormData={updateFormData} />;
  }

  // Otherwise show the original reward configuration
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Налаштування винагороди</h2>
        <p className="text-gray-600">Визначте, що отримають клієнти</p>
      </div>

      {/* Reward type selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип винагороди <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {rewardTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = formData.rewardType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => updateFormData({ rewardType: type.id })}
                className={`p-5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-purple-600' : 'bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rate configuration */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {formData.rewardType === 'cashback_percent' ? 'Ставка кешбеку (%)' : 'Сума винагороди'}
            <span className="text-red-500"> *</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.rewardRate}
              onChange={(e) => updateFormData({ rewardRate: e.target.value })}
              placeholder="напр. 5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {formData.rewardType === 'cashback_percent' ? '%' : '₴'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Курс конвертації</label>
          <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
            1 бал = 1 гривня при обміні
          </div>
        </div>
      </div>

      {/* Transaction limits */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Ліміти на транзакцію</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Мінімальна винагорода</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₴</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Максимальна винагорода</label>
            <div className="relative">
              <input
                type="number"
                placeholder="1000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₴</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer limits */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Ліміти на клієнта</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Місячний ліміт</label>
            <div className="relative">
              <input
                type="number"
                placeholder="500"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₴</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Загальний ліміт</label>
            <div className="relative">
              <input
                type="number"
                placeholder="5000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">₴</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}