import { useState } from 'react';
import { Store, Search, Plus, X, Calendar, Percent, Edit2, Trash2 } from 'lucide-react';

const comfyLogo = '';
const okkoLogo = '';
const silpoLogo = '';
const ancLogo = '';

interface PartnerCashbackSetupProps {
  formData: any;
  updateFormData: (data: any) => void;
}

interface Terminal {
  merchantId: string;
  terminalId: string;
}

interface Partner {
  id: string;
  name: string;
  category: string;
  terminals: Terminal[];
  isActive: boolean;
  logoUrl?: string;
  ownFundsRate: number;
  creditFundsRate: number;
  periods: PartnerPeriod[];
}

interface PartnerPeriod {
  id: string;
  startMonth: string;  // '2026-02'
  endMonth: string;    // '2026-05'
  ownFundsRate: number;
  creditFundsRate: number;
}

// Mock data - в реальному проєкті це буде завантажуватись з API/стору
const AVAILABLE_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'СІЛЬПО',
    category: 'Продуктові магазини',
    logoUrl: silpoLogo,
    terminals: [
      { merchantId: 'MRC-12345', terminalId: 'TRM-67890' },
      { merchantId: 'MRC-12345', terminalId: 'TRM-67891' },
      { merchantId: 'MRC-12345', terminalId: 'TRM-67892' },
    ],
    isActive: true,
    ownFundsRate: 8,
    creditFundsRate: 5,
    periods: [],
  },
  {
    id: '2',
    name: 'АЗС ОККО',
    category: 'АЗС',
    logoUrl: okkoLogo,
    terminals: [
      { merchantId: 'MRC-23456', terminalId: 'TRM-78901' },
      { merchantId: 'MRC-23456', terminalId: 'TRM-78902' },
    ],
    isActive: true,
    ownFundsRate: 5,
    creditFundsRate: 3,
    periods: [],
  },
  {
    id: '3',
    name: 'COMFY',
    category: 'Електроніка',
    logoUrl: comfyLogo,
    terminals: [
      { merchantId: 'MRC-34567', terminalId: 'TRM-89012' },
    ],
    isActive: true,
    ownFundsRate: 5,
    creditFundsRate: 3,
    periods: [],
  },
  {
    id: '4',
    name: 'Аптека АНЦ',
    category: 'Аптеки',
    logoUrl: ancLogo,
    terminals: [
      { merchantId: 'MRC-45678', terminalId: 'TRM-90123' },
      { merchantId: 'MRC-45678', terminalId: 'TRM-90124' },
      { merchantId: 'MRC-45678', terminalId: 'TRM-90125' },
      { merchantId: 'MRC-45678', terminalId: 'TRM-90126' },
    ],
    isActive: true,
    ownFundsRate: 5,
    creditFundsRate: 3,
    periods: [],
  },
  {
    id: '5',
    name: 'Rozetka Pickup',
    category: 'Електроніка',
    logoUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=200&fit=crop',
    terminals: [
      { merchantId: 'MRC-56789', terminalId: 'TRM-01234' },
      { merchantId: 'MRC-56789', terminalId: 'TRM-01235' },
    ],
    isActive: true,
    ownFundsRate: 5,
    creditFundsRate: 3,
    periods: [],
  },
];

// Generate months dynamically: current month + 11 next months (12 total for a year)
const generateMonths = () => {
  const months: { id: string; label: string; shortLabel: string }[] = [];
  const now = new Date();
  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];
  const monthShort = [
    'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер',
    'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'
  ];
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthId = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthLabel = `${monthNames[month]} ${year}`;
    const shortLabel = `${monthShort[month]} ${year}`;
    
    months.push({ id: monthId, label: monthLabel, shortLabel });
  }
  
  return months;
};

export function PartnerCashbackSetup({ formData, updateFormData }: PartnerCashbackSetupProps) {
  // Generate months once and use them
  const months = generateMonths();

  // Partner periods: { partnerId: period[] } - MULTIPLE periods per partner
  const [partnerPeriods, setPartnerPeriods] = useState<Record<string, PartnerPeriod[]>>({
    '1': [
      { id: 'p1-1', startMonth: '2026-03', endMonth: '2026-05', ownFundsRate: 8, creditFundsRate: 5 },
      { id: 'p1-2', startMonth: '2026-06', endMonth: '2026-08', ownFundsRate: 10, creditFundsRate: 7 },
    ],
    '2': [
      { id: 'p2-1', startMonth: '2026-03', endMonth: '2026-04', ownFundsRate: 5, creditFundsRate: 3 },
    ],
  });

  // Modal states
  const [showPartnerSelector, setShowPartnerSelector] = useState(false);
  const [showPeriodEditor, setShowPeriodEditor] = useState(false);
  const [editingPartner, setEditingPartner] = useState<string | null>(null);
  const [editingPeriodIndex, setEditingPeriodIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [listSearchQuery, setListSearchQuery] = useState(''); // Search in the main list

  // Period editor state
  const [periodForm, setPeriodForm] = useState({
    startMonth: months[0].id,
    endMonth: months[2].id,
    ownFundsRate: 5,
    creditFundsRate: 3,
  });

  // For period editor - separate month and year selection
  const [periodMonthYear, setPeriodMonthYear] = useState({
    startMonth: new Date().getMonth() + 1, // 1-12
    startYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 3 > 12 ? (new Date().getMonth() + 3) % 12 : new Date().getMonth() + 3,
    endYear: new Date().getMonth() + 3 > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
  });

  const selectedPartnerIds = Object.keys(partnerPeriods);
  
  // Filter selected partners by search query
  const selectedPartners = AVAILABLE_PARTNERS
    .filter(p => selectedPartnerIds.includes(p.id))
    .filter(p => 
      !listSearchQuery ||
      p.name.toLowerCase().includes(listSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(listSearchQuery.toLowerCase())
    );
  
  const availablePartners = AVAILABLE_PARTNERS.filter(p => 
    p.isActive && 
    !selectedPartnerIds.includes(p.id) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddPartner = (partnerId: string) => {
    // Get partner from available partners
    const partner = getPartnerById(partnerId);
    if (!partner) return;

    // Add partner with default period based on current date and partner's default rates
    const now = new Date();
    const startMonth = now.getMonth() + 1; // Current month
    const startYear = now.getFullYear();
    const endMonth = (now.getMonth() + 3) % 12 || 12; // 3 months ahead
    const endYear = now.getMonth() + 3 > 11 ? now.getFullYear() + 1 : now.getFullYear();

    const newPeriod: PartnerPeriod = {
      id: `p${partnerId}-${Date.now()}`,
      startMonth: `${startYear}-${String(startMonth).padStart(2, '0')}`,
      endMonth: `${endYear}-${String(endMonth).padStart(2, '0')}`,
      ownFundsRate: partner.ownFundsRate, // Use partner's default rate
      creditFundsRate: partner.creditFundsRate, // Use partner's default rate
    };

    const newPeriods = { ...partnerPeriods };
    newPeriods[partnerId] = [newPeriod];

    setPartnerPeriods(newPeriods);
    setShowPartnerSelector(false);
  };

  const handleAddPeriodToPartner = (partnerId: string) => {
    const partner = getPartnerById(partnerId);
    if (!partner) return;

    setEditingPartner(partnerId);
    setEditingPeriodIndex(null);

    // Set default values
    const now = new Date();
    const startMonth = now.getMonth() + 1;
    const startYear = now.getFullYear();
    const endMonth = (now.getMonth() + 3) % 12 || 12;
    const endYear = now.getMonth() + 3 > 11 ? now.getFullYear() + 1 : now.getFullYear();

    setPeriodMonthYear({
      startMonth,
      startYear,
      endMonth,
      endYear,
    });

    setPeriodForm({
      startMonth: `${startYear}-${String(startMonth).padStart(2, '0')}`,
      endMonth: `${endYear}-${String(endMonth).padStart(2, '0')}`,
      ownFundsRate: partner.ownFundsRate,
      creditFundsRate: partner.creditFundsRate,
    });

    setShowPeriodEditor(true);
  };

  const handleEditPeriod = (partnerId: string, periodIndex: number) => {
    const period = partnerPeriods[partnerId]?.[periodIndex];
    if (!period) return;

    setEditingPartner(partnerId);
    setEditingPeriodIndex(periodIndex);

    // Parse start month
    const [startYear, startMonth] = period.startMonth.split('-').map(Number);
    // Parse end month
    const [endYear, endMonth] = period.endMonth.split('-').map(Number);

    setPeriodMonthYear({
      startMonth,
      startYear,
      endMonth,
      endYear,
    });

    setPeriodForm({
      startMonth: period.startMonth,
      endMonth: period.endMonth,
      ownFundsRate: period.ownFundsRate,
      creditFundsRate: period.creditFundsRate,
    });
    setShowPeriodEditor(true);
  };

  const handleSavePeriod = () => {
    if (!editingPartner) return;

    // Construct month IDs from separate selects
    const startMonthId = `${periodMonthYear.startYear}-${String(periodMonthYear.startMonth).padStart(2, '0')}`;
    const endMonthId = `${periodMonthYear.endYear}-${String(periodMonthYear.endMonth).padStart(2, '0')}`;

    const newPeriods = { ...partnerPeriods };

    if (editingPeriodIndex !== null) {
      // Update existing period
      const periods = [...(newPeriods[editingPartner] || [])];
      periods[editingPeriodIndex] = {
        ...periods[editingPeriodIndex],
        ...periodForm,
        startMonth: startMonthId,
        endMonth: endMonthId,
      };
      newPeriods[editingPartner] = periods;
    } else {
      // Add new period
      const newPeriod: PartnerPeriod = {
        id: `p${editingPartner}-${Date.now()}`,
        ...periodForm,
        startMonth: startMonthId,
        endMonth: endMonthId,
      };

      newPeriods[editingPartner] = [...(newPeriods[editingPartner] || []), newPeriod];
    }

    setPartnerPeriods(newPeriods);
    setShowPeriodEditor(false);
    setEditingPartner(null);
    setEditingPeriodIndex(null);
  };

  const handleDeletePeriod = (partnerId: string, periodIndex: number) => {
    if (!confirm('Ви впевнені, що хочете видалити цей період?')) {
      return;
    }

    const newPeriods = { ...partnerPeriods };
    const periods = newPeriods[partnerId] || [];

    if (periods.length === 1) {
      // If this is the last period, remove the partner entirely
      if (!confirm('Це останній період партнера. Партнер буде видалений з кампанії. Продовжити?')) {
        return;
      }
      delete newPeriods[partnerId];
    } else {
      // Remove only this period
      newPeriods[partnerId] = periods.filter((_, idx) => idx !== periodIndex);
    }

    setPartnerPeriods(newPeriods);
  };

  const handleDeletePartner = (partnerId: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цього партнера з усіма його періодами?')) {
      return;
    }

    const newPeriods = { ...partnerPeriods };
    delete newPeriods[partnerId];
    setPartnerPeriods(newPeriods);
  };

  const getPartnerById = (id: string) => AVAILABLE_PARTNERS.find(p => p.id === id);

  const getMonthLabel = (monthId: string, short = false) => {
    const month = months.find(m => m.id === monthId);
    return month ? (short ? month.shortLabel : month.label) : monthId;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Налаштування партнерського кешбеку</h2>
        <p className="text-gray-600">
          Додайте партнерів та налаштуйте періоди дії кешбеку зі ставками
        </p>
      </div>

      {/* Add Partner Button and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={listSearchQuery}
            onChange={(e) => setListSearchQuery(e.target.value)}
            placeholder="Пошук партнерів..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowPartnerSelector(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Додати партнера
        </button>
      </div>

      {/* Partners List */}
      <div className="space-y-4">
        {selectedPartners.length === 0 ? (
          <div className="p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {listSearchQuery ? 'Партнерів не знайдено' : 'Партнерів не додано'}
            </h3>
            <p className="text-gray-600 mb-6">
              {listSearchQuery 
                ? 'Спробуйте змінити параметри пошуку' 
                : 'Додайте партнерів та налаштуйте періоди дії кешбеку'}
            </p>
            {!listSearchQuery && (
              <button
                onClick={() => setShowPartnerSelector(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Додати першого партнера
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {selectedPartners.map(partner => {
                const periods = partnerPeriods[partner.id] || [];

                return (
                  <div key={partner.id} className="px-6 py-4 hover:bg-purple-50/50 transition-colors">
                    <div className="flex items-start gap-6">
                      {/* Partner Logo */}
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                      )}

                      {/* Partner Info */}
                      <div className="flex-1 min-w-0">
                        {/* Partner Name & Category */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                            <span className="text-sm text-gray-600">{partner.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddPeriodToPartner(partner.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              Додати період
                            </button>
                            <button
                              onClick={() => handleDeletePartner(partner.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Видалити партнера"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Periods List */}
                        <div className="space-y-2">
                          {periods.length === 0 ? (
                            <div className="p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
                              <p className="text-sm text-gray-600">Періодів не додано</p>
                            </div>
                          ) : (
                            periods.map((period, periodIndex) => (
                              <div key={period.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="flex items-center gap-2 text-purple-600 flex-shrink-0">
                                      <Calendar className="w-4 h-4" />
                                      <span className="text-sm font-semibold whitespace-nowrap">
                                        {getMonthLabel(period.startMonth, true)} — {getMonthLabel(period.endMonth, true)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                      <div className="text-sm whitespace-nowrap">
                                        <span className="text-gray-600">Власні кошти:</span>
                                        <span className="ml-1 font-semibold text-purple-600">{period.ownFundsRate}%</span>
                                      </div>
                                      <div className="text-sm whitespace-nowrap">
                                        <span className="text-gray-600">Кредитні кошти:</span>
                                        <span className="ml-1 font-semibold text-orange-600">{period.creditFundsRate}%</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <button
                                      onClick={() => handleEditPeriod(partner.id, periodIndex)}
                                      className="p-1.5 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                                      title="Редагувати період"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePeriod(partner.id, periodIndex)}
                                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                                      title="Видалити період"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Partner Selector Modal */}
      {showPartnerSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Додати партнера</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Оберіть партнера для налаштування кешбеку
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPartnerSelector(false);
                    setSearchQuery('');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Пошук партнерів..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {availablePartners.length === 0 && !searchQuery ? (
                <div className="p-8 text-center">
                  <Store className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Всі доступні партнери вже додані</p>
                </div>
              ) : availablePartners.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">Партнерів не знайдено</p>
                  <p className="text-sm text-gray-500 mt-1">Спробуйте змінити параметри пошуку</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {availablePartners.map((partner) => (
                    <button
                      key={partner.id}
                      onClick={() => handleAddPartner(partner.id)}
                      className="w-full p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 transition-all text-left"
                    >
                      <div className="flex items-start gap-4">
                        {partner.logoUrl ? (
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Store className="w-6 h-6 text-purple-600" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">{partner.name}</h4>
                          <p className="text-sm text-gray-600">{partner.category}</p>
                          <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mt-2">
                            {partner.terminals.length} {partner.terminals.length === 1 ? 'термінал' : 'терміналів'}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Period Editor Modal */}
      {showPeriodEditor && editingPartner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {editingPeriodIndex !== null ? 'Редагувати період' : 'Додати період'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {getPartnerById(editingPartner)?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPeriodEditor(false);
                    setEditingPartner(null);
                    setEditingPeriodIndex(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Period Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Період дії кешбеку
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Start period */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">З місяця</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={periodMonthYear.startMonth}
                        onChange={(e) => setPeriodMonthYear({ ...periodMonthYear, startMonth: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'].map((name, idx) => (
                          <option key={idx + 1} value={idx + 1}>{name}</option>
                        ))}
                      </select>
                      <select
                        value={periodMonthYear.startYear}
                        onChange={(e) => setPeriodMonthYear({ ...periodMonthYear, startYear: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* End period */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">По місяць</label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={periodMonthYear.endMonth}
                        onChange={(e) => setPeriodMonthYear({ ...periodMonthYear, endMonth: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'].map((name, idx) => (
                          <option key={idx + 1} value={idx + 1}>{name}</option>
                        ))}
                      </select>
                      <select
                        value={periodMonthYear.endYear}
                        onChange={(e) => setPeriodMonthYear({ ...periodMonthYear, endYear: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ставки кешбеку
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Власні кошти
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={periodForm.ownFundsRate}
                        onChange={(e) => setPeriodForm({ ...periodForm, ownFundsRate: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-3 pr-10 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold text-purple-600"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Percent className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Кредитні кошти
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={periodForm.creditFundsRate}
                        onChange={(e) => setPeriodForm({ ...periodForm, creditFundsRate: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-3 pr-10 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold text-orange-600"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Percent className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setShowPeriodEditor(false);
                  setEditingPartner(null);
                  setEditingPeriodIndex(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Скасувати
              </button>
              <button
                onClick={handleSavePeriod}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {editingPeriodIndex !== null ? 'Зберегти зміни' : 'Додати період'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}