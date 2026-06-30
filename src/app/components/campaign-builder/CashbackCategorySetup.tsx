import { useState } from 'react';
import { Plus, X, Percent, Settings, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router';

interface CashbackCategorySetupProps {
  formData: any;
  updateFormData: (data: any) => void;
}

// These would be loaded from API in real app
const DEFAULT_CATEGORIES = [
  { id: 'groceries', name: 'Продукти', mcc: ['5411', '5412', '5499'], icon: '🛒' },
  { id: 'restaurants', name: 'Ресторани', mcc: ['5812', '5813', '5814'], icon: '🍽️' },
  { id: 'pharmacy', name: 'Аптеки', mcc: ['5912'], icon: '💊' },
  { id: 'transport', name: 'Транспорт', mcc: ['4111', '4112', '4121', '5541', '5542'], icon: '🚕' },
  { id: 'fuel', name: 'АЗС', mcc: ['5541', '5542'], icon: '⛽' },
  { id: 'entertainment', name: 'Розваги', mcc: ['7832', '7841', '7922', '7929'], icon: '🎬' },
  { id: 'utilities', name: 'Комунальні', mcc: ['4900'], icon: '💡' },
  { id: 'beauty', name: 'Краса', mcc: ['5977', '7230'], icon: '💅' },
  { id: 'education', name: 'Освіта', mcc: ['8211', '8220', '8299'], icon: '📚' },
  { id: 'health', name: 'Медицина', mcc: ['8011', '8021', '8031', '8099'], icon: '🏥' },
];

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

export function CashbackCategorySetup({ formData, updateFormData }: CashbackCategorySetupProps) {
  const [availableCategories] = useState(DEFAULT_CATEGORIES);
  
  const months = generateMonths();
  const currentMonthId = months[0].id;
  
  // Initialize with current month only
  const [activePeriods, setActivePeriods] = useState<string[]>(
    formData.categoryRates && Object.keys(formData.categoryRates).some(catId => 
      Object.keys(formData.categoryRates[catId] || {}).length > 0
    )
      ? Array.from(new Set(
          Object.values(formData.categoryRates as Record<string, Record<string, any>>)
            .flatMap(catMonths => Object.keys(catMonths))
        )).sort()
      : [currentMonthId]
  );
  const [selectedMonth, setSelectedMonth] = useState(activePeriods[0]);
  
  // Category rates by month
  const [categoryRates, setCategoryRates] = useState<Record<string, Record<string, { own: number; credit: number }>>>(
    formData.categoryRates || {}
  );
  
  // Category display order by month
  const [categoryOrder, setCategoryOrder] = useState<Record<string, string[]>>({});
  
  // Monthly limits: { month: { maxPoints: number, maxCategories: number } }
  const [monthlyLimits, setMonthlyLimits] = useState<Record<string, { maxPoints: number; maxCategories: number }>>(
    formData.monthlyLimits || {}
  );

  const toggleCategory = (categoryId: string, month: string) => {
    const newRates = { ...categoryRates };
    if (newRates[categoryId]?.[month]) {
      delete newRates[categoryId][month];
      if (Object.keys(newRates[categoryId] || {}).length === 0) {
        delete newRates[categoryId];
      }
    } else {
      if (!newRates[categoryId]) {
        newRates[categoryId] = {};
      }
      newRates[categoryId][month] = { own: 5, credit: 3 };
    }
    setCategoryRates(newRates);
    updateFormData({ categoryRates: newRates });
  };

  const updateCategoryRate = (categoryId: string, month: string, rate: number, type: 'own' | 'credit') => {
    const newRates = {
      ...categoryRates,
      [categoryId]: {
        ...categoryRates[categoryId],
        [month]: {
          ...categoryRates[categoryId]?.[month],
          [type]: rate,
        }
      }
    };
    setCategoryRates(newRates);
    updateFormData({ categoryRates: newRates });
  };

  const isCategoryActiveInMonth = (categoryId: string, month: string) => {
    return categoryRates[categoryId]?.[month] !== undefined;
  };

  const getCategoryRate = (categoryId: string, month: string, type: 'own' | 'credit') => {
    return categoryRates[categoryId]?.[month]?.[type] || (type === 'own' ? 5 : 3);
  };

  const copyFromPreviousMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const currentIndex = sortedPeriods.indexOf(selectedMonth);
    
    if (currentIndex <= 0) return;
    
    const previousMonth = sortedPeriods[currentIndex - 1];
    const newRates = { ...categoryRates };
    const newLimits = { ...monthlyLimits };
    
    Object.keys(categoryRates).forEach(categoryId => {
      if (categoryRates[categoryId]?.[previousMonth]) {
        if (!newRates[categoryId]) newRates[categoryId] = {};
        newRates[categoryId][selectedMonth] = { ...categoryRates[categoryId][previousMonth] };
      }
    });
    
    if (monthlyLimits[previousMonth]) {
      newLimits[selectedMonth] = { ...monthlyLimits[previousMonth] };
    }
    
    setCategoryRates(newRates);
    setMonthlyLimits(newLimits);
    updateFormData({ categoryRates: newRates, monthlyLimits: newLimits });
    
    if (categoryOrder[previousMonth]) {
      setCategoryOrder({
        ...categoryOrder,
        [selectedMonth]: [...categoryOrder[previousMonth]]
      });
    }
  };

  const getActiveCategories = (month: string) => {
    const activeIds = Object.keys(categoryRates).filter(catId => 
      isCategoryActiveInMonth(catId, month)
    );
    
    if (categoryOrder[month]) {
      const orderedIds = categoryOrder[month].filter(id => activeIds.includes(id));
      const newIds = activeIds.filter(id => !orderedIds.includes(id));
      return [...orderedIds, ...newIds];
    }
    
    return activeIds;
  };

  const moveCategoryUp = (categoryId: string, month: string) => {
    const activeCategories = getActiveCategories(month);
    const currentIndex = activeCategories.indexOf(categoryId);
    if (currentIndex <= 0) return;
    
    const newOrder = [...activeCategories];
    [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
    
    setCategoryOrder({ ...categoryOrder, [month]: newOrder });
  };

  const moveCategoryDown = (categoryId: string, month: string) => {
    const activeCategories = getActiveCategories(month);
    const currentIndex = activeCategories.indexOf(categoryId);
    if (currentIndex < 0 || currentIndex >= activeCategories.length - 1) return;
    
    const newOrder = [...activeCategories];
    [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
    
    setCategoryOrder({ ...categoryOrder, [month]: newOrder });
  };

  const hasPreviousMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    return sortedPeriods.indexOf(selectedMonth) > 0;
  };

  const getPreviousMonthLabel = () => {
    const sortedPeriods = [...activePeriods].sort();
    const currentIndex = sortedPeriods.indexOf(selectedMonth);
    if (currentIndex <= 0) return '';
    const previousMonth = sortedPeriods[currentIndex - 1];
    return months.find(m => m.id === previousMonth)?.label || previousMonth;
  };

  const addNextMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const lastMonthId = sortedPeriods[sortedPeriods.length - 1];
    const lastMonthIndex = months.findIndex(m => m.id === lastMonthId);
    
    if (lastMonthIndex < months.length - 1) {
      setActivePeriods([...activePeriods, months[lastMonthIndex + 1].id]);
    }
  };

  const removeMonth = (monthId: string) => {
    if (activePeriods.length === 1) return;
    
    const newActivePeriods = activePeriods.filter(m => m !== monthId);
    setActivePeriods(newActivePeriods);
    
    if (selectedMonth === monthId) {
      setSelectedMonth(newActivePeriods[0]);
    }
    
    const newRates = { ...categoryRates };
    Object.keys(newRates).forEach(categoryId => {
      if (newRates[categoryId]?.[monthId]) {
        delete newRates[categoryId][monthId];
        if (Object.keys(newRates[categoryId]).length === 0) {
          delete newRates[categoryId];
        }
      }
    });
    setCategoryRates(newRates);
    updateFormData({ categoryRates: newRates });
  };

  const canAddMonth = () => {
    const sortedPeriods = [...activePeriods].sort();
    const lastMonthId = sortedPeriods[sortedPeriods.length - 1];
    const lastMonthIndex = months.findIndex(m => m.id === lastMonthId);
    return lastMonthIndex < months.length - 1;
  };

  const updateMonthlyLimit = (month: string, type: 'maxPoints' | 'maxCategories', value: number) => {
    const newLimits = {
      ...monthlyLimits,
      [month]: {
        maxPoints: type === 'maxPoints' ? value : (monthlyLimits[month]?.maxPoints || 0),
        maxCategories: type === 'maxCategories' ? value : (monthlyLimits[month]?.maxCategories || 0),
      }
    };
    setMonthlyLimits(newLimits);
    updateFormData({ monthlyLimits: newLimits });
  };

  const getMonthLimit = (month: string, type: 'maxPoints' | 'maxCategories') => {
    return monthlyLimits[month]?.[type] || 0;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Налаштування категорійного кешбеку</h2>
          <p className="text-gray-600">Налаштуйте відсоткові ставки для категорій за кожний місяць</p>
        </div>
        <Link
          to="/cashback-categories"
          className="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Управління категоріяи
        </Link>
      </div>

      {/* Month Tabs */}
      {activePeriods.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Налаштування ставок по місяцях</h3>
          </div>
          
          {/* Month tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
            {activePeriods.map((month, index) => {
              const monthLabel = months.find(m => m.id === month)?.label || month;
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
                onClick={addNextMonth}
                className="px-4 py-2 font-medium text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
                title="Додати наступний місяць"
              >
                <Plus className="w-4 h-4" />
                Додати місяць
              </button>
            )}
          </div>

          {/* Category Mode Settings */}
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

            <div className="grid grid-cols-2 gap-4">
              {availableCategories.map(category => {
                const isActive = isCategoryActiveInMonth(category.id, selectedMonth);
                const ownRate = getCategoryRate(category.id, selectedMonth, 'own');
                const creditRate = getCategoryRate(category.id, selectedMonth, 'credit');
                
                return (
                  <div
                    key={category.id}
                    className={`p-3 rounded-xl border-2 transition-all bg-white ${
                      isActive ? 'border-purple-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{category.name}</h4>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCategory(category.id, selectedMonth)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isActive ? 'Обрано' : 'Обрати'}
                      </button>
                    </div>

                    {isActive && (
                      <div className="grid grid-cols-2 gap-2">
                        {/* Own funds rate */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Власні кошти
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              step="0.1"
                              value={ownRate}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value >= 1 && value <= 100) {
                                  updateCategoryRate(category.id, selectedMonth, value, 'own');
                                } else if (e.target.value === '') {
                                  updateCategoryRate(category.id, selectedMonth, 1, 'own');
                                }
                              }}
                              className="w-full pl-2 pr-8 py-1.5 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold text-purple-600 text-sm"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                              <Percent className="w-3 h-3 text-purple-600" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Credit funds rate */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Кредитні кошти
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              step="0.1"
                              value={creditRate}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value >= 1 && value <= 100) {
                                  updateCategoryRate(category.id, selectedMonth, value, 'credit');
                                } else if (e.target.value === '') {
                                  updateCategoryRate(category.id, selectedMonth, 1, 'credit');
                                }
                              }}
                              className="w-full pl-2 pr-8 py-1.5 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold text-orange-600 text-sm"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                              <Percent className="w-3 h-3 text-orange-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Display Order Section */}
            {getActiveCategories(selectedMonth).length > 0 && (
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                <h3 className="font-semibold text-indigo-900 mb-3">
                  📱 Порядок відображення в мобільному додатку
                </h3>
                <p className="text-sm text-indigo-700 mb-4">
                  Налаштуйте в якому порядку категорії будуть відображатися користувачам в мобільному додатку
                </p>
                <div className="space-y-2">
                  {getActiveCategories(selectedMonth).map((categoryId, index) => {
                    const category = availableCategories.find(c => c.id === categoryId);
                    if (!category) return null;
                    
                    const isFirst = index === 0;
                    const isLast = index === getActiveCategories(selectedMonth).length - 1;
                    
                    return (
                      <div
                        key={categoryId}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-indigo-200"
                      >
                        <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white font-semibold rounded-lg text-sm">
                          {index + 1}
                        </span>
                        <span className="text-xl">{category.icon}</span>
                        <span className="flex-1 font-medium text-gray-900">{category.name}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => moveCategoryUp(categoryId, selectedMonth)}
                            disabled={isFirst}
                            className={`p-1.5 rounded transition-colors ${
                              isFirst
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-indigo-600 hover:bg-indigo-100'
                            }`}
                            title="Перемістити вгору"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveCategoryDown(categoryId, selectedMonth)}
                            disabled={isLast}
                            className={`p-1.5 rounded transition-colors ${
                              isLast
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-indigo-600 hover:bg-indigo-100'
                            }`}
                            title="Перемістити вниз"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Monthly Limits Section */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">
                Ліміти для {months.find(m => m.id === selectedMonth)?.label}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    Максимальна кількість накопичених балів
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={getMonthLimit(selectedMonth, 'maxPoints') || ''}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0) {
                          updateMonthlyLimit(selectedMonth, 'maxPoints', value);
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
                
                <div>
                  <label className="block text-sm font-medium text-green-900 mb-2">
                    Кількість категорій для вибору клієнтом
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="1"
                      value={getMonthLimit(selectedMonth, 'maxCategories') || ''}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 20) {
                          updateMonthlyLimit(selectedMonth, 'maxCategories', value);
                        }
                      }}
                      placeholder="напр. 3"
                      className="w-full px-4 py-2.5 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 font-semibold text-green-700 bg-white"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 font-medium">
                      кат.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
