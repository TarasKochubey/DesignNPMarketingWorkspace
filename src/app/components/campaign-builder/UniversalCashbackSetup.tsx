import { useState } from 'react';
import { Plus, Percent, Copy, Wallet, CreditCard, X } from 'lucide-react';

interface UniversalCashbackSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
}

// Generate months dynamically: current month + 11 next months
const generateMonths = () => {
  const months: { id: string; label: string }[] = [];
  const now = new Date();
  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthId = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthLabel = `${monthNames[month]} ${year}`;
    
    months.push({ id: monthId, label: monthLabel });
  }
  
  return months;
};

export function UniversalCashbackSetup({ formData, updateFormData }: UniversalCashbackSetupProps) {
  const months = generateMonths();
  const currentMonthId = months[0].id; // Current month
  
  // Initialize with current month only
  const [activePeriods, setActivePeriods] = useState<string[]>(
    formData.universalRates && Object.keys(formData.universalRates).length > 0
      ? Object.keys(formData.universalRates)
      : [currentMonthId]
  );
  const [selectedMonth, setSelectedMonth] = useState(activePeriods[0]);
  
  // Universal cashback rates structure: { monthId: { own: number, credit: number } }
  const [universalRates, setUniversalRates] = useState<Record<string, { own: number; credit: number }>>(
    formData.universalRates || {}
  );
  
  // Monthly limits: { month: { maxPoints: number } }
  const [monthlyLimits, setMonthlyLimits] = useState<Record<string, { maxPoints: number }>>(
    formData.monthlyLimits || {}
  );

  const updateRate = (month: string, type: 'own' | 'credit', value: number) => {
    const newRates = {
      ...universalRates,
      [month]: {
        ...universalRates[month],
        [type]: value
      }
    };
    setUniversalRates(newRates);
    updateFormData({ universalRates: newRates });
  };

  const getRate = (month: string, type: 'own' | 'credit') => {
    return universalRates[month]?.[type] || (type === 'own' ? 5 : 3);
  };

  const copyFromPreviousMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const currentIndex = sortedPeriods.indexOf(selectedMonth);
    
    if (currentIndex <= 0) {
      return;
    }
    
    const previousMonth = sortedPeriods[currentIndex - 1];
    const newRates = { ...universalRates };
    const newLimits = { ...monthlyLimits };
    
    if (universalRates[previousMonth]) {
      newRates[selectedMonth] = { ...universalRates[previousMonth] };
      setUniversalRates(newRates);
      updateFormData({ universalRates: newRates });
    }
    
    if (monthlyLimits[previousMonth]) {
      newLimits[selectedMonth] = { ...monthlyLimits[previousMonth] };
      setMonthlyLimits(newLimits);
      updateFormData({ monthlyLimits: newLimits });
    }
  };

  const hasPreviousMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const currentIndex = sortedPeriods.indexOf(selectedMonth);
    return currentIndex > 0;
  };

  const getPreviousMonthLabel = () => {
    const sortedPeriods = [...activePeriods].sort();
    const currentIndex = sortedPeriods.indexOf(selectedMonth);
    if (currentIndex <= 0) return '';
    const previousMonth = sortedPeriods[currentIndex - 1];
    return generateMonths().find(m => m.id === previousMonth)?.label || previousMonth;
  };

  const addNextMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const lastMonthId = sortedPeriods[sortedPeriods.length - 1];
    const allMonths = generateMonths();
    const lastMonthIndex = allMonths.findIndex(m => m.id === lastMonthId);
    
    if (lastMonthIndex < allMonths.length - 1) {
      const nextMonth = allMonths[lastMonthIndex + 1];
      setActivePeriods([...activePeriods, nextMonth.id]);
    }
  };

  const removeMonth = (monthId: string) => {
    if (activePeriods.length === 1) {
      return; // Don't allow removing the last month
    }
    
    const newActivePeriods = activePeriods.filter(m => m !== monthId);
    setActivePeriods(newActivePeriods);
    
    // If we removed the selected month, select another one
    if (selectedMonth === monthId) {
      setSelectedMonth(newActivePeriods[0]);
    }
    
    // Remove rates for this month
    const newRates = { ...universalRates };
    delete newRates[monthId];
    setUniversalRates(newRates);
    updateFormData({ universalRates: newRates });
  };

  const canAddMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const lastMonthId = sortedPeriods[sortedPeriods.length - 1];
    const allMonths = generateMonths();
    const lastMonthIndex = allMonths.findIndex(m => m.id === lastMonthId);
    return lastMonthIndex < allMonths.length - 1;
  };

  const updateMonthlyLimit = (month: string, value: number) => {
    const newLimits = {
      ...monthlyLimits,
      [month]: {
        maxPoints: value,
      }
    };
    setMonthlyLimits(newLimits);
    updateFormData({ monthlyLimits: newLimits });
  };

  const getMonthLimit = (month: string) => {
    return monthlyLimits[month]?.maxPoints || 0;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Налаштування універсального кешбеку</h2>
        </div>
      </div>

      {/* Month Tabs */}
      {activePeriods.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Налаштування ставок по місяцях</h3>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
            {activePeriods.map((month, index) => {
              const monthLabel = generateMonths().find(m => m.id === month)?.label || month;
              const isCurrentMonth = index === 0;
              return (
                <div key={`month-tab-${month}`} className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 font-medium transition-all whitespace-nowrap ${
                      selectedMonth === month
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {monthLabel}
                  </button>
                  {activePeriods.length > 1 && !isCurrentMonth && (
                    <button
                      onClick={() => removeMonth(month)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                      title="Видалити місяць"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
            {canAddMonth() && (
              <button
                key="add-month-btn"
                onClick={addNextMonth}
                className="px-4 py-2 font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
                title="Додати наступний місяць"
              >
                <Plus className="w-4 h-4" />
                Додати місяць
              </button>
            )}
          </div>

          {/* Rate Settings */}
          <div className="space-y-6">
            <div className="flex items-center justify-end">
              {hasPreviousMonth() && (
                <button
                  onClick={copyFromPreviousMonth}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Копіювати з {getPreviousMonthLabel()}
                </button>
              )}
            </div>

            <div className="p-6 bg-white rounded-xl border-2 border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-4">
                Ставки кешбеку для {generateMonths().find(m => m.id === selectedMonth)?.label}
              </h4>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Own funds rate */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <Wallet className="w-4 h-4 text-purple-600" />
                    Власні кошти
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="0.1"
                      value={getRate(selectedMonth, 'own')}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value >= 1 && value <= 100) {
                          updateRate(selectedMonth, 'own', value);
                        } else if (e.target.value === '') {
                          updateRate(selectedMonth, 'own', 1);
                        }
                      }}
                      className="w-full pl-4 pr-10 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold text-purple-600 text-lg"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Percent className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Credit funds rate */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                    <CreditCard className="w-4 h-4 text-orange-600" />
                    Кредитні кошти
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="0.1"
                      value={getRate(selectedMonth, 'credit')}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value >= 1 && value <= 100) {
                          updateRate(selectedMonth, 'credit', value);
                        } else if (e.target.value === '') {
                          updateRate(selectedMonth, 'credit', 1);
                        }
                      }}
                      className="w-full pl-4 pr-10 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold text-orange-600 text-lg"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Percent className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Monthly Limits Section */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">
                Ліміти для {generateMonths().find(m => m.id === selectedMonth)?.label}
              </h3>
              <div>
                <label className="block text-sm font-medium text-green-900 mb-2">
                  Максимальна кількість накопичених балів
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={getMonthLimit(selectedMonth) || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0) {
                        updateMonthlyLimit(selectedMonth, value);
                      }
                    }}
                    placeholder="напр. 5000"
                    className="w-full px-4 py-2.5 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-green-700 bg-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 font-medium">
                    балів
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}