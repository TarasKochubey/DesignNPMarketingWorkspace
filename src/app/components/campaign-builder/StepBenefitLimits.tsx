import { useState } from 'react';
import { Package, ShoppingCart, CreditCard, Smartphone, Globe, Monitor } from 'lucide-react';

interface StepBenefitLimitsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

interface LimitsConfig {
  packageLimitType: 'unlimited' | 'per_campaign' | 'per_month' | 'first_n' | 'every_nth';
  packageLimitValue?: number;
  operationType: 'all' | 'delivery_only' | 'cod_only' | 'both';
  excludedOperations: string[];
  paymentMethods: string[];
  cardTypes: string[];
  channels: string[];
}

const operationTypes = [
  { id: 'all', label: 'Всі операції' },
  { id: 'delivery_only', label: 'Тільки доставка' },
  { id: 'cod_only', label: 'Тільки післяплата' },
  { id: 'both', label: 'Доставка + післяплата' },
];

const paymentMethodOptions = [
  { id: 'novapay', label: 'NovaPay' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'visa', label: 'Visa' },
  { id: 'all_cards', label: 'Всі картки' },
];

const cardTypeOptions = [
  { id: 'debit', label: 'Дебетова' },
  { id: 'credit', label: 'Кредитна' },
];

const channelOptions = [
  { id: 'novapay_app', label: 'NovaPay app', icon: Smartphone },
  { id: 'novaposhta_app', label: 'Nova Poshta app', icon: Package },
  { id: 'web', label: 'Web', icon: Globe },
  { id: 'pos', label: 'POS', icon: Monitor },
];

export function StepBenefitLimits({ formData, updateFormData }: StepBenefitLimitsProps) {
  const defaultLimits: LimitsConfig = {
    packageLimitType: 'unlimited',
    packageLimitValue: undefined,
    operationType: 'all',
    excludedOperations: [],
    paymentMethods: ['all_cards'],
    cardTypes: ['debit', 'credit'],
    channels: ['novapay_app', 'novaposhta_app', 'web', 'pos'],
  };

  const [limits, setLimits] = useState<LimitsConfig>({
    ...defaultLimits,
    ...formData.benefitLimits,
    paymentMethods: formData.benefitLimits?.paymentMethods || defaultLimits.paymentMethods,
    cardTypes: formData.benefitLimits?.cardTypes || defaultLimits.cardTypes,
    channels: formData.benefitLimits?.channels || defaultLimits.channels,
  });

  const updateLimits = (updates: Partial<LimitsConfig>) => {
    const updatedLimits = { ...limits, ...updates };
    setLimits(updatedLimits);
    updateFormData({ benefitLimits: updatedLimits });
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Обмеження використання</h2>
        <p className="text-gray-600">Визначте умови та обмеження для застосування вигоди</p>
      </div>

      {/* Package limits */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Обмеження по посилках</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип обмеження
            </label>
            <select
              value={limits.packageLimitType}
              onChange={(e) => updateLimits({ packageLimitType: e.target.value as any, packageLimitValue: undefined })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="unlimited">Всі посилки (без обмежень)</option>
              <option value="per_campaign">Кількість посилок на кампанію</option>
              <option value="per_month">Кількість посилок на місяць</option>
              <option value="first_n">Перші N посилок</option>
              <option value="every_nth">Кожна N-та посилка</option>
            </select>
          </div>

          {limits.packageLimitType !== 'unlimited' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {limits.packageLimitType === 'per_campaign' && 'Максимальна кількість посилок на кампанію'}
                {limits.packageLimitType === 'per_month' && 'Максимальна кількість посилок на місяць'}
                {limits.packageLimitType === 'first_n' && 'Кількість перших посилок'}
                {limits.packageLimitType === 'every_nth' && 'Номер посилки (кожна N-та)'}
              </label>
              <input
                type="number"
                value={limits.packageLimitValue || ''}
                onChange={(e) => updateLimits({ packageLimitValue: parseInt(e.target.value) || undefined })}
                placeholder="Введіть число"
                min="1"
                step="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Operation type */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Тип операції</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Застосовувати вигоду для
          </label>
          <select
            value={limits.operationType}
            onChange={(e) => updateLimits({ operationType: e.target.value as any })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          >
            {operationTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Payment methods */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Спосіб оплати</h3>
        </div>

        <div className="space-y-3">
          {paymentMethodOptions.map((method) => (
            <label key={method.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={limits.paymentMethods.includes(method.id)}
                onChange={() => updateLimits({ paymentMethods: toggleArrayItem(limits.paymentMethods, method.id) })}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Card types */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Тип картки</h3>
        </div>

        <div className="space-y-3">
          {cardTypeOptions.map((type) => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={limits.cardTypes.includes(type.id)}
                onChange={() => updateLimits({ cardTypes: toggleArrayItem(limits.cardTypes, type.id) })}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Канали</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Оберіть канали, де діє вигода</p>

        <div className="grid grid-cols-2 gap-3">
          {channelOptions.map((channel) => {
            const Icon = channel.icon;
            return (
              <label key={channel.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={limits.channels.includes(channel.id)}
                  onChange={() => updateLimits({ channels: toggleArrayItem(limits.channels, channel.id) })}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{channel.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
