import { Link } from 'react-router';
import { 
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Search,
  Calendar,
  Store,
  Users,
  Percent,
  Check,
  ChevronDown,
  Download,
  X,
  ChevronRight
} from 'lucide-react';

export default function DevUIKit() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/campaigns" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до кампаній
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                NovaPay Marketing Workspace — UI Kit
              </h1>
              <p className="text-gray-600">
                Елементи які використовуються в проєкті з прикладами реального використання
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-12">
        
        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Кольорова палітра</h2>
          
          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Primary (Purple) — Основний колір</h3>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <div className="w-full h-24 bg-purple-50 rounded-lg border border-purple-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">purple-50</p>
                <p className="text-xs text-gray-500">#faf5ff</p>
                <p className="text-xs text-gray-600 mt-1">Фони, підказки</p>
              </div>
              <div>
                <div className="w-full h-24 bg-purple-100 rounded-lg border border-purple-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">purple-100</p>
                <p className="text-xs text-gray-500">#f3e8ff</p>
                <p className="text-xs text-gray-600 mt-1">Hover states</p>
              </div>
              <div>
                <div className="w-full h-24 bg-purple-200 rounded-lg border border-purple-300 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">purple-200</p>
                <p className="text-xs text-gray-500">#e9d5ff</p>
                <p className="text-xs text-gray-600 mt-1">Borders</p>
              </div>
              <div>
                <div className="w-full h-24 bg-purple-600 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">purple-600</p>
                <p className="text-xs text-purple-100">#9333ea</p>
                <p className="text-xs text-purple-100 mt-1">Primary кнопки</p>
              </div>
              <div>
                <div className="w-full h-24 bg-purple-700 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">purple-700</p>
                <p className="text-xs text-purple-100">#7e22ce</p>
                <p className="text-xs text-purple-100 mt-1">Hover на кнопках</p>
              </div>
              <div>
                <div className="w-full h-24 bg-purple-900 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">purple-900</p>
                <p className="text-xs text-purple-100">#581c87</p>
                <p className="text-xs text-purple-100 mt-1">Темний текст</p>
              </div>
            </div>
          </div>

          {/* Green - Own Funds */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Green — Власні кошти</h3>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <div className="w-full h-24 bg-green-50 rounded-lg border border-green-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">green-50</p>
                <p className="text-xs text-gray-600 mt-1">Фони</p>
              </div>
              <div>
                <div className="w-full h-24 bg-green-100 rounded-lg border border-green-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">green-100</p>
                <p className="text-xs text-gray-600 mt-1">Hover</p>
              </div>
              <div>
                <div className="w-full h-24 bg-green-500 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">green-500</p>
                <p className="text-xs text-gray-600 mt-1">Success</p>
              </div>
              <div>
                <div className="w-full h-24 bg-green-600 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">green-600</p>
                <p className="text-xs text-gray-600 mt-1">Акценти</p>
              </div>
              <div>
                <div className="w-full h-24 bg-green-700 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">green-700</p>
                <p className="text-xs text-gray-600 mt-1">Hover</p>
              </div>
              <div>
                <div className="w-full h-24 bg-green-800 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">green-800</p>
                <p className="text-xs text-gray-600 mt-1">Темний</p>
              </div>
            </div>
          </div>

          {/* Orange - Credit Funds */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Orange — Кредитні кошти</h3>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <div className="w-full h-24 bg-orange-50 rounded-lg border border-orange-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">orange-50</p>
                <p className="text-xs text-gray-600 mt-1">Фони</p>
              </div>
              <div>
                <div className="w-full h-24 bg-orange-100 rounded-lg border border-orange-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">orange-100</p>
                <p className="text-xs text-gray-600 mt-1">Hover</p>
              </div>
              <div>
                <div className="w-full h-24 bg-orange-500 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">orange-500</p>
                <p className="text-xs text-gray-600 mt-1">Warning</p>
              </div>
              <div>
                <div className="w-full h-24 bg-orange-600 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">orange-600</p>
                <p className="text-xs text-gray-600 mt-1">Акценти</p>
              </div>
              <div>
                <div className="w-full h-24 bg-orange-700 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">orange-700</p>
                <p className="text-xs text-gray-600 mt-1">Hover</p>
              </div>
              <div>
                <div className="w-full h-24 bg-orange-800 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">orange-800</p>
                <p className="text-xs text-gray-600 mt-1">Темний</p>
              </div>
            </div>
          </div>

          {/* Gray - Neutrals */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Gray — Текст та фони</h3>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <div className="w-full h-24 bg-gray-50 rounded-lg border border-gray-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">gray-50</p>
                <p className="text-xs text-gray-600 mt-1">Фон сторінки</p>
              </div>
              <div>
                <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">gray-100</p>
                <p className="text-xs text-gray-600 mt-1">Hover стан</p>
              </div>
              <div>
                <div className="w-full h-24 bg-gray-200 rounded-lg border border-gray-300 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">gray-200</p>
                <p className="text-xs text-gray-600 mt-1">Бордери</p>
              </div>
              <div>
                <div className="w-full h-24 bg-gray-600 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">gray-600</p>
                <p className="text-xs text-gray-100 mt-1">Вторинний текст</p>
              </div>
              <div>
                <div className="w-full h-24 bg-gray-700 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">gray-700</p>
                <p className="text-xs text-gray-100 mt-1">Основний текст</p>
              </div>
              <div>
                <div className="w-full h-24 bg-gray-900 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">gray-900</p>
                <p className="text-xs text-gray-100 mt-1">Заголовки</p>
              </div>
            </div>
          </div>

          {/* Red - Danger */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Red — Видалення та помилки</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="w-full h-24 bg-red-50 rounded-lg border border-red-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">red-50</p>
                <p className="text-xs text-gray-600 mt-1">Фони помилок</p>
              </div>
              <div>
                <div className="w-full h-24 bg-red-100 rounded-lg border border-red-200 mb-2"></div>
                <p className="text-sm font-mono text-gray-600">red-100</p>
                <p className="text-xs text-gray-600 mt-1">Hover на видалені</p>
              </div>
              <div>
                <div className="w-full h-24 bg-red-500 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">red-500</p>
                <p className="text-xs text-gray-600 mt-1">Error стани</p>
              </div>
              <div>
                <div className="w-full h-24 bg-red-600 rounded-lg mb-2"></div>
                <p className="text-sm font-mono text-white">red-600</p>
                <p className="text-xs text-gray-600 mt-1">Кнопки видалення</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✏️ Типографіка</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Heading 1 — 30px Bold</h1>
              <code className="text-sm text-gray-500">text-3xl font-bold text-gray-900</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: Campaigns.tsx — "Кампанії"</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Heading 2 — 24px Bold</h2>
              <code className="text-sm text-gray-500">text-2xl font-bold text-gray-900</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: CampaignBuilder.tsx — "Створити нову кампанію"</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Heading 3 — 20px Semibold</h3>
              <code className="text-sm text-gray-500">text-xl font-semibold text-gray-900</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: StepBasics.tsx — "Основна інформація кампанії"</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Heading 4 — 18px Semibold</h4>
              <code className="text-sm text-gray-500">text-lg font-semibold text-gray-900</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: PartnerCashbackSetup.tsx — назви партнерів в модалах</p>
            </div>
            <div>
              <p className="text-base text-gray-700 mb-2">Body Regular — 16px Regular. Основний текст для параграфів та описів.</p>
              <code className="text-sm text-gray-500">text-base text-gray-700</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: Campaigns.tsx — описи в header</p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-900 mb-2">Body Medium — 16px Medium. Акцентований текст.</p>
              <code className="text-sm text-gray-500">text-base font-medium text-gray-900</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: Campaigns.tsx — назви кампаній в таблиці</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Small Regular — 14px Regular. Вторинний текст, підписи.</p>
              <code className="text-sm text-gray-500">text-sm text-gray-600</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: PartnerCashbackSetup.tsx — категорії партнерів</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Extra Small — 12px Regular. Підказки, мітки.</p>
              <code className="text-sm text-gray-500">text-xs text-gray-500</code>
              <p className="text-xs text-gray-600 mt-2">📍 Використовується: CampaignBuilder.tsx — підписи в stepper</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔘 Кнопки</h2>
          
          {/* Primary Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary — Основні дії</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Створити кампанію
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                <Plus className="w-5 h-5" />
                Додати партнера
              </button>
              <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg opacity-50 cursor-not-allowed font-medium">
                Disabled
              </button>
            </div>
            <code className="text-sm text-gray-500 block mb-2">px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700</code>
            <p className="text-xs text-gray-600">📍 Використовується: Campaigns.tsx — "Створити кампанію", PartnerCashbackSetup.tsx — "Додати партнера"</p>
          </div>

          {/* Secondary Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary — Вторинні дії</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Скасувати
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <Download className="w-4 h-4" />
                Експорт
              </button>
              <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg opacity-50 cursor-not-allowed font-medium">
                Disabled
              </button>
            </div>
            <code className="text-sm text-gray-500 block mb-2">px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50</code>
            <p className="text-xs text-gray-600">📍 Використовується: CampaignBuilder.tsx — "Зберегти як чернетку"</p>
          </div>

          {/* Ghost/Text Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ghost — Текстові кнопки</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
                Редагувати
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="p-1.5 text-purple-600 hover:bg-purple-100 rounded transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <code className="text-sm text-gray-500 block mb-2">text-purple-600 hover:bg-purple-50 rounded-lg</code>
            <p className="text-xs text-gray-600">📍 Використовується: Campaigns.tsx — "Редагувати" кампанію, PartnerCashbackSetup.tsx — іконки редагування/видалення</p>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation — Навігаційні кнопки</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
                Назад
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                Далі
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Зберегти як чернетку
              </button>
            </div>
            <code className="text-sm text-gray-500 block mb-2">px-6 py-3 rounded-lg font-medium</code>
            <p className="text-xs text-gray-600">📍 Використовується: CampaignBuilder.tsx — навігація між кроками створення кампанії</p>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Елементи форм</h2>

          {/* Text Input */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Text Input — Текстове поле</h3>
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва кампанії <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="наприклад, Кешбек Продукти 5%"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disabled стан
                </label>
                <input
                  type="text"
                  disabled
                  value="Disabled input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: StepBasics.tsx — "Назва кампанії"</p>
          </div>

          {/* Search Input */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Input — Пошук</h3>
            <div className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Пошук кампаній..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">relative + pl-10 (для іконки)</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: Campaigns.tsx — пошук кампаній, PartnerCashbackSetup.tsx — пошук партнерів</p>
          </div>

          {/* Number Input */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Number Input — Числові поля</h3>
            <div className="grid grid-cols-2 gap-6 max-w-xl">
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
                    defaultValue={5}
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
                    defaultValue={3}
                    className="w-full pl-3 pr-10 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-semibold text-orange-600"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Percent className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">border-2 border-purple-300 (colored border для різних типів)</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: PartnerCashbackSetup.tsx — ставки кешбеку, CashbackCategorySetup.tsx</p>
          </div>

          {/* Select */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select — Випадаюче меню</h3>
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип кампанії <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer font-medium">
                    <option value="">Оберіть тип кампанії...</option>
                    <option value="cashback">Кешбек (категорійний)</option>
                    <option value="partner_cashback">Партнерський кешбек</option>
                    <option value="universal_cashback">Універсальний кешбек</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Фільтр за статусом
                </label>
                <select className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="all">Всі статуси</option>
                  <option value="active">Активна</option>
                  <option value="completed">Завершена</option>
                  <option value="draft">Чернетка</option>
                </select>
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">appearance-none (прибрати дефолтну стрілку) + ChevronDown іконка</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: StepBasics.tsx — вибір типу кампанії, Campaigns.tsx — фільтри</p>
          </div>

          {/* Textarea */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Textarea — Багаторядковий текст</h3>
            <div className="max-w-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Внутрішній опис
              </label>
              <textarea
                placeholder="Додайте нотатки для вашої команди (не видно клієнтам)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
            <code className="text-sm text-gray-500 block mt-4">resize-none (прибрати можливість ресайзу)</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: StepBasics.tsx — опис кампанії</p>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ Badges</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Badges — Статуси кампаній</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Активна
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Завершена
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Чернетка
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Заплановано
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Призупинено
              </span>
            </div>
            <code className="text-sm text-gray-500 block mb-2">px-3 py-1 rounded-full text-sm font-medium bg-[color]-100 text-[color]-800</code>
            <p className="text-xs text-gray-600">📍 Використовується: Campaigns.tsx — статуси в таблиці кампаній, CampaignDetails.tsx</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Info Badges — Інформаційні</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                5 терміналів
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                12 категорій
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                8 партнерів
              </span>
            </div>
            <code className="text-sm text-gray-500 block mb-2">px-2.5 py-1 bg-[color]-50 text-[color]-700 rounded-full text-xs</code>
            <p className="text-xs text-gray-600">📍 Використовується: PartnerCashbackSetup.tsx — кількість терміналів</p>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 Cards</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Basic Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Card</h3>
              <p className="text-sm text-gray-600">
                Стандартна картка для контенту з білим фоном та сірим border
              </p>
              <code className="text-xs text-gray-500 block mt-3">bg-white rounded-xl border border-gray-200 p-6</code>
              <p className="text-xs text-gray-600 mt-2">📍 Campaigns.tsx, CampaignDetails.tsx</p>
            </div>

            {/* Hover Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hover Card</h3>
              <p className="text-sm text-gray-600">
                Інтерактивна картка з hover ефектом (наведіть курсор)
              </p>
              <code className="text-xs text-gray-500 block mt-3">hover:shadow-lg transition-shadow</code>
              <p className="text-xs text-gray-600 mt-2">📍 StepAudience.tsx — вибір аудиторії</p>
            </div>

            {/* Colored Card */}
            <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Colored Card</h3>
              <p className="text-sm text-purple-700">
                Кольорова картка для акцентування уваги
              </p>
              <code className="text-xs text-purple-600 block mt-3">bg-purple-50 border-purple-200</code>
              <p className="text-xs text-purple-700 mt-2">📍 StepBasics.tsx — підказки</p>
            </div>
          </div>

          {/* List Item Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">List Item Card — Елемент списку</h3>
            <div className="space-y-2">
              <div className="p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">СІЛЬПО</h4>
                    <p className="text-sm text-gray-600">Продуктові магазини</p>
                    <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mt-2">
                      5 терміналів
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border-2 border-purple-300 bg-purple-50/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900 text-lg">АЗС ОККО (Selected)</h4>
                    <p className="text-sm text-purple-700">АЗС</p>
                    <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mt-2">
                      2 термінали
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">border-2 hover:border-purple-300 hover:bg-purple-50/50 (selected: border-purple-300 bg-purple-50/50)</code>
            <p className="text-xs text-gray-600 mt-2">📍 Використовується: PartnerCashbackSetup.tsx — список партнерів в модалі, StepAudience.tsx — вибір аудиторії</p>
          </div>
        </section>

        {/* Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Table</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Назва кампанії
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">Кешбек Продукти 5%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">Категорійний кешбек</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Активна
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                        Редагувати
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">Партнерський СІЛЬПО</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">Партнерський кешбек</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Чернетка
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                        Редагувати
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <code className="text-sm text-gray-500 block mt-4">thead: bg-gray-50, tbody: divide-y divide-gray-200, tr: hover:bg-gray-50</code>
          <p className="text-xs text-gray-600 mt-2">📍 Використовується: Campaigns.tsx — список кампаній</p>
        </section>

        {/* Progress Stepper */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🔢 Progress Stepper</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Builder Stepper</h3>
            
            <div className="flex items-center mb-6">
              {/* Step 1 - Completed */}
              <div className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium bg-purple-600 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Основи</p>
                    <p className="text-xs text-gray-500">Назва та тип</p>
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-purple-600 mx-2"></div>
              </div>

              {/* Step 2 - Current */}
              <div className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium bg-purple-600 text-white">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Логіка</p>
                    <p className="text-xs text-gray-500">Налаштування</p>
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
              </div>

              {/* Step 3 - Upcoming */}
              <div className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium bg-gray-100 text-gray-400">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Винагорода</p>
                    <p className="text-xs text-gray-500">Кешбек</p>
                  </div>
                </div>
              </div>
            </div>

            <code className="text-sm text-gray-500 block mb-2">
              completed: bg-purple-600 text-white, current: bg-purple-600, upcoming: bg-gray-100 text-gray-400
            </code>
            <p className="text-xs text-gray-600">📍 Використовується: CampaignBuilder.tsx — навігація по кроках створення кампанії</p>
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎭 Icons (Lucide React)</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Найчастіше використовувані іконки</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Plus className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Plus</code>
                <p className="text-xs text-gray-600 text-center">Додати</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Edit2 className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Edit2</code>
                <p className="text-xs text-gray-600 text-center">Редагувати</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Trash2 className="w-6 h-6 text-red-600" />
                <code className="text-xs">Trash2</code>
                <p className="text-xs text-gray-600 text-center">Видалити</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Search className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Search</code>
                <p className="text-xs text-gray-600 text-center">Пошук</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Calendar</code>
                <p className="text-xs text-gray-600 text-center">Дати/періоди</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Store className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Store</code>
                <p className="text-xs text-gray-600 text-center">Партнери</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Users className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Users</code>
                <p className="text-xs text-gray-600 text-center">Аудиторія</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Percent className="w-6 h-6 text-gray-700" />
                <code className="text-xs">Percent</code>
                <p className="text-xs text-gray-600 text-center">Відсотки</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
                <code className="text-xs">Check</code>
                <p className="text-xs text-gray-600 text-center">Завершено</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <X className="w-6 h-6 text-gray-700" />
                <code className="text-xs">X</code>
                <p className="text-xs text-gray-600 text-center">Закрити</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <ChevronRight className="w-6 h-6 text-gray-700" />
                <code className="text-xs">ChevronRight</code>
                <p className="text-xs text-gray-600 text-center">Далі</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
                <code className="text-xs">ArrowLeft</code>
                <p className="text-xs text-gray-600 text-center">Назад</p>
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-6">import {"{ Plus, Edit2, ... }"} from 'lucide-react'</code>
            <code className="text-sm text-gray-500 block mt-2">{"<Plus className=\"w-5 h-5\" />"}</code>
            <p className="text-xs text-gray-600 mt-4">
              📍 Використовується: скрізь — Campaigns.tsx, CampaignBuilder.tsx, PartnerCashbackSetup.tsx, StepAudience.tsx, тощо
            </p>
          </div>
        </section>

        {/* Modal */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🪟 Modal</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modal Structure</h3>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="bg-white rounded-xl max-w-2xl mx-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Додати партнера</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Оберіть партнера для налаштування кешбеку
                      </p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-gray-600">Контент модального вікна...</p>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
                  <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    Скасувати
                  </button>
                  <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Додати
                  </button>
                </div>
              </div>
            </div>
            <code className="text-sm text-gray-500 block mt-4">
              fixed inset-0 bg-black/50 (backdrop) + rounded-xl max-w-2xl (modal)
            </code>
            <p className="text-xs text-gray-600 mt-2">
              📍 Використовується: PartnerCashbackSetup.tsx — Partner Selector Modal, Period Editor Modal
            </p>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📏 Spacing & Layout</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Стандартні відступи</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">gap-2</div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-purple-200 rounded"></div>
                  <div className="w-12 h-12 bg-purple-200 rounded"></div>
                </div>
                <code className="text-xs text-gray-500">8px — між невеликими елементами</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">gap-3</div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-purple-300 rounded"></div>
                  <div className="w-12 h-12 bg-purple-300 rounded"></div>
                </div>
                <code className="text-xs text-gray-500">12px — між компонентами</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">gap-4</div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-400 rounded"></div>
                  <div className="w-12 h-12 bg-purple-400 rounded"></div>
                </div>
                <code className="text-xs text-gray-500">16px — стандартні відступи</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">gap-6</div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-purple-500 rounded"></div>
                  <div className="w-12 h-12 bg-purple-500 rounded"></div>
                </div>
                <code className="text-xs text-gray-500">24px — між секціями</code>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">gap-8</div>
                <div className="flex gap-8">
                  <div className="w-12 h-12 bg-purple-600 rounded"></div>
                  <div className="w-12 h-12 bg-purple-600 rounded"></div>
                </div>
                <code className="text-xs text-gray-500">32px — великі відступи</code>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-6">
              📍 Використовується: скрізь для створення консистентних відступів між елементами
            </p>
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⭕ Border Radius</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Стандартні скруглення</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-full h-32 bg-purple-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="font-semibold text-purple-900">rounded-lg</span>
                </div>
                <code className="text-sm text-gray-600">8px</code>
                <p className="text-xs text-gray-600 mt-1">Кнопки, інпути</p>
              </div>
              <div className="text-center">
                <div className="w-full h-32 bg-purple-200 rounded-xl mb-3 flex items-center justify-center">
                  <span className="font-semibold text-purple-900">rounded-xl</span>
                </div>
                <code className="text-sm text-gray-600">12px</code>
                <p className="text-xs text-gray-600 mt-1">Картки, модали</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-purple-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="font-semibold text-purple-900 text-center">rounded-full</span>
                </div>
                <code className="text-sm text-gray-600">999px</code>
                <p className="text-xs text-gray-600 mt-1">Badges, аватари</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-6">
              📍 Використовується: кнопки (rounded-lg), картки (rounded-xl), badges (rounded-full)
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}