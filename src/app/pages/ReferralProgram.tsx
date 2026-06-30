import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Trash2, Clock, AlertCircle, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  phone: string;
  lastName: string;
}

type HistoryEventType =
  | 'user_added'
  | 'user_removed'
  | 'debit_changed'
  | 'credit_changed'
  | 'activated'
  | 'deactivated';

interface HistoryEntry {
  id: string;
  timestamp: string;
  adminLogin: string;
  eventType: HistoryEventType;
  details: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_SEARCH_USERS: User[] = [
  { id: '201', phone: '+380441234567', lastName: 'Гонта' },
  { id: '202', phone: '+380442345678', lastName: 'Дорошенко' },
  { id: '203', phone: '+380443456789', lastName: 'Верещагін' },
  { id: '204', phone: '+380444567890', lastName: 'Нечипоренко' },
  { id: '205', phone: '+380445678901', lastName: 'Сагайдачний' },
  { id: '206', phone: '+380446789012', lastName: 'Паламаренко' },
  { id: '207', phone: '+380447890123', lastName: 'Кириленко' },
  { id: '208', phone: '+380448901234', lastName: 'Остапенко' },
];

const LAST_NAMES = [
  'Шевченко', 'Коваленко', 'Бондаренко', 'Ткаченко', 'Кравченко',
  'Олійник', 'Шевчук', 'Поліщук', 'Савченко', 'Тимошенко',
  'Гриценко', 'Мороз', 'Петренко', 'Іваненко', 'Марченко',
  'Лисенко', 'Романенко', 'Павленко', 'Зінченко', 'Науменко',
];

const generateMockAddedUsers = (): User[] => {
  const users: User[] = [];
  const prefixes = ['050', '066', '067', '068', '073', '093', '095', '096', '097', '098', '099', '063'];
  for (let i = 0; i < 100; i++) {
    const prefix = prefixes[i % prefixes.length];
    const num = String(1000000 + i * 7919).slice(0, 7);
    users.push({
      id: String(i + 1),
      phone: `+380${prefix}${num}`,
      lastName: LAST_NAMES[i % LAST_NAMES.length],
    });
  }
  return users;
};

const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 'h1', timestamp: '28.06.2025 14:32', adminLogin: 'marketing@novapay.ua', eventType: 'activated', details: '' },
  { id: 'h2', timestamp: '27.06.2025 11:15', adminLogin: 'marketing@novapay.ua', eventType: 'debit_changed', details: '100 → 250' },
  { id: 'h3', timestamp: '27.06.2025 11:10', adminLogin: 'marketing@novapay.ua', eventType: 'credit_changed', details: '150 → 300' },
  { id: 'h4', timestamp: '26.06.2025 09:44', adminLogin: 'admin@novapay.ua', eventType: 'user_added', details: '+380500113268' },
  { id: 'h5', timestamp: '25.06.2025 16:00', adminLogin: 'admin@novapay.ua', eventType: 'user_added', details: '+380509876543' },
  { id: 'h6', timestamp: '24.06.2025 10:22', adminLogin: 'admin@novapay.ua', eventType: 'deactivated', details: '' },
  { id: 'h7', timestamp: '23.06.2025 13:05', adminLogin: 'admin@novapay.ua', eventType: 'user_added', details: '+380502345678' },
  { id: 'h8', timestamp: '22.06.2025 09:18', adminLogin: 'marketing@novapay.ua', eventType: 'debit_changed', details: '50 → 100' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EVENT_LABELS: Record<HistoryEventType, string> = {
  user_added: 'Додано користувача',
  user_removed: 'Видалено користувача',
  debit_changed: 'Змінено суму дебетної картки',
  credit_changed: 'Змінено суму кредитної картки',
  activated: 'Активовано спеціальну винагороду',
  deactivated: 'Деактивовано спеціальну винагороду',
};

const EVENT_COLORS: Record<HistoryEventType, string> = {
  user_added: 'text-green-700 bg-green-50',
  user_removed: 'text-red-700 bg-red-50',
  debit_changed: 'text-blue-700 bg-blue-50',
  credit_changed: 'text-blue-700 bg-blue-50',
  activated: 'text-emerald-700 bg-emerald-50',
  deactivated: 'text-gray-600 bg-gray-100',
};

function validateRewardAmount(val: string): string | null {
  if (val === '') return null;
  if (!/^\d+$/.test(val)) return 'Невірний формат';
  if (parseInt(val, 10) <= 0) return 'Невірний формат';
  return null;
}

const PAGE_SIZE = 20;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
      active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
      {active ? 'Активна' : 'Неактивна'}
    </span>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        checked ? 'bg-purple-600' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  );
}

function RewardField({ label, savedValue, onSave }: { label: string; savedValue: number; onSave: (v: number) => void }) {
  const [input, setInput] = useState(String(savedValue));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setInput(raw);
    setError(validateRewardAmount(raw));
  };

  const isDirty = input !== String(savedValue);
  const canSave = isDirty && !error && input !== '' && parseInt(input, 10) > 0;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            inputMode="numeric"
            value={input}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
            }`}
            placeholder="0"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">грн</span>
          {error && (
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span className="text-xs text-red-600">{error}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => canSave && onSave(parseInt(input, 10))}
          disabled={!canSave}
          className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap self-start"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ user, onConfirm, onCancel }: { user: User; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Видалити користувача?</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Користувача{' '}
          <span className="font-medium text-gray-900">{user.phone} ({user.lastName})</span>{' '}
          буде видалено зі списку спеціальної винагороди.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Скасувати
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── History side panel ───────────────────────────────────────────────────────

function HistoryPanel({ history, onClose }: { history: HistoryEntry[]; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[560px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Історія змін</h2>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
              {history.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Clock className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm">Змін ще не було</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((entry) => (
                <div key={entry.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-1.5 ${EVENT_COLORS[entry.eventType]}`}>
                        {EVENT_LABELS[entry.eventType]}
                      </span>
                      {entry.details && (
                        <p className="text-sm font-mono text-gray-700">{entry.details}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{entry.adminLogin}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {entry.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ReferralProgram() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [debitReward, setDebitReward] = useState(250);
  const [creditReward, setCreditReward] = useState(300);

  const [addedUsers, setAddedUsers] = useState<User[]>(generateMockAddedUsers());
  const [userSearch, setUserSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [notification, setNotification] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Filter + paginate users
  const filteredUsers = addedUsers.filter((u) =>
    !userSearch ||
    u.phone.includes(userSearch) ||
    u.lastName.toLowerCase().includes(userSearch.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const pagedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleUserSearch = (val: string) => {
    setUserSearch(val);
    setCurrentPage(1);
  };

  // Autocomplete search
  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setSelectedUser(null);
    if (val.length >= 3) {
      const digits = val.replace(/\D/g, '');
      const results = MOCK_SEARCH_USERS.filter((u) => {
        const userDigits = u.phone.replace(/\D/g, '');
        return userDigits.includes(digits);
      }).slice(0, 5);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    const digits = query.replace(/\D/g, '');
    if (!digits) return <>{text}</>;
    const userDigits = text.replace(/\D/g, '');
    const idx = userDigits.indexOf(digits);
    if (idx === -1) return <>{text}</>;
    let dCount = 0;
    let start = -1;
    let end = -1;
    for (let i = 0; i < text.length; i++) {
      if (/\d/.test(text[i])) {
        if (dCount === idx) start = i;
        dCount++;
        if (dCount === idx + digits.length) { end = i + 1; break; }
      }
    }
    if (start === -1 || end === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, start)}
        <mark className="bg-yellow-200 text-gray-900 rounded-sm">{text.slice(start, end)}</mark>
        {text.slice(end)}
      </>
    );
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(`${user.phone} (${user.lastName})`);
    setShowDropdown(false);
  };

  const handleAddUser = () => {
    if (!selectedUser) return;
    if (addedUsers.find((u) => u.id === selectedUser.id)) return;
    setAddedUsers((prev) => [...prev, selectedUser]);
    pushHistory('user_added', selectedUser.phone);
    setSearchQuery('');
    setSelectedUser(null);
    setCurrentPage(1);
    notify('Користувача додано');
  };

  const handleDeleteConfirm = () => {
    if (!userToDelete) return;
    setAddedUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    pushHistory('user_removed', userToDelete.phone);
    setUserToDelete(null);
    notify('Користувача видалено');
  };

  const handleToggle = (val: boolean) => {
    setIsActive(val);
    pushHistory(val ? 'activated' : 'deactivated', '');
  };

  const handleSaveDebit = (val: number) => {
    pushHistory('debit_changed', `${debitReward} → ${val}`);
    setDebitReward(val);
    notify('Суму збережено');
  };

  const handleSaveCredit = (val: number) => {
    pushHistory('credit_changed', `${creditReward} → ${val}`);
    setCreditReward(val);
    notify('Суму збережено');
  };

  const pushHistory = (eventType: HistoryEventType, details: string) => {
    const now = new Date();
    const timestamp = now.toLocaleString('uk-UA', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).replace(',', '');
    setHistory((prev) => [{
      id: `h${Date.now()}`,
      timestamp,
      adminLogin: 'admin@novapay.ua',
      eventType,
      details,
    }, ...prev]);
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  const isAlreadyAdded = selectedUser ? !!addedUsers.find((u) => u.id === selectedUser.id) : false;

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Реферальна програма</h1>
            <p className="text-sm text-gray-500 mt-0.5">Спеціальна винагорода для обраних клієнтів</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge active={isActive} />
            <button
              onClick={() => navigate('/referral/history')}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Історія змін
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6 max-w-4xl">

        {/* ── Zone 1: Controls ── */}
        <div className={`bg-white rounded-xl border transition-colors ${isActive ? 'border-purple-200' : 'border-gray-200'}`}>
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Налаштування винагороди</h2>
          </div>

          {/* Toggle */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Активувати спеціальну винагороду</p>
              <p className="text-xs text-gray-500 mt-0.5">Застосовується до всіх користувачів у переліку нижче</p>
            </div>
            <ToggleSwitch checked={isActive} onChange={handleToggle} />
          </div>

          {/* Reward amounts */}
          <div className={`px-6 py-5 grid grid-cols-2 gap-6 transition-opacity ${isActive ? '' : 'opacity-50 pointer-events-none'}`}>
            <RewardField label="Сума для дебетної картки" savedValue={debitReward} onSave={handleSaveDebit} />
            <RewardField label="Сума для кредитної картки" savedValue={creditReward} onSave={handleSaveCredit} />
          </div>
        </div>

        {/* ── Zone 2: Users ── */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Список користувачів</h2>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {addedUsers.length}
              </span>
            </div>
          </div>

          {/* Add user row */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-medium text-gray-500 mb-2">Додати користувача</p>
            <div className="flex gap-2">
              <div ref={searchRef} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                  placeholder="Пошук за номером телефону (+380...)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {searchResults.map((user) => {
                      const alreadyIn = !!addedUsers.find((u) => u.id === user.id);
                      return (
                        <button
                          key={user.id}
                          onClick={() => !alreadyIn && handleSelectUser(user)}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                            alreadyIn ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <span className="font-mono">
                            {highlightMatch(user.phone, searchQuery)} ({user.lastName})
                          </span>
                          {alreadyIn && <span className="text-xs text-gray-400">вже додано</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
                {showDropdown && searchQuery.length >= 3 && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-4 py-3">
                    <p className="text-sm text-gray-500">Користувачів не знайдено</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleAddUser}
                disabled={!selectedUser || isAlreadyAdded}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                Додати
              </button>
            </div>
          </div>

          {/* Filter row */}
          {addedUsers.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => handleUserSearch(e.target.value)}
                  placeholder="Фільтр за номером або прізвищем"
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* Users list */}
          <div className="divide-y divide-gray-100">
            {pagedUsers.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-sm text-gray-400">
                  {userSearch ? 'Нічого не знайдено за фільтром' : 'Список порожній. Додайте першого користувача.'}
                </p>
              </div>
            ) : (
              pagedUsers.map((user) => (
                <div key={user.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple-700">{user.lastName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-mono text-gray-900">{user.phone}</p>
                      <p className="text-xs text-gray-500">{user.lastName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUserToDelete(user)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Видалити"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} з {filteredUsers.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-600 px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {userToDelete && (
        <DeleteConfirmModal
          user={userToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setUserToDelete(null)}
        />
      )}

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {notification}
        </div>
      )}
    </div>
  );
}
