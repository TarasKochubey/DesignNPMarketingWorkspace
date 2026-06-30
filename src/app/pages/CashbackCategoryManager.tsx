import { useState } from 'react';
import { Edit, Save, X, Search, Plus, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  key: string;
  name: string;
  mcc: string[];
  icon: string;
  displayOrder: number;
}

interface BlockedMCC {
  id: string;
  code: string;
  description: string;
}

const BLOCKED_MCC_DEFAULT: BlockedMCC[] = [
  { id: '1', code: '7995', description: 'Азартні ігри (казино)' },
  { id: '2', code: '7801', description: 'Букмекерські контори' },
  { id: '3', code: '5993', description: 'Сигари та тютюнові вироби' },
  { id: '4', code: '5122', description: 'Ліки на замовлення' },
];

export function CashbackCategoryManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'blocked'>('categories');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', key: 'groceries', name: 'Продукти', mcc: ['5411', '5412', '5499'], icon: '🛒', displayOrder: 1 },
    { id: '2', key: 'restaurants', name: 'Ресторани', mcc: ['5812', '5813', '5814'], icon: '🍽️', displayOrder: 2 },
    { id: '3', key: 'pharmacy', name: 'Аптеки', mcc: ['5912'], icon: '💊', displayOrder: 3 },
    { id: '4', key: 'transport', name: 'Транспорт', mcc: ['4111', '4112', '4121'], icon: '🚕', displayOrder: 4 },
    { id: '5', key: 'fuel', name: 'АЗС', mcc: ['5541', '5542'], icon: '⛽', displayOrder: 5 },
    { id: '6', key: 'entertainment', name: 'Розваги', mcc: ['7832', '7841', '7922', '7929'], icon: '🎬', displayOrder: 6 },
    { id: '7', key: 'utilities', name: 'Комунальні', mcc: ['4900'], icon: '💡', displayOrder: 7 },
    { id: '8', key: 'beauty', name: 'Краса', mcc: ['5977', '7230'], icon: '💅', displayOrder: 8 },
    { id: '9', key: 'education', name: 'Освіта', mcc: ['8211', '8220', '8299'], icon: '📚', displayOrder: 9 },
    { id: '10', key: 'health', name: 'Медицина', mcc: ['8011', '8021', '8031', '8099'], icon: '🏥', displayOrder: 10 },
  ]);

  const [blockedMCC, setBlockedMCC] = useState<BlockedMCC[]>(BLOCKED_MCC_DEFAULT);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Filter categories by name or MCC code
  const filteredCategories = categories.filter(category => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase().trim();
    
    // Check if search query is a number (MCC code search)
    if (/^\d+$/.test(query)) {
      return category.mcc.some(mcc => mcc.includes(query));
    }
    
    // Otherwise search by category name
    return category.name.toLowerCase().includes(query);
  });

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingCategory({ ...category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingCategory(null);
  };

  const saveEdit = () => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
      setEditingId(null);
      setEditingCategory(null);
    }
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      key: '',
      name: '',
      mcc: [],
      icon: '',
      displayOrder: categories.length + 1,
    };
    setCategories([...categories, newCategory]);
    setEditingId(newCategory.id);
    setEditingCategory(newCategory);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const addBlockedMCC = () => {
    const newBlockedMCC: BlockedMCC = {
      id: (blockedMCC.length + 1).toString(),
      code: '',
      description: '',
    };
    setBlockedMCC([...blockedMCC, newBlockedMCC]);
    setEditingId(newBlockedMCC.id);
    setEditingCategory(newBlockedMCC as unknown as Category);
  };

  const deleteBlockedMCC = (id: string) => {
    setBlockedMCC(blockedMCC.filter(c => c.id !== id));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Категорії кешбеку</h1>
        <p className="text-gray-600 mb-6">Перегляд та редагування категорій з MCC кодами</p>

        {/* Search for categories */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук за назвою категорії або кодом МСС..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'categories'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Категорії ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'blocked'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Заборонені MCC ({blockedMCC.length})
          </button>
        </div>
      </div>

      {/* Categories List */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-xl border border-gray-200">
          {filteredCategories.map((category, index) => {
            const isEditing = editingId === category.id;

            return (
              <div
                key={category.id}
                className={`${index !== 0 ? 'border-t border-gray-200' : ''} ${
                  isEditing ? 'bg-purple-50' : ''
                }`}
              >
                {isEditing && editingCategory ? (
                  /* Edit mode */
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Редагування категорії</h3>
                      <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Назва</label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Іконка</label>
                        <input
                          type="text"
                          value={editingCategory.icon}
                          onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                          maxLength={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-2xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">MCC коди:</label>
                        <div className="flex flex-wrap gap-2">
                          {editingCategory.mcc.map((mcc) => (
                            <span
                              key={mcc}
                              className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                            >
                              {mcc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Зберегти
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">MCC: {category.mcc.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Blocked MCC List */}
      {activeTab === 'blocked' && (
        <div className="bg-white rounded-xl border border-gray-200">
          {blockedMCC.map((mcc, index) => {
            const isEditing = editingId === mcc.id;

            return (
              <div
                key={mcc.id}
                className={`${index !== 0 ? 'border-t border-gray-200' : ''} ${
                  isEditing ? 'bg-purple-50' : ''
                }`}
              >
                {isEditing && editingCategory ? (
                  /* Edit mode */
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Редагування заблокованого MCC</h3>
                      <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Код MCC</label>
                        <input
                          type="text"
                          value={editingCategory.key}
                          onChange={(e) => setEditingCategory({ ...editingCategory, key: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Опис</label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Зберегти
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚫</span>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{mcc.description}</h3>
                        <p className="text-xs text-gray-500 mt-1">MCC: {mcc.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(mcc as unknown as Category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Редагувати"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBlockedMCC(mcc.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={addBlockedMCC}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Додати заблокований MCC
            </button>
          </div>
        </div>
      )}
    </div>
  );
}