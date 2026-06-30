import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, Save, Plus, Trash2, Upload, X, Copy, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

interface Terminal {
  id: string;
  merchantId: string;
  terminalId: string;
  name: string;
  address: string;
  city: string;
}

interface LegalEntity {
  id: string;
  type: 'tov' | 'fop' | 'other';
  identificationCode: string;
  fullName: string;
  terminals: Terminal[];
}

export default function PartnerEditNew() {
  const { id } = useParams();
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>(mockLegalEntities);
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set(['1']));
  const [logoPreview, setLogoPreview] = useState<string | null>('https://via.placeholder.com/100x100?text=Silpo');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEntity = (entityId: string) => {
    const newExpanded = new Set(expandedEntities);
    if (newExpanded.has(entityId)) {
      newExpanded.delete(entityId);
    } else {
      newExpanded.add(entityId);
    }
    setExpandedEntities(newExpanded);
  };

  const addLegalEntity = () => {
    const newEntity: LegalEntity = {
      id: Date.now().toString(),
      type: 'tov',
      identificationCode: '',
      fullName: '',
      terminals: [],
    };
    setLegalEntities([...legalEntities, newEntity]);
    setExpandedEntities(new Set([...expandedEntities, newEntity.id]));
  };

  const removeLegalEntity = (entityId: string) => {
    setLegalEntities(legalEntities.filter(e => e.id !== entityId));
    const newExpanded = new Set(expandedEntities);
    newExpanded.delete(entityId);
    setExpandedEntities(newExpanded);
  };

  const updateLegalEntity = (entityId: string, updates: Partial<LegalEntity>) => {
    setLegalEntities(legalEntities.map(e =>
      e.id === entityId ? { ...e, ...updates } : e
    ));
  };

  const addTerminal = (entityId: string) => {
    const entity = legalEntities.find(e => e.id === entityId);
    if (!entity) return;

    const newTerminal: Terminal = {
      id: Date.now().toString(),
      merchantId: '',
      terminalId: '',
      name: '',
      address: '',
      city: '',
    };

    updateLegalEntity(entityId, {
      terminals: [...entity.terminals, newTerminal],
    });
  };

  const removeTerminal = (entityId: string, terminalId: string) => {
    const entity = legalEntities.find(e => e.id === entityId);
    if (!entity) return;

    updateLegalEntity(entityId, {
      terminals: entity.terminals.filter(t => t.id !== terminalId),
    });
  };

  const updateTerminal = (entityId: string, terminalId: string, updates: Partial<Terminal>) => {
    const entity = legalEntities.find(e => e.id === entityId);
    if (!entity) return;

    updateLegalEntity(entityId, {
      terminals: entity.terminals.map(t =>
        t.id === terminalId ? { ...t, ...updates } : t
      ),
    });
  };

  const getLegalEntityTypeName = (type: 'tov' | 'fop' | 'other') => {
    switch (type) {
      case 'tov': return 'ТзОВ';
      case 'fop': return 'ФОП';
      case 'other': return 'Інші';
    }
  };

  const getIdentificationCodeLabel = (type: 'tov' | 'fop' | 'other') => {
    return type === 'fop' ? 'ІПН' : 'ЄДРПОУ';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-6">
          <Link 
            to="/design-preview/partners" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад до списку партнерів
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Редагувати партнера: Сільпо
              </h1>
              <p className="text-sm text-gray-600">
                Управління торговими точками та налаштуваннями партнера
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/design-preview/partners"
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
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Logo Upload */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Логотип партнера
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                {logoPreview ? (
                  <div className="relative group">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                    />
                    <button
                      onClick={() => setLogoPreview(null)}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              <div>
                <label className="block w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div className="px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    {logoPreview ? 'Змінити логотип' : 'Завантажити логотип'}
                  </div>
                </label>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  PNG, JPG до 2MB<br />
                  Рекомендовано: 512x512px
                </p>
              </div>
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
                  Назва партнера *
                </label>
                <input
                  type="text"
                  defaultValue="Сільпо"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Категорія
                </label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Супермаркети</option>
                  <option>АЗС</option>
                  <option>Ресторани</option>
                  <option>Електроніка</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Email для зв'язку
                </label>
                <input
                  type="email"
                  defaultValue="partnership@silpo.ua"
                  className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Статус
                </label>
                <select className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Активний</option>
                  <option>Неактивний</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Entities */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Юридичні особи
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Організації партнера з торговими точками (MerchantID та TerminalID)
              </p>
            </div>
            <button
              onClick={addLegalEntity}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" />
              Додати юридичну особу
            </button>
          </div>

          {legalEntities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Юридичні особи не додано</p>
              <p className="text-xs mt-1">Натисніть "Додати юридичну особу" щоб почати</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {legalEntities.map((entity) => (
                <div key={entity.id} className="p-6">
                  {/* Entity Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Тип організації *
                        </label>
                        <select
                          value={entity.type}
                          onChange={(e) => updateLegalEntity(entity.id, { type: e.target.value as 'tov' | 'fop' | 'other' })}
                          className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="tov">ТзОВ</option>
                          <option value="fop">ФОП</option>
                          <option value="other">Інші</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          {getIdentificationCodeLabel(entity.type)} *
                        </label>
                        <input
                          type="text"
                          value={entity.identificationCode}
                          onChange={(e) => updateLegalEntity(entity.id, { identificationCode: e.target.value })}
                          placeholder={entity.type === 'fop' ? 'Введіть ІПН' : 'Введіть ЄДРПОУ'}
                          className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Повна назва (опціонально)
                        </label>
                        <input
                          type="text"
                          value={entity.fullName}
                          onChange={(e) => updateLegalEntity(entity.id, { fullName: e.target.value })}
                          placeholder="Наприклад: ТОВ 'Сільпо-Фуд'"
                          className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleEntity(entity.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title={expandedEntities.has(entity.id) ? 'Згорнути' : 'Розгорнути'}
                      >
                        {expandedEntities.has(entity.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => removeLegalEntity(entity.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Видалити юридичну особу"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Entity Details - Terminals */}
                  {expandedEntities.has(entity.id) && (
                    <div className="ml-14 mt-4 border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900">
                            Торгові точки
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {entity.terminals.length} {entity.terminals.length === 1 ? 'точка' : entity.terminals.length < 5 ? 'точки' : 'точок'}
                          </p>
                        </div>
                        <button
                          onClick={() => addTerminal(entity.id)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-gray-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Додати точку
                        </button>
                      </div>

                      {entity.terminals.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-lg">
                          <p className="text-xs">Торгові точки не додано</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto bg-gray-50 rounded-lg">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">
                                  MerchantID
                                </th>
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">
                                  TerminalID
                                </th>
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">
                                  Назва точки
                                </th>
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">
                                  Адреса
                                </th>
                                <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-500">
                                  Місто
                                </th>
                                <th className="px-4 py-2.5 text-right text-xs font-medium text-gray-500">
                                  Дії
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {entity.terminals.map((terminal) => (
                                <tr key={terminal.id} className="hover:bg-gray-100">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={terminal.merchantId}
                                        onChange={(e) => updateTerminal(entity.id, terminal.id, { merchantId: e.target.value })}
                                        placeholder="MRC-xxxxx"
                                        className="w-28 px-2 py-1.5 bg-white border-0 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      />
                                      {terminal.merchantId && (
                                        <button
                                          onClick={() => navigator.clipboard.writeText(terminal.merchantId)}
                                          className="p-1 text-gray-400 hover:text-gray-600"
                                          title="Копіювати"
                                        >
                                          <Copy className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={terminal.terminalId}
                                        onChange={(e) => updateTerminal(entity.id, terminal.id, { terminalId: e.target.value })}
                                        placeholder="TRM-xxxxx"
                                        className="w-28 px-2 py-1.5 bg-white border-0 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      />
                                      {terminal.terminalId && (
                                        <button
                                          onClick={() => navigator.clipboard.writeText(terminal.terminalId)}
                                          className="p-1 text-gray-400 hover:text-gray-600"
                                          title="Копіювати"
                                        >
                                          <Copy className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="text"
                                      value={terminal.name}
                                      onChange={(e) => updateTerminal(entity.id, terminal.id, { name: e.target.value })}
                                      placeholder="Назва"
                                      className="w-full px-2 py-1.5 bg-white border-0 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="text"
                                      value={terminal.address}
                                      onChange={(e) => updateTerminal(entity.id, terminal.id, { address: e.target.value })}
                                      placeholder="Адреса"
                                      className="w-full px-2 py-1.5 bg-white border-0 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <input
                                      type="text"
                                      value={terminal.city}
                                      onChange={(e) => updateTerminal(entity.id, terminal.id, { city: e.target.value })}
                                      placeholder="Місто"
                                      className="w-full px-2 py-1.5 bg-white border-0 rounded text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <button
                                      onClick={() => removeTerminal(entity.id, terminal.id)}
                                      className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                      title="Видалити точку"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mockLegalEntities: LegalEntity[] = [
  {
    id: '1',
    type: 'tov',
    identificationCode: '12345678',
    fullName: 'ТОВ "Сільпо-Фуд"',
    terminals: [
      {
        id: '1',
        merchantId: 'MER123456789',
        terminalId: 'TRM001234',
        name: 'Сільпо на Хрещатику',
        address: 'вул. Хрещатик, 22',
        city: 'Київ',
      },
      {
        id: '2',
        merchantId: 'MER123456790',
        terminalId: 'TRM001235',
        name: 'Сільпо на Троєщині',
        address: 'просп. Маяковського, 45',
        city: 'Київ',
      },
    ],
  },
  {
    id: '2',
    type: 'fop',
    identificationCode: '3012345678',
    fullName: 'ФОП Іваненко Іван Іванович',
    terminals: [
      {
        id: '3',
        merchantId: 'MER123456791',
        terminalId: 'TRM001236',
        name: 'Сільпо у Борисполі',
        address: 'вул. Київський Шлях, 112',
        city: 'Бориспіль',
      },
    ],
  },
];