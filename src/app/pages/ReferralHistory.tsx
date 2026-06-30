import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

type HistoryEventType =
  | 'user_added'
  | 'user_removed'
  | 'debit_changed'
  | 'credit_changed'
  | 'activated'
  | 'deactivated';

interface HistoryEntry {
  id: string;
  date: string;       // 'YYYY-MM-DD'
  time: string;       // 'HH:MM'
  adminLogin: string;
  eventType: HistoryEventType;
  details: string;    // phone or 'prev → next' or ''
}

const EVENT_LABELS: Record<HistoryEventType, string> = {
  user_added: 'Додано користувача',
  user_removed: 'Видалено користувача',
  debit_changed: 'Змінено суму дебетної картки',
  credit_changed: 'Змінено суму кредитної картки',
  activated: 'Активовано винагороду',
  deactivated: 'Деактивовано винагороду',
};

const EVENT_COLORS: Record<HistoryEventType, string> = {
  user_added: 'text-green-700 bg-green-50 border-green-100',
  user_removed: 'text-red-700 bg-red-50 border-red-100',
  debit_changed: 'text-blue-700 bg-blue-50 border-blue-100',
  credit_changed: 'text-blue-700 bg-blue-50 border-blue-100',
  activated: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  deactivated: 'text-gray-600 bg-gray-100 border-gray-200',
};

const EVENT_TYPE_OPTIONS: { value: '' | HistoryEventType; label: string }[] = [
  { value: '', label: 'Всі події' },
  { value: 'user_added', label: 'Додано користувача' },
  { value: 'user_removed', label: 'Видалено користувача' },
  { value: 'debit_changed', label: 'Змінено суму дебетної картки' },
  { value: 'credit_changed', label: 'Змінено суму кредитної картки' },
  { value: 'activated', label: 'Активовано винагороду' },
  { value: 'deactivated', label: 'Деактивовано винагороду' },
];

// ─── Generate mock history (80 entries) ───────────────────────────────────────

const ADMINS = ['marketing@novapay.ua', 'admin@novapay.ua', 'manager@novapay.ua'];
const PHONES = [
  '+380500113268', '+380501234567', '+380509876543', '+380502345678',
  '+380503456789', '+380504567890', '+380505678901', '+380506789012',
  '+380507890123', '+380508901234', '+380631234567', '+380661234567',
  '+380671234567', '+380681234567', '+380691234567', '+380731234567',
];
const EVENT_TYPES: HistoryEventType[] = [
  'user_added', 'user_added', 'user_added',
  'user_removed',
  'debit_changed', 'credit_changed',
  'activated', 'deactivated',
];

function pad(n: number) { return String(n).padStart(2, '0'); }

function generateHistory(): HistoryEntry[] {
  const entries: HistoryEntry[] = [];
  const now = new Date(2025, 5, 28); // 28 Jun 2025
  for (let i = 0; i < 80; i++) {
    const daysAgo = Math.floor(i / 3);
    const d = new Date(now);
    d.setDate(d.getDate() - daysAgo);
    const eventType = EVENT_TYPES[i % EVENT_TYPES.length];
    const phone = PHONES[i % PHONES.length];
    let details = '';
    if (eventType === 'user_added' || eventType === 'user_removed') details = phone;
    if (eventType === 'debit_changed') details = `${100 + i * 5} → ${120 + i * 5}`;
    if (eventType === 'credit_changed') details = `${80 + i * 3} → ${100 + i * 3}`;
    entries.push({
      id: `h${i}`,
      date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      time: `${pad(9 + (i % 10))}:${pad((i * 7) % 60)}`,
      adminLogin: ADMINS[i % ADMINS.length],
      eventType,
      details,
    });
  }
  return entries;
}

const ALL_HISTORY = generateHistory();
const PAGE_SIZE = 25;

// ─── Component ────────────────────────────────────────────────────────────────

export function ReferralHistory() {
  const navigate = useNavigate();

  const [phoneSearch, setPhoneSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<'' | HistoryEventType>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return ALL_HISTORY.filter((entry) => {
      if (phoneSearch && !entry.details.includes(phoneSearch.replace(/\D/g, '').replace(/^/, ''))) {
        // Match phone loosely
        const digits = phoneSearch.replace(/\D/g, '');
        if (digits && !entry.details.replace(/\D/g, '').includes(digits)) return false;
        if (!digits && !entry.details.toLowerCase().includes(phoneSearch.toLowerCase())) return false;
      }
      if (eventTypeFilter && entry.eventType !== eventTypeFilter) return false;
      if (dateFrom && entry.date < dateFrom) return false;
      if (dateTo && entry.date > dateTo) return false;
      return true;
    });
  }, [phoneSearch, eventTypeFilter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetFilters = () => {
    setPhoneSearch('');
    setEventTypeFilter('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const hasActiveFilters = phoneSearch || eventTypeFilter || dateFrom || dateTo;

  const handleFilter = (fn: () => void) => {
    fn();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/referral')}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Історія змін</h1>
            <p className="text-sm text-gray-500 mt-0.5">Реферальна програма · спеціальна винагорода</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 max-w-6xl">

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-5">
          <div className="grid grid-cols-4 gap-4">
            {/* Phone search */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Номер телефону</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={phoneSearch}
                  onChange={(e) => handleFilter(() => setPhoneSearch(e.target.value))}
                  placeholder="+380..."
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Event type */}
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Тип події</label>
              <select
                value={eventTypeFilter}
                onChange={(e) => handleFilter(() => setEventTypeFilter(e.target.value as '' | HistoryEventType))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                {EVENT_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Date from */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Дата з</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => handleFilter(() => setDateFrom(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Date to */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Дата по</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => handleFilter(() => setDateTo(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Знайдено: <span className="font-medium text-gray-900">{filtered.length}</span> записів
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Скинути фільтри
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-xs text-gray-500">
              {!hasActiveFilters
                ? `Всього ${ALL_HISTORY.length} записів`
                : `${filtered.length} з ${ALL_HISTORY.length}`}
            </span>
            {totalPages > 1 && (
              <span className="text-xs text-gray-500">
                Сторінка {currentPage} з {totalPages}
              </span>
            )}
          </div>

          {paged.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-400">Записів не знайдено. Спробуйте змінити фільтри.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide w-36">Дата і час</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Адміністратор</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Подія</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Деталі</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">
                      <div>{entry.date.split('-').reverse().join('.')}</div>
                      <div className="text-gray-400">{entry.time}</div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{entry.adminLogin}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${EVENT_COLORS[entry.eventType]}`}>
                        {EVENT_LABELS[entry.eventType]}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-mono text-gray-700">
                      {entry.details || <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} з {filtered.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Перша
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                    if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('ellipsis');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === 'ellipsis' ? (
                      <span key={`e${i}`} className="px-1 text-gray-400 text-xs">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-8 h-8 text-xs rounded-lg transition-colors ${
                          currentPage === p
                            ? 'bg-purple-600 text-white font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Остання
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
