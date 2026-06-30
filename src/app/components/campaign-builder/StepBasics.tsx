import { useState } from 'react';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const campaignTypes = [
  { id: 'cashback', label: 'Кешбек (категорійний)', description: 'Кешбек за категоріями MCC з різними відсотковими ставками' },
  { id: 'partner_cashback', label: 'Партнерський кешбек', description: 'Спеціальні ставки для торгових точок-партнерів за MerchantID/TerminalID' },
  { id: 'universal_cashback', label: 'Універсальний кешбек', description: 'Єдина ставка кешбеку для всіх транзакцій без категорій' },
  { id: 'benefit', label: 'Вигода', description: 'Знижки, безкоштовні послуги та комбіновані механіки для користувачів' },
];

interface StepBasicsProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function StepBasics({ formData, updateFormData }: StepBasicsProps) {
  const selectedType = campaignTypes.find(t => t.id === formData.type);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateFormData({ scheduledDate: format(date, 'yyyy-MM-dd') });
      setShowCalendar(false);
    }
  };

  const selectedDate = formData.scheduledDate ? new Date(formData.scheduledDate) : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Основна інформація кампанії</h2>
        <p className="text-gray-600">Визначте базові параметри вашої кампанії</p>
      </div>

      {/* Campaign name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Назва кампанії <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="наприклад, Кешбек Продукти 5%"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Campaign type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Тип кампанії <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.type}
            onChange={(e) => updateFormData({ type: e.target.value })}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer font-medium"
          >
            <option value="">Оберіть тип кампанії...</option>
            {campaignTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        
        {/* Description of selected type */}
        {selectedType && (
          <p className="mt-2 text-sm text-gray-600 bg-purple-50 p-3 rounded-lg border border-purple-200">
            <span className="font-medium text-purple-900">ℹ️ </span>
            {selectedType.description}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Внутрішній опис
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Додайте нотатки для вашої команди (не видно клієнтам)"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Priority (only for benefit campaigns) */}
      {formData.type === 'benefit' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Пріоритет кампанії
          </label>
          <input
            type="number"
            value={formData.priority || 1}
            onChange={(e) => updateFormData({ priority: parseInt(e.target.value) || 1 })}
            placeholder="1"
            min="1"
            max="100"
            step="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-600">
            При накладанні кампаній буде застосована кампанія з найвищим пріоритетом (1 - найвищий)
          </p>
        </div>
      )}

      {/* Start Campaign */}
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Запланувати</h3>
        <p className="text-sm text-gray-600 mb-4">Кампанія почне діяти з обраної дати</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white hover:bg-gray-50 transition-colors"
          >
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span className="flex-1 text-left">
              {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: uk }) : 'Оберіть дату'}
            </span>
          </button>
          
          {showCalendar && (
            <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                locale={uk}
                disabled={{ before: new Date() }}
                className="rdp-custom"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}