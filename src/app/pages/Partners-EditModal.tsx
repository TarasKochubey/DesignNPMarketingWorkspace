// This is a new component file for the Edit Partner Modal with all requested changes
import { useState } from 'react';
import { X, Upload, Trash2, Plus, ImageIcon, ChevronDown, ChevronUp, Building2, Copy } from 'lucide-react';

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

interface PartnerPeriod {
  id: string;
  startMonth: string;  // '2026-02'
  endMonth: string;    // '2026-05'
  ownFundsRate: number;
  creditFundsRate: number;
}

interface Partner {
  id: string;
  name: string;
  icon: string;
  logoUrl?: string;
  category: string;
  ownFundsRate: number;
  creditFundsRate: number;
  periods: PartnerPeriod[];
  legalEntities: LegalEntity[];
  isActive: boolean;
  createdAt: string;
}

interface EditPartnerModalProps {
  partner: Partner;
  onClose: () => void;
  onSave: (partner: Partner) => void;
  onOpenBulkImport: () => void;
  isNew?: boolean; // Flag to indicate if this is a new partner
}

export function EditPartnerModal({ partner: initialPartner, onClose, onSave, onOpenBulkImport, isNew }: EditPartnerModalProps) {
  const [editingPartner, setEditingPartner] = useState<Partner>({
    ...initialPartner,
    legalEntities: initialPartner.legalEntities || [],
    periods: initialPartner.periods || [],
  });
  const [expandedEntities, setExpandedEntities] = useState<Set<string>>(new Set());

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
    setEditingPartner({
      ...editingPartner,
      legalEntities: [...editingPartner.legalEntities, newEntity],
    });
    setExpandedEntities(new Set([...expandedEntities, newEntity.id]));
  };

  const removeLegalEntity = (entityId: string) => {
    setEditingPartner({
      ...editingPartner,
      legalEntities: editingPartner.legalEntities.filter(e => e.id !== entityId),
    });
    const newExpanded = new Set(expandedEntities);
    newExpanded.delete(entityId);
    setExpandedEntities(newExpanded);
  };

  const updateLegalEntity = (entityId: string, updates: Partial<LegalEntity>) => {
    setEditingPartner({
      ...editingPartner,
      legalEntities: editingPartner.legalEntities.map(e =>
        e.id === entityId ? { ...e, ...updates } : e
      ),
    });
  };

  const addTerminal = (entityId: string) => {
    const entity = editingPartner.legalEntities.find(e => e.id === entityId);
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
    const entity = editingPartner.legalEntities.find(e => e.id === entityId);
    if (!entity) return;

    updateLegalEntity(entityId, {
      terminals: entity.terminals.filter(t => t.id !== terminalId),
    });
  };

  const updateTerminal = (entityId: string, terminalId: string, updates: Partial<Terminal>) => {
    const entity = editingPartner.legalEntities.find(e => e.id === entityId);
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

  const getTotalTerminals = () => {
    return editingPartner.legalEntities.reduce((sum, entity) => sum + entity.terminals.length, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{isNew ? 'Додати нового партнера' : 'Редагувати партнера'}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            {/* Basic Info + Logo */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Назва партнера</label>
                  <input
                    type="text"
                    value={editingPartner.name}
                    onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категорія</label>
                  <input
                    type="text"
                    value={editingPartner.category}
                    onChange={(e) => setEditingPartner({ ...editingPartner, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Іконка/Логотип</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                  {editingPartner.logoUrl ? (
                    <div className="relative group">
                      <img 
                        src={editingPartner.logoUrl} 
                        alt={editingPartner.name}
                        className="w-full h-24 object-contain mb-2"
                      />
                      <button
                        onClick={() => setEditingPartner({ ...editingPartner, logoUrl: '' })}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-2">Завантажте логотип</p>
                      <input
                        type="text"
                        placeholder="URL логотипу"
                        value={editingPartner.logoUrl || ''}
                        onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Legal Entities Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Юридичні особи</h4>
                  <p className="text-sm text-gray-600">Організації партнера з торговими точками</p>
                </div>
                <div className="flex items-center gap-2">
                  {!isNew && (
                    <button
                      onClick={onOpenBulkImport}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      Масове завантаження
                    </button>
                  )}
                  <button
                    onClick={addLegalEntity}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Додати юр. особу
                  </button>
                </div>
              </div>

              {editingPartner.legalEntities.length === 0 ? (
                <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Юридичні особи не додано</p>
                  <p className="text-sm text-gray-500">Додайте юридичну особу щоб почати</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {editingPartner.legalEntities.map((entity) => (
                    <div key={entity.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Entity Header */}
                      <div className="p-4 bg-gray-50">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>

                          <div className="flex-1 grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                Тип організації *
                              </label>
                              <select
                                value={entity.type}
                                onChange={(e) => updateLegalEntity(entity.id, { type: e.target.value as 'tov' | 'fop' | 'other' })}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              >
                                <option value="tov">ТзОВ</option>
                                <option value="fop">ФОП</option>
                                <option value="other">Інші</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                {getIdentificationCodeLabel(entity.type)} *
                              </label>
                              <input
                                type="text"
                                value={entity.identificationCode}
                                onChange={(e) => updateLegalEntity(entity.id, { identificationCode: e.target.value })}
                                placeholder={entity.type === 'fop' ? 'Введіть ІПН' : 'Введіть ЄДРПОУ'}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                Повна назва
                              </label>
                              <input
                                type="text"
                                value={entity.fullName}
                                onChange={(e) => updateLegalEntity(entity.id, { fullName: e.target.value })}
                                placeholder="Наприклад: ТОВ 'Сільпо-Фуд'"
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleEntity(entity.id)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
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
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                              title="Видалити"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Entity Terminals */}
                      {expandedEntities.has(entity.id) && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="text-sm font-semibold text-gray-900">
                                Торгові точки
                              </h5>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {entity.terminals.length} {entity.terminals.length === 1 ? 'точка' : entity.terminals.length < 5 ? 'точки' : 'точок'}
                              </p>
                            </div>
                            <button
                              onClick={() => addTerminal(entity.id)}
                              className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-purple-200"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Додати точку
                            </button>
                          </div>

                          {entity.terminals.length === 0 ? (
                            <div className="text-center py-6 text-gray-400 bg-gray-50 rounded-lg">
                              <p className="text-xs">Торгові точки не додано</p>
                            </div>
                          ) : (
                            <div className="overflow-x-auto bg-gray-50 rounded-lg">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="border-b border-gray-200">
                                    <th className="px-3 py-2 text-left font-medium text-gray-600">MerchantID</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-600">TerminalID</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-600">Назва</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-600">Адреса</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-600">Місто</th>
                                    <th className="px-3 py-2 text-right font-medium text-gray-600">Дії</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {entity.terminals.map((terminal) => (
                                    <tr key={terminal.id} className="hover:bg-gray-100">
                                      <td className="px-3 py-2">
                                        <div className="flex items-center gap-1.5">
                                          <input
                                            type="text"
                                            value={terminal.merchantId}
                                            onChange={(e) => updateTerminal(entity.id, terminal.id, { merchantId: e.target.value })}
                                            placeholder="MRC-xxxxx"
                                            className="w-24 px-2 py-1 bg-white border-0 rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
                                          />
                                          {terminal.merchantId && (
                                            <button
                                              onClick={() => navigator.clipboard.writeText(terminal.merchantId)}
                                              className="p-0.5 text-gray-400 hover:text-gray-600"
                                            >
                                              <Copy className="w-3 h-3" />
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-3 py-2">
                                        <div className="flex items-center gap-1.5">
                                          <input
                                            type="text"
                                            value={terminal.terminalId}
                                            onChange={(e) => updateTerminal(entity.id, terminal.id, { terminalId: e.target.value })}
                                            placeholder="TRM-xxxxx"
                                            className="w-24 px-2 py-1 bg-white border-0 rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
                                          />
                                          {terminal.terminalId && (
                                            <button
                                              onClick={() => navigator.clipboard.writeText(terminal.terminalId)}
                                              className="p-0.5 text-gray-400 hover:text-gray-600"
                                            >
                                              <Copy className="w-3 h-3" />
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={terminal.name}
                                          onChange={(e) => updateTerminal(entity.id, terminal.id, { name: e.target.value })}
                                          placeholder="Назва"
                                          className="w-full px-2 py-1 bg-white border-0 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={terminal.address}
                                          onChange={(e) => updateTerminal(entity.id, terminal.id, { address: e.target.value })}
                                          placeholder="Адреса"
                                          className="w-full px-2 py-1 bg-white border-0 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                      </td>
                                      <td className="px-3 py-2">
                                        <input
                                          type="text"
                                          value={terminal.city}
                                          onChange={(e) => updateTerminal(entity.id, terminal.id, { city: e.target.value })}
                                          placeholder="Місто"
                                          className="w-full px-2 py-1 bg-white border-0 rounded text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                      </td>
                                      <td className="px-3 py-2 text-right">
                                        <button
                                          onClick={() => removeTerminal(entity.id, terminal.id)}
                                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
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

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              Юридичних осіб: <span className="font-semibold text-gray-900">{editingPartner.legalEntities.length}</span>
            </span>
            <span className="text-gray-300">•</span>
            <span>
              Всього терміналів: <span className="font-semibold text-gray-900">{getTotalTerminals()}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(editingPartner)}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              {isNew ? 'Додати партнера' : 'Зберегти зміни'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}