import { Plus, Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { X, Save } from 'lucide-react';

const audiences = [
  {
    id: 1,
    name: 'Клієнти з високими витратами',
    description: 'Клієнти з місячними витратами > ₴10,000',
    size: 8234,
    avgSpend: 12450,
    campaigns: 3,
  },
  {
    id: 2,
    name: 'Нові клієнти',
    description: 'Зареєстровані за останні 30 днів',
    size: 15234,
    avgSpend: 2100,
    campaigns: 2,
  },
  {
    id: 3,
    name: 'Покупці продуктів',
    description: 'Активні в категорії продуктів',
    size: 12534,
    avgSpend: 3450,
    campaigns: 4,
  },
  {
    id: 4,
    name: 'Неактивні користувачі',
    description: 'Без транзакцій за останні 30 днів',
    size: 5821,
    avgSpend: 0,
    campaigns: 1,
  },
  {
    id: 5,
    name: 'Постійні клієнти аптек',
    description: 'Часті покупки в аптеках',
    size: 4523,
    avgSpend: 1850,
    campaigns: 2,
  },
];

interface AudienceFormData {
  name: string;
  description: string;
  criteria: {
    minSpend?: string;
    maxSpend?: string;
    registrationDays?: string;
    categories?: string[];
    transactionDays?: string;
  };
}

export function Audiences() {
  const [showModal, setShowModal] = useState(false);
  const [editingAudience, setEditingAudience] = useState<typeof audiences[0] | null>(null);
  const [formData, setFormData] = useState<AudienceFormData>({
    name: '',
    description: '',
    criteria: {},
  });

  const handleOpenCreate = () => {
    setEditingAudience(null);
    setFormData({
      name: '',
      description: '',
      criteria: {},
    });
    setShowModal(true);
  };

  const handleOpenEdit = (audience: typeof audiences[0]) => {
    setEditingAudience(audience);
    setFormData({
      name: audience.name,
      description: audience.description,
      criteria: {},
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingAudience(null);
  };

  const handleSave = () => {
    // В реальному застосунку тут буде API виклик
    console.log('Saving audience:', formData);
    handleClose();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Аудиторії</h1>
            <p className="text-gray-600">Управління та створення сегментів клієнтів</p>
          </div>
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Створити аудиторію
          </button>
        </div>
      </div>

      {/* Audience cards */}
      <div className="grid grid-cols-3 gap-6">
        {audiences.map((audience) => (
          <div
            key={audience.id}
            onClick={() => handleOpenEdit(audience)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {audience.campaigns} campaigns
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{audience.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{audience.description}</p>

            <div className="pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Розмір аудиторії</p>
                <p className="text-lg font-bold text-gray-900">{audience.size.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Create new card */}
        <div 
          onClick={handleOpenCreate}
          className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer min-h-[280px]"
        >
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-600">Створити нову аудиторію</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {editingAudience ? 'Редагувати аудиторію' : 'Створити аудиторію'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Налаштуйте параметри сегментації клієнтів
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Назва аудиторії *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Наприклад: Активні користувачі"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Опис
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Короткий опис аудиторії"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Criteria Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Критерії сегментації</h3>
                  <button
                    onClick={() => {
                      // Додати новий критерій
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Додати критерій
                  </button>
                </div>
                
                <div className="space-y-3">
                  {/* Spending range */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                          <option value="spend_range">Діапазон витрат</option>
                          <option value="registration_period">Період реєстрації</option>
                          <option value="transaction_activity">Активність транзакцій</option>
                          <option value="category_activity">Активність за категорією</option>
                          <option value="card_type">Тип картки</option>
                          <option value="kyc_status">Статус верифікації</option>
                        </select>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={formData.criteria.minSpend || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              criteria: { ...formData.criteria, minSpend: e.target.value }
                            })}
                            placeholder="Від (₴)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={formData.criteria.maxSpend || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              criteria: { ...formData.criteria, maxSpend: e.target.value }
                            })}
                            placeholder="До (₴)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Registration period */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                          <option value="spend_range">Діапазон витрат</option>
                          <option value="registration_period" selected>Період реєстрації</option>
                          <option value="transaction_activity">Активність транзакцій</option>
                          <option value="category_activity">Активність за категорією</option>
                          <option value="card_type">Тип картки</option>
                          <option value="kyc_status">Статус верифікації</option>
                        </select>
                        <input
                          type="number"
                          value={formData.criteria.registrationDays || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            criteria: { ...formData.criteria, registrationDays: e.target.value }
                          })}
                          placeholder="За останні N днів"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Transaction activity */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                          <option value="spend_range">Діапазон витрат</option>
                          <option value="registration_period">Період реєстрації</option>
                          <option value="transaction_activity" selected>Активність транзакцій</option>
                          <option value="category_activity">Активність за категорією</option>
                          <option value="card_type">Тип картки</option>
                          <option value="kyc_status">Статус верифікації</option>
                        </select>
                        <input
                          type="number"
                          value={formData.criteria.transactionDays || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            criteria: { ...formData.criteria, transactionDays: e.target.value }
                          })}
                          placeholder="Без транзакцій N днів"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>💡 Підказка:</strong> Аудиторії автоматично оновлюються на основі заданих критеріїв. 
                  Розмір аудиторії буде розрахований після збереження.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Скасувати
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {editingAudience ? 'Зберегти зміни' : 'Створити аудиторію'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}