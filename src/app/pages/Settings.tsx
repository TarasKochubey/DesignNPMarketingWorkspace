import { useState } from 'react';
import { Plus, Trash2, Search, Save } from 'lucide-react';

interface BlockedMCC {
  id: string;
  code: string;
  description: string;
}

const BLOCKED_MCC_DEFAULT: BlockedMCC[] = [
  { id: '1', code: '7995', description: 'Азартні ігри (казино)' },
  { id: '2', code: '7801', description: 'Букмекерські контори' },
  { id: '3', code: '7802', description: 'Ставки (бетінг)' },
  { id: '4', code: '7273', description: 'Дейтінг-сервіси' },
  { id: '5', code: '5944', description: 'Торгівля зброєю' },
];

export function Settings() {
  // Blocked MCC state
  const [blockedMCCs, setBlockedMCCs] = useState<BlockedMCC[]>(BLOCKED_MCC_DEFAULT);
  const [newBlockedCode, setNewBlockedCode] = useState('');
  const [newBlockedDescription, setNewBlockedDescription] = useState('');
  const [searchBlockedQuery, setSearchBlockedQuery] = useState('');

  // Transaction Limits state
  const [maxRewardPerTransaction, setMaxRewardPerTransaction] = useState('1000');

  // Client Limits state
  const [monthlyLimit, setMonthlyLimit] = useState('5000');
  const [singleLimit, setSingleLimit] = useState('500');

  // Filter blocked MCCs
  const filteredBlockedMCCs = blockedMCCs.filter(blocked => {
    if (!searchBlockedQuery) return true;
    
    const query = searchBlockedQuery.toLowerCase().trim();
    return blocked.code.includes(query) || blocked.description.toLowerCase().includes(query);
  });

  const addBlockedMCC = () => {
    if (newBlockedCode && newBlockedDescription) {
      const newId = String(blockedMCCs.length + 1);
      setBlockedMCCs([
        ...blockedMCCs,
        { id: newId, code: newBlockedCode, description: newBlockedDescription }
      ]);
      setNewBlockedCode('');
      setNewBlockedDescription('');
    }
  };

  const removeBlockedMCC = (id: string) => {
    setBlockedMCCs(blockedMCCs.filter(b => b.id !== id));
  };

  const handleSaveSettings = () => {
    // In real app, would save to API
    console.log('Settings saved:', {
      blockedMCCs,
      maxRewardPerTransaction,
      monthlyLimit,
      singleLimit
    });
    alert('Налаштування збережено!');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Налаштування</h1>
        <p className="text-gray-600">Глобальні налаштування системи кешбеку</p>
      </div>

      <div className="space-y-8">
        {/* Blocked MCC Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Заборонені MCC</h2>
              <p className="text-sm text-gray-600">Транзакції з цими MCC кодами не отримують кешбек</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук за кодом або описом..."
              value={searchBlockedQuery}
              onChange={(e) => setSearchBlockedQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Add new blocked MCC */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Додати заборонений MCC</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Код MCC</label>
                <input
                  type="text"
                  placeholder="7995"
                  value={newBlockedCode}
                  onChange={(e) => setNewBlockedCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Опис</label>
                <input
                  type="text"
                  placeholder="Азартні ігри"
                  value={newBlockedDescription}
                  onChange={(e) => setNewBlockedDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <button
              onClick={addBlockedMCC}
              disabled={!newBlockedCode || !newBlockedDescription}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                newBlockedCode && newBlockedDescription
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              Додати
            </button>
          </div>

          {/* List of blocked MCCs */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                Список заборонених MCC кодів ({filteredBlockedMCCs.length})
              </h3>
            </div>
            {filteredBlockedMCCs.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                Немає заборонених MCC кодів
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredBlockedMCCs.map((blocked) => (
                  <div
                    key={blocked.id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="px-3 py-1 bg-red-100 text-red-800 rounded-lg font-mono font-semibold text-sm">
                        {blocked.code}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{blocked.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeBlockedMCC(blocked.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transaction Limits Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Ліміти на транзакцію</h2>
            <p className="text-sm text-gray-600">Обмеження винагороди за одну транзакцію</p>
          </div>

          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Максимальна винагорода (балів)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1"
                value={maxRewardPerTransaction}
                onChange={(e) => setMaxRewardPerTransaction(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-gray-900"
                placeholder="1000"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                балів
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Максимальна кількість балів, яку клієнт може отримати за одну транзакцію
            </p>
          </div>
        </div>

        {/* Client Limits Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Ліміти на клієнта</h2>
            <p className="text-sm text-gray-600">Обмеження винагороди для одного клієнта</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Monthly Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Місячний ліміт (балів)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-gray-900"
                  placeholder="5000"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                  балів
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Максимальна кількість балів на місяць для одного клієнта
              </p>
            </div>

            {/* Single Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Разовий ліміт (балів)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={singleLimit}
                  onChange={(e) => setSingleLimit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold text-gray-900"
                  placeholder="500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                  балів
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Максимальна кількість балів за один раз для одного клієнта
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Зберегти налаштування
          </button>
        </div>
      </div>
    </div>
  );
}
