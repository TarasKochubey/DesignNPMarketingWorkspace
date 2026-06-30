import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Save, Plus, Trash2, 
  ShoppingCart, Coffee, Utensils, ShoppingBag, Fuel, Pill, 
  Film, Heart, Home, Shirt, Monitor, Dumbbell, Book, Plane,
  Car, Gift, Music, Paintbrush, Smartphone, Watch } from 'lucide-react';

const iconOptions = [
  { name: 'ShoppingCart', icon: ShoppingCart, label: 'Магазин' },
  { name: 'Coffee', icon: Coffee, label: 'Кава' },
  { name: 'Utensils', icon: Utensils, label: 'Ресторан' },
  { name: 'ShoppingBag', icon: ShoppingBag, label: 'Покупки' },
  { name: 'Fuel', icon: Fuel, label: 'АЗС' },
  { name: 'Pill', icon: Pill, label: 'Аптека' },
  { name: 'Film', icon: Film, label: 'Кіно' },
  { name: 'Heart', icon: Heart, label: 'Здоров\'я' },
  { name: 'Home', icon: Home, label: 'Дім' },
  { name: 'Shirt', icon: Shirt, label: 'Одяг' },
  { name: 'Monitor', icon: Monitor, label: 'Електроніка' },
  { name: 'Dumbbell', icon: Dumbbell, label: 'Спорт' },
  { name: 'Book', icon: Book, label: 'Книги' },
  { name: 'Plane', icon: Plane, label: 'Подорожі' },
  { name: 'Car', icon: Car, label: 'Авто' },
  { name: 'Gift', icon: Gift, label: 'Подарунки' },
  { name: 'Music', icon: Music, label: 'Музика' },
  { name: 'Paintbrush', icon: Paintbrush, label: 'Мистецтво' },
  { name: 'Smartphone', icon: Smartphone, label: 'Гаджети' },
  { name: 'Watch', icon: Watch, label: 'Аксесуари' },
];

export default function CategoryEditNew() {
  const { id } = useParams();
  const [mccCodes, setMccCodes] = useState(mockMccCodes);
  const [selectedIcon, setSelectedIcon] = useState('Utensils');
  const [showIconPicker, setShowIconPicker] = useState(false);

  const SelectedIconComponent = iconOptions.find(i => i.name === selectedIcon)?.icon || Utensils;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <Link 
            to="/design-preview/cashback-categories" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до списку категорій
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Редагувати категорію: Ресторани
              </h1>
              <p className="text-sm text-gray-600">
                Управління MCC кодами та налаштуваннями категорії
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/design-preview/cashback-categories"
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Скасувати
              </Link>
              <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Зберегти зміни
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Icon Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Іконка категорії
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <SelectedIconComponent className="w-12 h-12 text-purple-600" />
                </div>
                <button
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Вибрати іконку
                </button>
              </div>

              {showIconPicker && (
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-64 overflow-y-auto">
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map((option) => {
                      const IconComp = option.icon;
                      return (
                        <button
                          key={option.name}
                          onClick={() => {
                            setSelectedIcon(option.name);
                            setShowIconPicker(false);
                          }}
                          className={`p-3 rounded-lg transition-colors ${
                            selectedIcon === option.name
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-white hover:bg-gray-100 text-gray-600'
                          }`}
                          title={option.label}
                        >
                          <IconComp className="w-5 h-5 mx-auto" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Основна інформація
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Назва категорії *
                </label>
                <input
                  type="text"
                  defaultValue="Ресторани"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Опис категорії
                </label>
                <textarea
                  rows={4}
                  defaultValue="Ресторани, кафе, їдальні та заклади харчування"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Default Rates */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Стандартні ставки кешбеку
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Власні кошти (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  defaultValue="5.0"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Кредитні кошти (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  defaultValue="3.0"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Ці ставки будуть застосовуватися до всіх MCC кодів цієї категорії за замовчуванням
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MCC Codes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                MCC коди
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Merchant Category Codes для ідентифікації торгових точок
              </p>
            </div>
            <button 
              onClick={() => setMccCodes([...mccCodes, {
                id: Date.now().toString(),
                code: '',
                description: '',
              }])}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
              Додати MCC код
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                    MCC код
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Опис
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    Дії
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mccCodes.map((mcc) => (
                  <tr key={mcc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={mcc.code}
                        placeholder="5812"
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={mcc.description}
                        placeholder="Опис типу закладів..."
                        className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setMccCodes(mccCodes.filter(m => m.id !== mcc.id))}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mccCodes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">MCC коди не додано</p>
              <p className="text-xs mt-1">Натисніть "Додати MCC код" щоб почати</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            ℹ️ Про MCC коди
          </h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            Merchant Category Code (MCC) — це чотиризначний код, що ідентифікує тип бізнесу торговця. 
            Платіжні системи використовують MCC для класифікації транзакцій та визначення правил обробки. 
            Один MCC код може відповідати кільком типам закладів у межах однієї категорії.
          </p>
        </div>
      </div>
    </div>
  );
}

const mockMccCodes = [
  {
    id: '1',
    code: '5812',
    description: 'Ресторани, заклади харчування',
  },
  {
    id: '2',
    code: '5814',
    description: 'Заклади швидкого харчування (фастфуд)',
  },
  {
    id: '3',
    code: '5813',
    description: 'Бари, паби, нічні клуби',
  },
];