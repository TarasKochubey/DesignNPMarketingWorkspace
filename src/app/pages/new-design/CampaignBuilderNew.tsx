import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Save, X, Plus, Trash2, ChevronDown } from 'lucide-react';

export default function CampaignBuilderNew() {
  const [step, setStep] = useState<'basic' | 'cashback' | 'audience'>('basic');
  const [campaignType, setCampaignType] = useState('category');
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <Link 
            to="/design-preview" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до списку кампаній
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Створити нову кампанію
              </h1>
              <p className="text-sm text-gray-600">
                Налаштуйте параметри маркетингової кампанії
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/design-preview"
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Скасувати
              </Link>
              <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Зберегти кампанію
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setStep('basic')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                step === 'basic'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              1. Основна інформація
              {step === 'basic' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setStep('cashback')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                step === 'cashback'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              2. Налаштування кешбеку
              {step === 'cashback' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setStep('audience')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                step === 'audience'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              3. Цільова аудиторія
              {step === 'audience' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {step === 'basic' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Загальна інформація
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Назва кампанії *
                    </label>
                    <input
                      type="text"
                      placeholder="Введіть назву..."
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Тип кампанії *
                    </label>
                    <select 
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={campaignType}
                      onChange={(e) => setCampaignType(e.target.value)}
                    >
                      <option value="category">Категорійний кешбек</option>
                      <option value="partner">Партнерський кешбек</option>
                      <option value="referral">Реферальна програма</option>
                      <option value="loyalty">Програма лояльності</option>
                      <option value="promo">Промо-кампанія</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Опис
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Опишіть мету та умови кампанії..."
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Бюджет кампанії
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Загальний бюджет (бали) *
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      1 бал = 1 грн при обміні
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Максимальний кешбек на одну транзакцію
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Період дії
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Дата початку *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Дата завершення *
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Часовий пояс
                    </label>
                    <select className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Europe/Kyiv (UTC+2)</option>
                      <option>Europe/London (UTC+0)</option>
                      <option>America/New_York (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Статус кампанії
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      defaultChecked
                      className="w-4 h-4 text-purple-600"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Чернетка</div>
                      <div className="text-xs text-gray-500">Збережеться без активації</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="scheduled"
                      className="w-4 h-4 text-purple-600"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Запланована</div>
                      <div className="text-xs text-gray-500">Активується автоматично</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      className="w-4 h-4 text-purple-600"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Активна</div>
                      <div className="text-xs text-gray-500">Почне працювати негайно</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'cashback' && (
          <div className="space-y-6">
            {campaignType === 'partner' ? (
              /* Partner Cashback Settings */
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Вибір партнерів
                  </h3>
                  <Link
                    to="/design-preview/partners"
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Менеджити партнерів →
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {partners.map((partner) => (
                    <label
                      key={partner.id}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-purple-600"
                        checked={selectedPartners.includes(partner.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPartners([...selectedPartners, partner.id]);
                          } else {
                            setSelectedPartners(selectedPartners.filter(id => id !== partner.id));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          <div className="text-xs text-gray-500">{partner.locations} точок</div>
                        </div>
                        {selectedPartners.includes(partner.id) && (
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Власні кошти (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                defaultValue={partner.ownRate}
                                className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Кредитні кошти (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                defaultValue={partner.creditRate}
                                className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              /* Category Cashback Settings */
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Налаштування категорій кешбеку
                  </h3>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/design-preview/cashback-categories"
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Менеджити категорії →
                    </Link>
                    <button 
                      onClick={() => setCategories([...categories, { id: Date.now() }])}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800"
                    >
                      <Plus className="w-4 h-4" />
                      Додати категорію
                    </button>
                  </div>
                </div>

                {categories.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm">Категорії не додано</p>
                    <p className="text-xs mt-1">Натисніть "Додати категорію" щоб почати</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categories.map((cat, idx) => (
                      <div key={cat.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-2">
                                Категорія MCC
                              </label>
                              <select className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option>Ресторани (5812)</option>
                                <option>АЗС (5541)</option>
                                <option>Супермаркети (5411)</option>
                                <option>Аптеки (5912)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-2">
                                Власні кошти (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                placeholder="5.0"
                                className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-2">
                                Кредитні кошти (%)
                              </label>
                              <input
                                type="number"
                                step="0.5"
                                placeholder="3.0"
                                className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          <button 
                            onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Обмеження
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Мінімальна сума транзакції
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Максимальна кількість транзакцій на день
                  </label>
                  <input
                    type="number"
                    placeholder="Без обмежень"
                    className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'audience' && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Цільова аудиторія
            </h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" defaultChecked />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Всі користувачі</div>
                    <div className="text-xs text-gray-500">Кампанія буде доступна всім</div>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Нові користувачі</div>
                    <div className="text-xs text-gray-500">Реєстрація менше 30 днів</div>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">VIP клієнти</div>
                    <div className="text-xs text-gray-500">Витрати більше 50 000 грн</div>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Активні користувачі</div>
                    <div className="text-xs text-gray-500">Транзакції за останні 7 днів</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => {
              if (step === 'cashback') setStep('basic');
              if (step === 'audience') setStep('cashback');
            }}
            className={`px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium ${
              step === 'basic' ? 'invisible' : ''
            }`}
          >
            Назад
          </button>
          <button
            onClick={() => {
              if (step === 'basic') setStep('cashback');
              if (step === 'cashback') setStep('audience');
            }}
            className={`px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium ${
              step === 'audience' ? 'hidden' : ''
            }`}
          >
            Далі
          </button>
        </div>
      </div>
    </div>
  );
}

const partners = [
  { id: 'PTR001', name: 'Сільпо', locations: 342, ownRate: 5.0, creditRate: 3.0 },
  { id: 'PTR002', name: 'ОККО', locations: 156, ownRate: 4.0, creditRate: 2.5 },
  { id: 'PTR003', name: 'McDonald\'s', locations: 89, ownRate: 7.0, creditRate: 5.0 },
  { id: 'PTR004', name: 'Rozetka', locations: 45, ownRate: 3.0, creditRate: 2.0 },
  { id: 'PTR005', name: 'Аптека Доброго Дня', locations: 218, ownRate: 6.0, creditRate: 4.0 },
];