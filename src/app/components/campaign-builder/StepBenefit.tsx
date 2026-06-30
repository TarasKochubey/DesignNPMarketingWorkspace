import { useState } from 'react';
import { Plus, X, Percent, DollarSign, Truck, CreditCard, Gift } from 'lucide-react';

interface StepBenefitProps {
  formData: any;
  updateFormData: (data: any) => void;
}

interface BenefitItem {
  id: string;
  type: 'discount_percent' | 'discount_fixed' | 'free_delivery' | 'free_cod' | 'cashback';
  value?: number;
  maxAmount?: number;
  minTransactionAmount?: number;
  maxTransactionAmount?: number;
  calculationBase: 'transaction' | 'delivery' | 'cod' | 'mcc' | 'merchant';
  mccCodes?: string;
  merchantIds?: string;
}

const benefitTypes = [
  { id: 'discount_percent', label: 'Відсоткова знижка', icon: Percent, color: 'purple' },
  { id: 'discount_fixed', label: 'Фіксована сума', icon: DollarSign, color: 'green' },
  { id: 'free_delivery', label: 'Безкоштовна доставка', icon: Truck, color: 'blue' },
  { id: 'free_cod', label: 'Безкоштовна післяплата', icon: CreditCard, color: 'orange' },
  { id: 'cashback', label: 'Кешбек', icon: Gift, color: 'pink' },
];

const calculationBases = [
  { id: 'transaction', label: 'Від суми транзакції' },
  { id: 'delivery', label: 'Від вартості доставки' },
  { id: 'cod', label: 'Від післяплати' },
  { id: 'mcc', label: 'Від конкретних MCC' },
  { id: 'merchant', label: 'Від конкретних мерчантів' },
];

export function StepBenefit({ formData, updateFormData }: StepBenefitProps) {
  const [benefits, setBenefits] = useState<BenefitItem[]>(
    Array.isArray(formData.benefits) ? formData.benefits : []
  );

  const [showBenefitSelector, setShowBenefitSelector] = useState(false);

  const addBenefit = (type: string) => {
    const newBenefit: BenefitItem = {
      id: Date.now().toString(),
      type: type as any,
      value: type === 'discount_percent' ? 10 : type === 'discount_fixed' ? 50 : 0,
      maxAmount: undefined,
      minTransactionAmount: undefined,
      maxTransactionAmount: undefined,
      calculationBase: 'transaction',
    };

    const updatedBenefits = [...benefits, newBenefit];
    setBenefits(updatedBenefits);
    updateFormData({ benefits: updatedBenefits });
    setShowBenefitSelector(false);
  };

  const removeBenefit = (id: string) => {
    const updatedBenefits = benefits.filter(b => b.id !== id);
    setBenefits(updatedBenefits);
    updateFormData({ benefits: updatedBenefits });
  };

  const updateBenefit = (id: string, updates: Partial<BenefitItem>) => {
    const updatedBenefits = benefits.map(b =>
      b.id === id ? { ...b, ...updates } : b
    );
    setBenefits(updatedBenefits);
    updateFormData({ benefits: updatedBenefits });
  };

  const getBenefitTypeInfo = (type: string) => {
    return benefitTypes.find(t => t.id === type);
  };

  const renderBenefitConfig = (benefit: BenefitItem) => {
    const typeInfo = getBenefitTypeInfo(benefit.type);
    if (!typeInfo) return null;

    const Icon = typeInfo.icon;

    const iconColorClass =
      typeInfo.color === 'purple' ? 'bg-purple-100' :
      typeInfo.color === 'green' ? 'bg-green-100' :
      typeInfo.color === 'blue' ? 'bg-blue-100' :
      typeInfo.color === 'orange' ? 'bg-orange-100' :
      'bg-pink-100';

    const textColorClass =
      typeInfo.color === 'purple' ? 'text-purple-600' :
      typeInfo.color === 'green' ? 'text-green-600' :
      typeInfo.color === 'blue' ? 'text-blue-600' :
      typeInfo.color === 'orange' ? 'text-orange-600' :
      'text-pink-600';

    return (
      <div key={benefit.id} className="p-4 bg-white border-2 border-gray-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className={`p-2 ${iconColorClass} rounded-lg flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${textColorClass}`} />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{typeInfo.label}</h3>
              <button
                onClick={() => removeBenefit(benefit.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Value input for discount types */}
            {(benefit.type === 'discount_percent' || benefit.type === 'discount_fixed' || benefit.type === 'cashback') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {benefit.type === 'discount_percent' ? 'Відсоток знижки (%)' :
                   benefit.type === 'cashback' ? 'Відсоток кешбеку (%)' :
                   'Сума знижки (грн)'}
                </label>
                <input
                  type="number"
                  value={benefit.value || ''}
                  onChange={(e) => updateBenefit(benefit.id, { value: parseFloat(e.target.value) || 0 })}
                  min="0"
                  max={benefit.type === 'discount_percent' || benefit.type === 'cashback' ? 100 : undefined}
                  step={benefit.type === 'discount_fixed' ? 1 : 0.1}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Max amount cap */}
            {benefit.type !== 'free_delivery' && benefit.type !== 'free_cod' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Максимальна сума вигоди (cap, грн) <span className="text-gray-500 text-xs">(опціонально)</span>
                </label>
                <input
                  type="number"
                  value={benefit.maxAmount || ''}
                  onChange={(e) => updateBenefit(benefit.id, { maxAmount: parseFloat(e.target.value) || undefined })}
                  placeholder="Без обмежень"
                  min="0"
                  step="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {/* Min/Max transaction amount */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Мін. сума транзакції (грн)
                </label>
                <input
                  type="number"
                  value={benefit.minTransactionAmount || ''}
                  onChange={(e) => updateBenefit(benefit.id, { minTransactionAmount: parseFloat(e.target.value) || undefined })}
                  placeholder="Без обмежень"
                  min="0"
                  step="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Макс. сума транзакції (грн)
                </label>
                <input
                  type="number"
                  value={benefit.maxTransactionAmount || ''}
                  onChange={(e) => updateBenefit(benefit.id, { maxTransactionAmount: parseFloat(e.target.value) || undefined })}
                  placeholder="Без обмежень"
                  min="0"
                  step="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Calculation base */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                База розрахунку вигоди
              </label>
              <select
                value={benefit.calculationBase}
                onChange={(e) => updateBenefit(benefit.id, { calculationBase: e.target.value as any })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {calculationBases.map(base => (
                  <option key={base.id} value={base.id}>{base.label}</option>
                ))}
              </select>
            </div>

            {/* MCC codes input */}
            {benefit.calculationBase === 'mcc' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MCC коди (через кому)
                </label>
                <input
                  type="text"
                  value={benefit.mccCodes || ''}
                  onChange={(e) => updateBenefit(benefit.id, { mccCodes: e.target.value })}
                  placeholder="5411, 5812, 5912"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                />
              </div>
            )}

            {/* Merchant IDs input */}
            {benefit.calculationBase === 'merchant' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant ID (через кому)
                </label>
                <input
                  type="text"
                  value={benefit.merchantIds || ''}
                  onChange={(e) => updateBenefit(benefit.id, { merchantIds: e.target.value })}
                  placeholder="MRC-12345, MRC-67890"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Налаштування вигоди</h2>
        <p className="text-gray-600">Визначте тип і параметри вигоди для користувачів</p>
      </div>

      {/* Benefits list */}
      <div className="space-y-4">
        {benefits.length === 0 ? (
          <div className="p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Вигоди не додано</h3>
            <p className="text-gray-600 mb-6">Додайте один або кілька типів вигоди</p>
            <button
              onClick={() => setShowBenefitSelector(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Додати вигоду
            </button>
          </div>
        ) : (
          <>
            {benefits.map(benefit => renderBenefitConfig(benefit))}

            <button
              onClick={() => setShowBenefitSelector(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Додати ще одну вигоду
            </button>
          </>
        )}
      </div>

      {/* Benefit type selector modal */}
      {showBenefitSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Оберіть тип вигоди</h3>
                <p className="text-sm text-gray-600 mt-1">Ви можете додати декілька типів вигоди</p>
              </div>
              <button
                onClick={() => setShowBenefitSelector(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {benefitTypes.map((type) => {
                const Icon = type.icon;
                const bgColor =
                  type.color === 'purple' ? 'bg-purple-100' :
                  type.color === 'green' ? 'bg-green-100' :
                  type.color === 'blue' ? 'bg-blue-100' :
                  type.color === 'orange' ? 'bg-orange-100' :
                  'bg-pink-100';
                const textColor =
                  type.color === 'purple' ? 'text-purple-600' :
                  type.color === 'green' ? 'text-green-600' :
                  type.color === 'blue' ? 'text-blue-600' :
                  type.color === 'orange' ? 'text-orange-600' :
                  'text-pink-600';
                return (
                  <button
                    key={type.id}
                    onClick={() => addBenefit(type.id)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left flex items-center gap-4"
                  >
                    <div className={`p-3 ${bgColor} rounded-lg`}>
                      <Icon className={`w-6 h-6 ${textColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
