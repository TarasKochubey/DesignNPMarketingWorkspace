import { Calendar, Gift, Package, Users, Percent, DollarSign, Truck, CreditCard, Target } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

interface StepBenefitPreviewProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const benefitTypeLabels: Record<string, string> = {
  discount_percent: 'Відсоткова знижка',
  discount_fixed: 'Фіксована сума',
  free_delivery: 'Безкоштовна доставка',
  free_cod: 'Безкоштовна післяплата',
  cashback: 'Кешбек',
};

const calculationBaseLabels: Record<string, string> = {
  transaction: 'Від суми транзакції',
  delivery: 'Від вартості доставки',
  cod: 'Від післяплати',
  mcc: 'Від конкретних MCC',
  merchant: 'Від конкретних мерчантів',
};

const operationTypeLabels: Record<string, string> = {
  all: 'Всі операції',
  delivery_only: 'Тільки доставка',
  cod_only: 'Тільки післяплата',
  both: 'Доставка + післяплата',
};

const packageLimitTypeLabels: Record<string, string> = {
  unlimited: 'Всі посилки (без обмежень)',
  per_campaign: 'Кількість посилок на кампанію',
  per_month: 'Кількість посилок на місяць',
  first_n: 'Перші N посилок',
  every_nth: 'Кожна N-та посилка',
};

const paymentMethodLabels: Record<string, string> = {
  novapay: 'NovaPay',
  mastercard: 'Mastercard',
  visa: 'Visa',
  all_cards: 'Всі картки',
};

const cardTypeLabels: Record<string, string> = {
  debit: 'Дебетова',
  credit: 'Кредитна',
};

const channelLabels: Record<string, string> = {
  novapay_app: 'NovaPay app',
  novaposhta_app: 'Nova Poshta app',
  web: 'Web',
  pos: 'POS',
};

const segmentLabels: Record<string, string> = {
  all: 'Всі користувачі',
  new: 'Нові користувачі',
  existing: 'Існуючі користувачі',
  low_frequency: 'Low frequency',
  high_check: 'High чек',
  no_card_payment: 'Не платили карткою',
  specific_users: 'Конкретні користувачі',
};

export function StepBenefitPreview({ formData }: StepBenefitPreviewProps) {
  const benefits = Array.isArray(formData.benefits) ? formData.benefits : [];
  const limits = formData.benefitLimits || {};
  const segmentation = formData.benefitSegmentation || {};

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Перегляд кампанії</h2>
        <p className="text-gray-600">Перевірте всі налаштування перед запуском</p>
      </div>

      {/* Basic info */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Основна інформація</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-gray-600">Назва кампанії:</span>
            <span className="text-sm font-semibold text-gray-900 text-right">{formData.name || '—'}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-gray-600">Тип кампанії:</span>
            <span className="text-sm font-semibold text-gray-900">Вигода</span>
          </div>
          {formData.description && (
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-gray-600">Опис:</span>
              <span className="text-sm text-gray-900 text-right max-w-md">{formData.description}</span>
            </div>
          )}
          <div className="flex items-start justify-between">
            <span className="text-sm font-medium text-gray-600">Пріоритет:</span>
            <span className="text-sm font-semibold text-gray-900">{formData.priority || 1}</span>
          </div>
          {formData.scheduledDate && (
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-gray-600">Дата запуску:</span>
              <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                {format(new Date(formData.scheduledDate), 'dd MMMM yyyy', { locale: uk })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Benefits */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Налаштовані вигоди</h3>
        </div>

        {benefits.length === 0 ? (
          <p className="text-sm text-gray-600">Вигоди не додано</p>
        ) : (
          <div className="space-y-3">
            {benefits.map((benefit: any, index: number) => (
              <div key={benefit.id} className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">
                    {index + 1}. {benefitTypeLabels[benefit.type] || benefit.type}
                  </h4>
                  {benefit.value && (
                    <span className="text-sm font-bold text-purple-600">
                      {benefit.type === 'discount_percent' || benefit.type === 'cashback'
                        ? `${benefit.value}%`
                        : `${benefit.value} грн`}
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>База розрахунку:</span>
                    <span className="font-medium text-gray-900">
                      {calculationBaseLabels[benefit.calculationBase] || benefit.calculationBase}
                    </span>
                  </div>
                  {benefit.maxAmount && (
                    <div className="flex justify-between">
                      <span>Максимальна сума:</span>
                      <span className="font-medium text-gray-900">{benefit.maxAmount} грн</span>
                    </div>
                  )}
                  {benefit.minTransactionAmount && (
                    <div className="flex justify-between">
                      <span>Мін. сума транзакції:</span>
                      <span className="font-medium text-gray-900">{benefit.minTransactionAmount} грн</span>
                    </div>
                  )}
                  {benefit.maxTransactionAmount && (
                    <div className="flex justify-between">
                      <span>Макс. сума транзакції:</span>
                      <span className="font-medium text-gray-900">{benefit.maxTransactionAmount} грн</span>
                    </div>
                  )}
                  {benefit.mccCodes && (
                    <div className="flex justify-between">
                      <span>MCC коди:</span>
                      <span className="font-medium text-gray-900 font-mono text-xs">{benefit.mccCodes}</span>
                    </div>
                  )}
                  {benefit.merchantIds && (
                    <div className="flex justify-between">
                      <span>Merchant ID:</span>
                      <span className="font-medium text-gray-900 font-mono text-xs">{benefit.merchantIds}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Limits */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Обмеження використання</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Обмеження по посилках:</span>
            <div className="text-right">
              <div className="font-medium text-gray-900">
                {packageLimitTypeLabels[limits.packageLimitType] || 'Всі посилки'}
              </div>
              {limits.packageLimitValue && (
                <div className="text-xs text-gray-600 mt-1">Значення: {limits.packageLimitValue}</div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Тип операції:</span>
            <span className="font-medium text-gray-900">
              {operationTypeLabels[limits.operationType] || 'Всі операції'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Способи оплати:</span>
            <span className="font-medium text-gray-900 text-right">
              {(limits.paymentMethods || []).map((pm: string) => paymentMethodLabels[pm] || pm).join(', ') || '—'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Типи карток:</span>
            <span className="font-medium text-gray-900 text-right">
              {(limits.cardTypes || []).map((ct: string) => cardTypeLabels[ct] || ct).join(', ') || '—'}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Канали:</span>
            <span className="font-medium text-gray-900 text-right">
              {(limits.channels || []).map((ch: string) => channelLabels[ch] || ch).join(', ') || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Segmentation */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Сегментація користувачів</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Обрані сегменти:</span>
            <div className="text-right font-medium text-gray-900 max-w-md">
              {(segmentation.segments || ['all']).map((seg: string) => segmentLabels[seg] || seg).join(', ')}
            </div>
          </div>
          {segmentation.segments?.includes('low_frequency') && segmentation.lowFrequencyThreshold && (
            <div className="flex justify-between">
              <span className="text-gray-600">Low frequency (транзакцій/міс):</span>
              <span className="font-medium text-gray-900">{'<'} {segmentation.lowFrequencyThreshold}</span>
            </div>
          )}
          {segmentation.segments?.includes('high_check') && segmentation.highCheckThreshold && (
            <div className="flex justify-between">
              <span className="text-gray-600">High чек (мін. середній):</span>
              <span className="font-medium text-gray-900">{segmentation.highCheckThreshold} грн</span>
            </div>
          )}
          {segmentation.segments?.includes('specific_users') && segmentation.specificUserIds && (
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Список ID:</span>
              <span className="font-medium text-gray-900 font-mono text-xs max-w-md text-right break-all">
                {segmentation.specificUserIds.substring(0, 100)}
                {segmentation.specificUserIds.length > 100 && '...'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action hint */}
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-900">
          ✓ Перевірте налаштування та натисніть <span className="font-semibold">"Запустити кампанію"</span> для активації
        </p>
      </div>
    </div>
  );
}
