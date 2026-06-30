import { useState } from 'react';
import { Plus, Search, Filter, Store, Edit2, Trash2, Upload, Download, Check, X, AlertCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { EditPartnerModal } from './Partners-EditModal';

// Import partner logos
import comfyLogo from 'figma:asset/a437862b887dc3624fff151dca74d2b8ead875af.png';
import okkoLogo from 'figma:asset/8d9de33ce6a5178b30fcba5172bc3b1f51681a8e.png';
import silpoLogo from 'figma:asset/d087854941d1bc2947bd1cfc6c762e3696209c7b.png';
import ancLogo from 'figma:asset/57ba3bf87827639281a17eb2449e87f0a543adc6.png';

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

interface ImportPreviewRow {
  legalEntityName: string;
  identificationCode: string;
  merchantId: string;
  terminalId: string;
  name: string;
  address: string;
  city: string;
  isValid: boolean;
  errors: string[];
}

const MOCK_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'СІЛЬПО',
    icon: '🟢',
    logoUrl: silpoLogo,
    category: 'Продуктові магазини',
    ownFundsRate: 8,
    creditFundsRate: 5,
    periods: [
      {
        id: '1-1',
        startMonth: '2026-01',
        endMonth: '2026-06',
        ownFundsRate: 8,
        creditFundsRate: 5,
      },
    ],
    legalEntities: [
      {
        id: '1-le-1',
        type: 'tov',
        identificationCode: '12345678',
        fullName: 'ТОВ "Сільпо-Фуд"',
        terminals: [
          { id: '1-t-1', merchantId: 'MRC-12345', terminalId: 'TRM-67890', name: 'Сільпо Хрещатик', address: 'вул. Хрещатик, 22', city: 'Київ' },
          { id: '1-t-2', merchantId: 'MRC-12345', terminalId: 'TRM-67891', name: 'Сільпо Троєщина', address: 'просп. Маяковського, 45', city: 'Київ' },
        ],
      },
      {
        id: '1-le-2',
        type: 'fop',
        identificationCode: '3012345678',
        fullName: 'ФОП Іваненко І.І.',
        terminals: [
          { id: '1-t-3', merchantId: 'MRC-12346', terminalId: 'TRM-67892', name: 'Сільпо Бориспіль', address: 'вул. Київський Шлях, 112', city: 'Бориспіль' },
        ],
      },
    ],
    isActive: true,
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'АЗС ОККО',
    icon: '🔴',
    logoUrl: okkoLogo,
    category: 'АЗС',
    ownFundsRate: 5,
    creditFundsRate: 3,
    periods: [
      {
        id: '2-1',
        startMonth: '2026-01',
        endMonth: '2026-06',
        ownFundsRate: 5,
        creditFundsRate: 3,
      },
    ],
    legalEntities: [
      {
        id: '2-le-1',
        type: 'tov',
        identificationCode: '23456789',
        fullName: 'ТОВ "ОККО"',
        terminals: [
          { id: '2-t-1', merchantId: 'MRC-23456', terminalId: 'TRM-78901', name: 'ОККО №101', address: 'Одеська траса 15 км', city: 'Київ' },
          { id: '2-t-2', merchantId: 'MRC-23456', terminalId: 'TRM-78902', name: 'ОККО №102', address: 'вул. Бориспільська, 5', city: 'Київ' },
        ],
      },
    ],
    isActive: true,
    createdAt: '2026-01-20',
  },
  {
    id: '3',
    name: 'COMFY',
    icon: '🟠',
    logoUrl: comfyLogo,
    category: 'Електроніка',
    ownFundsRate: 7,
    creditFundsRate: 4,
    periods: [
      {
        id: '3-1',
        startMonth: '2026-01',
        endMonth: '2026-06',
        ownFundsRate: 7,
        creditFundsRate: 4,
      },
    ],
    legalEntities: [
      {
        id: '3-le-1',
        type: 'tov',
        identificationCode: '34567890',
        fullName: 'ТОВ "Комфі Трейд"',
        terminals: [
          { id: '3-t-1', merchantId: 'MRC-34567', terminalId: 'TRM-89012', name: 'COMFY Retroville', address: 'просп. Степана Бандери, 27', city: 'Київ' },
        ],
      },
    ],
    isActive: true,
    createdAt: '2026-02-01',
  },
  {
    id: '4',
    name: 'Аптека АНЦ',
    icon: '🟢',
    logoUrl: ancLogo,
    category: 'Аптеки',
    ownFundsRate: 10,
    creditFundsRate: 6,
    periods: [
      {
        id: '4-1',
        startMonth: '2026-01',
        endMonth: '2026-06',
        ownFundsRate: 10,
        creditFundsRate: 6,
      },
    ],
    legalEntities: [
      {
        id: '4-le-1',
        type: 'tov',
        identificationCode: '45678901',
        fullName: 'ТОВ "АНЦ Медсервіс"',
        terminals: [
          { id: '4-t-1', merchantId: 'MRC-45678', terminalId: 'TRM-90123', name: 'АНЦ №1', address: 'вул. Хрещатик, 50', city: 'Київ' },
          { id: '4-t-2', merchantId: 'MRC-45678', terminalId: 'TRM-90124', name: 'АНЦ №2', address: 'вул. Велика Васильківська, 72', city: 'Київ' },
          { id: '4-t-3', merchantId: 'MRC-45678', terminalId: 'TRM-90125', name: 'АНЦ №3', address: 'вул. Антоновича, 15', city: 'Київ' },
          { id: '4-t-4', merchantId: 'MRC-45678', terminalId: 'TRM-90126', name: 'АНЦ №4', address: 'просп. Перемоги, 45', city: 'Київ' },
        ],
      },
    ],
    isActive: false,
    createdAt: '2026-02-05',
  },
];

// Helper function to get total terminals from legal entities
const getTotalTerminals = (partner: Partner): number => {
  return partner.legalEntities.reduce((sum, entity) => sum + entity.terminals.length, 0);
};

export function Partners() {
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [newPartner, setNewPartner] = useState<Partner | null>(null); // For creating new partner
  const [isDragging, setIsDragging] = useState(false);
  const [importPreview, setImportPreview] = useState<ImportPreviewRow[]>([]);
  const [currentPartnerId, setCurrentPartnerId] = useState<string | null>(null);

  const [newPartnerPeriod, setNewPartnerPeriod] = useState({
    startMonth: new Date().getMonth() + 1, // 1-12
    startYear: new Date().getFullYear(),
    endMonth: new Date().getMonth() + 3 > 12 ? (new Date().getMonth() + 3) % 12 : new Date().getMonth() + 3,
    endYear: new Date().getMonth() + 3 > 12 ? new Date().getFullYear() + 1 : new Date().getFullYear(),
  });

  const [newTerminal, setNewTerminal] = useState({
    merchantId: '',
    terminalId: '',
  });

  const handleAddPartner = () => {
    if (newPartner) {
      const partner: Partner = {
        id: Date.now().toString(),
        ...newPartner,
        periods: [
          {
            id: Date.now().toString(),
            startMonth: `${newPartnerPeriod.startYear}-${newPartnerPeriod.startMonth.toString().padStart(2, '0')}`,
            endMonth: `${newPartnerPeriod.endYear}-${newPartnerPeriod.endMonth.toString().padStart(2, '0')}`,
            ownFundsRate: newPartner.ownFundsRate,
            creditFundsRate: newPartner.creditFundsRate,
          },
        ],
        terminals: [],
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setPartners([...partners, partner]);
      setNewPartner(null);
      setShowAddModal(false);
    }
  };

  const handleUpdatePartner = () => {
    if (editingPartner) {
      setPartners(partners.map(p => p.id === editingPartner.id ? editingPartner : p));
      setEditingPartner(null);
    }
  };

  const handleDeletePartner = (id: string) => {
    if (confirm('Ви впевнені, що хочете видалити цього партнера?')) {
      setPartners(partners.filter(p => p.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setPartners(partners.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleAddTerminal = () => {
    if (editingPartner && newTerminal.merchantId && newTerminal.terminalId) {
      const updatedPartner = {
        ...editingPartner,
        terminals: [...editingPartner.terminals, { ...newTerminal }],
      };
      setEditingPartner(updatedPartner);
      setNewTerminal({ merchantId: '', terminalId: '' });
    }
  };

  const handleDeleteTerminal = (index: number) => {
    if (editingPartner) {
      const updatedPartner = {
        ...editingPartner,
        terminals: editingPartner.terminals.filter((_, i) => i !== index),
      };
      setEditingPartner(updatedPartner);
    }
  };

  const validateRow = (row: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!row.legalEntityName || row.legalEntityName.toString().trim() === '') {
      errors.push('Відсутня назва юридичної особи');
    }
    if (!row.identificationCode || row.identificationCode.toString().trim() === '') {
      errors.push('Відсутній ЄДРПОУ/ІПН');
    }
    if (!row.merchantId || row.merchantId.toString().trim() === '') {
      errors.push('Відсутній MerchantID');
    }
    if (!row.terminalId || row.terminalId.toString().trim() === '') {
      errors.push('Відсутній TerminalID');
    }

    return { isValid: errors.length === 0, errors };
  };

  const parseFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          processImportData(results.data);
        },
        error: (error) => {
          alert('Помилка при читанні CSV файлу: ' + error.message);
        },
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          processImportData(jsonData);
        } catch (error) {
          alert('Помилка при читанні Excel файлу');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Підтримуються тільки CSV та Excel (.xlsx, .xls) файли');
    }
  };

  const processImportData = (data: any[]) => {
    const preview: ImportPreviewRow[] = data.map((row) => {
      const validation = validateRow(row);
      return {
        legalEntityName: row.legalEntityName?.toString() || row['Назва юридичної особи']?.toString() || '',
        identificationCode: row.identificationCode?.toString() || row['ЄДРПОУ/ІПН']?.toString() || '',
        merchantId: row.merchantId?.toString() || '',
        terminalId: row.terminalId?.toString() || '',
        name: row.name?.toString() || row['Назва']?.toString() || '',
        address: row.address?.toString() || row['Адреса']?.toString() || '',
        city: row.city?.toString() || row['Місто']?.toString() || '',
        isValid: validation.isValid,
        errors: validation.errors,
      };
    });

    setImportPreview(preview);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      parseFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const confirmImport = () => {
    if (!currentPartnerId) return;

    const validRows = importPreview.filter(row => row.isValid);

    // Group terminals by identificationCode (ЄДРПОУ/ІПН)
    const groupedByEntity = validRows.reduce((acc, row) => {
      const code = row.identificationCode;
      if (!acc[code]) {
        acc[code] = {
          legalEntityName: row.legalEntityName,
          identificationCode: row.identificationCode,
          terminals: [],
        };
      }
      acc[code].terminals.push({
        id: `${Date.now()}-${Math.random()}`,
        merchantId: row.merchantId,
        terminalId: row.terminalId,
        name: row.name,
        address: row.address,
        city: row.city,
      });
      return acc;
    }, {} as Record<string, { legalEntityName: string; identificationCode: string; terminals: Terminal[] }>);

    setPartners(partners.map(p => {
      if (p.id === currentPartnerId) {
        const updatedEntities = [...p.legalEntities];

        // For each unique legal entity in the import
        Object.values(groupedByEntity).forEach(entityData => {
          // Try to find existing legal entity by identification code
          const existingEntityIndex = updatedEntities.findIndex(
            e => e.identificationCode === entityData.identificationCode
          );

          if (existingEntityIndex !== -1) {
            // Add terminals to existing legal entity
            updatedEntities[existingEntityIndex] = {
              ...updatedEntities[existingEntityIndex],
              terminals: [
                ...updatedEntities[existingEntityIndex].terminals,
                ...entityData.terminals,
              ],
            };
          } else {
            // Create new legal entity
            // Detect type based on identificationCode length (ІПН is 10 digits, ЄДРПОУ is 8)
            const type: 'tov' | 'fop' | 'other' =
              entityData.identificationCode.length === 10 ? 'fop' : 'tov';

            updatedEntities.push({
              id: `${Date.now()}-${Math.random()}`,
              type,
              identificationCode: entityData.identificationCode,
              fullName: entityData.legalEntityName,
              terminals: entityData.terminals,
            });
          }
        });

        return {
          ...p,
          legalEntities: updatedEntities,
        };
      }
      return p;
    }));

    if (editingPartner && editingPartner.id === currentPartnerId) {
      const updatedEntities = [...editingPartner.legalEntities];

      Object.values(groupedByEntity).forEach(entityData => {
        const existingEntityIndex = updatedEntities.findIndex(
          e => e.identificationCode === entityData.identificationCode
        );

        if (existingEntityIndex !== -1) {
          updatedEntities[existingEntityIndex] = {
            ...updatedEntities[existingEntityIndex],
            terminals: [
              ...updatedEntities[existingEntityIndex].terminals,
              ...entityData.terminals,
            ],
          };
        } else {
          const type: 'tov' | 'fop' | 'other' =
            entityData.identificationCode.length === 10 ? 'fop' : 'tov';

          updatedEntities.push({
            id: `${Date.now()}-${Math.random()}`,
            type,
            identificationCode: entityData.identificationCode,
            fullName: entityData.legalEntityName,
            terminals: entityData.terminals,
          });
        }
      });

      setEditingPartner({
        ...editingPartner,
        legalEntities: updatedEntities,
      });
    }

    setImportPreview([]);
    setShowBulkImport(false);
    setCurrentPartnerId(null);
  };

  const downloadTemplate = () => {
    const template = [
      {
        legalEntityName: 'ТОВ "Приклад"',
        identificationCode: '12345678',
        merchantId: 'MRC-12345',
        terminalId: 'TRM-67890',
        name: 'Магазин на Хрещатику',
        address: 'вул. Хрещатик, 22',
        city: 'Київ',
      },
      {
        legalEntityName: 'ТОВ "Приклад"',
        identificationCode: '12345678',
        merchantId: 'MRC-12345',
        terminalId: 'TRM-67891',
        name: 'Магазин на Троєщині',
        address: 'просп. Маяковського, 45',
        city: 'Київ',
      },
      {
        legalEntityName: 'ФОП Іваненко І.І.',
        identificationCode: '3012345678',
        merchantId: 'MRC-12346',
        terminalId: 'TRM-67892',
        name: 'Магазин у Борисполі',
        address: 'вул. Київський Шлях, 112',
        city: 'Бориспіль',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Термінали');
    XLSX.writeFile(workbook, 'шаблон_термінали.xlsx');
  };

  const filteredPartners = partners.filter(p => {
    const query = searchQuery.toLowerCase();

    // Search by name, MerchantID, or TerminalID across all legal entities
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.legalEntities.some(entity =>
        entity.terminals.some(t =>
          t.merchantId.toLowerCase().includes(query) ||
          t.terminalId.toLowerCase().includes(query)
        )
      );

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && p.isActive) ||
      (filterStatus === 'inactive' && !p.isActive);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: partners.length,
    active: partners.filter(p => p.isActive).length,
    inactive: partners.filter(p => !p.isActive).length,
    totalTerminals: partners.reduce((sum, p) => sum + getTotalTerminals(p), 0),
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Партнери</h1>
        <p className="text-gray-600">Управління торговими партнерами та їх терміналами</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою, MerchantID або TerminalID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border-none focus:outline-none text-gray-700 font-medium bg-transparent cursor-pointer"
            >
              <option value="all">Всі статуси</option>
              <option value="active">Тільки активні</option>
              <option value="inactive">Тільки неактивні</option>
            </select>
          </div>
          <button
            onClick={() => {
              setNewPartner({
                id: '',
                name: '',
                icon: '🟢',
                category: '',
                ownFundsRate: 5,
                creditFundsRate: 3,
                periods: [],
                legalEntities: [],
                isActive: true,
                createdAt: new Date().toISOString().split('T')[0],
              });
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Додати партнера
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Партнер</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Категорія</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Статус</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Store className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">Партнерів не знайдено</p>
                    <p className="text-sm text-gray-500">Спробуйте змінити параметри пошуку</p>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {partner.logoUrl ? (
                          <div className="w-16 h-10 flex items-center justify-center">
                            <img 
                              src={partner.logoUrl} 
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                            {partner.icon}
                          </div>
                        )}
                        <p className="font-semibold text-gray-900">{partner.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{partner.category || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={partner.isActive}
                          onChange={() => handleToggleActive(partner.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPartner(partner)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePartner(partner.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Partner Modal - DEPRECATED, replaced with EditPartnerModal */}

      {/* New Partner Modal */}
      {newPartner && (
        <EditPartnerModal
          partner={newPartner}
          onClose={() => setNewPartner(null)}
          onSave={(savedPartner) => {
            const partner: Partner = {
              ...savedPartner,
              id: Date.now().toString(),
              isActive: true,
              createdAt: new Date().toISOString().split('T')[0],
            };
            setPartners([...partners, partner]);
            setNewPartner(null);
          }}
          onOpenBulkImport={() => {
            // Ignore for new partner creation
          }}
          isNew={true}
        />
      )}

      {/* Edit Partner Modal */}
      {editingPartner && (
        <EditPartnerModal
          partner={editingPartner}
          onClose={() => setEditingPartner(null)}
          onSave={(updatedPartner) => {
            setPartners(partners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
            setEditingPartner(null);
          }}
          onOpenBulkImport={() => {
            setCurrentPartnerId(editingPartner.id);
            setShowBulkImport(true);
          }}
        />
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && currentPartnerId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Масове завантаження терміналів</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Завантаження для: <span className="font-semibold text-purple-600">
                    {partners.find(p => p.id === currentPartnerId)?.name}
                  </span>
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBulkImport(false);
                  setImportPreview([]);
                  setCurrentPartnerId(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {importPreview.length === 0 ? (
                <div className="space-y-4">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      isDragging
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
                    }`}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Перетягніть файл сюди або натисніть для вибору
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Підтримуються формати: CSV, Excel (.xlsx, .xls)
                    </p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-medium"
                    >
                      <FileText className="w-5 h-5" />
                      Вибрати файл
                    </label>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Формат файлу:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• <strong>legalEntityName</strong> - Назва юридичної особи / ПІБ ФОП (обов'язково)</p>
                      <p>• <strong>identificationCode</strong> - ЄДРПОУ для юр.особи / ІПН для ФОП (обов'язково)</p>
                      <p>• <strong>merchantId</strong> - Merchant ID (обов'язково)</p>
                      <p>• <strong>terminalId</strong> - Terminal ID (обов'язково)</p>
                      <p>• <strong>name</strong> - Назва точки (опціонально)</p>
                      <p>• <strong>address</strong> - Адреса (опціонально)</p>
                      <p>• <strong>city</strong> - Місто (опціонально)</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="text-xs text-gray-500 mb-3">
                        <strong>Примітка:</strong> Термінали автоматично групуються за ЄДРПОУ/ІПН.
                        Якщо юридична особа з таким кодом вже існує, термінали будуть додані до неї.
                      </p>
                      <button
                        onClick={downloadTemplate}
                        className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Завантажити шаблон
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900">
                        Знайдено {importPreview.length} записів
                      </p>
                      <p className="text-sm text-blue-700">
                        Валідних: {importPreview.filter(r => r.isValid).length} | 
                        З помилками: {importPreview.filter(r => !r.isValid).length}
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">Статус</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">Юр. особа</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">ЄДРПОУ/ІПН</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">MerchantID</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">TerminalID</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">Назва</th>
                            <th className="px-3 py-3 text-left font-semibold text-gray-900">Місто</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {importPreview.map((row, index) => (
                            <tr key={index} className={row.isValid ? 'bg-white' : 'bg-red-50'}>
                              <td className="px-3 py-3">
                                {row.isValid ? (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <Check className="w-4 h-4" />
                                    <span className="text-xs font-medium">ОК</span>
                                  </span>
                                ) : (
                                  <div className="group relative">
                                    <span className="flex items-center gap-1 text-red-600 cursor-help">
                                      <AlertCircle className="w-4 h-4" />
                                      <span className="text-xs font-medium">Помилка</span>
                                    </span>
                                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 w-64 z-10">
                                      {row.errors.map((err, i) => (
                                        <div key={i}>• {err}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="px-3 py-3 text-gray-900 max-w-[200px] truncate" title={row.legalEntityName}>
                                {row.legalEntityName}
                              </td>
                              <td className="px-3 py-3 font-mono text-gray-900">{row.identificationCode}</td>
                              <td className="px-3 py-3 font-mono text-gray-900">{row.merchantId}</td>
                              <td className="px-3 py-3 font-mono text-gray-900">{row.terminalId}</td>
                              <td className="px-3 py-3 text-gray-700">{row.name || '—'}</td>
                              <td className="px-3 py-3 text-gray-700">{row.city || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {importPreview.filter(r => !r.isValid).length > 0 && (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm text-amber-900">
                        <strong>Увага:</strong> Записи з помилками не будуть імпортовані. 
                        Виправте помилки у файлі та завантажте заново.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {importPreview.length > 0 && (
              <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <button
                  onClick={() => setImportPreview([])}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Назад
                </button>
                <button
                  onClick={confirmImport}
                  disabled={importPreview.filter(r => r.isValid).length === 0}
                  className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Імпортувати {importPreview.filter(r => r.isValid).length} терміналів
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}