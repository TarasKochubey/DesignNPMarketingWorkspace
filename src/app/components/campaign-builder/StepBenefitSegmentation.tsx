import { useState } from 'react';
import { Users, UserPlus, UserCheck, TrendingDown, TrendingUp, CreditCard, Upload } from 'lucide-react';

interface StepBenefitSegmentationProps {
  formData: any;
  updateFormData: (data: any) => void;
}

interface SegmentationConfig {
  segments: string[];
  lowFrequencyThreshold?: number;
  highCheckThreshold?: number;
  specificUserIds?: string;
}

const segmentOptions = [
  { id: 'all', label: 'Всі користувачі', description: 'Без обмежень по сегментації', icon: Users },
  { id: 'new', label: 'Нові користувачі', description: 'Користувачі, які зареєструвались недавно', icon: UserPlus },
  { id: 'existing', label: 'Існуючі користувачі', description: 'Активні користувачі платформи', icon: UserCheck },
  { id: 'low_frequency', label: 'Low frequency', description: 'Користувачі з низькою активністю', icon: TrendingDown },
  { id: 'high_check', label: 'High чек', description: 'Користувачі з високим середнім чеком', icon: TrendingUp },
  { id: 'no_card_payment', label: 'Не платили карткою', description: 'Користувачі без транзакцій карткою', icon: CreditCard },
  { id: 'specific_users', label: 'Конкретні користувачі', description: 'Завантажити список ID користувачів', icon: Upload },
];

export function StepBenefitSegmentation({ formData, updateFormData }: StepBenefitSegmentationProps) {
  const defaultSegmentation: SegmentationConfig = {
    segments: ['all'],
    lowFrequencyThreshold: 2,
    highCheckThreshold: 1000,
    specificUserIds: '',
  };

  const [segmentation, setSegmentation] = useState<SegmentationConfig>({
    ...defaultSegmentation,
    ...formData.benefitSegmentation,
    segments: formData.benefitSegmentation?.segments || defaultSegmentation.segments,
  });

  const updateSegmentation = (updates: Partial<SegmentationConfig>) => {
    const updatedSegmentation = { ...segmentation, ...updates };
    setSegmentation(updatedSegmentation);
    updateFormData({ benefitSegmentation: updatedSegmentation });
  };

  const toggleSegment = (segmentId: string) => {
    let newSegments: string[];

    if (segmentId === 'all') {
      // If 'all' is selected, clear other segments
      newSegments = ['all'];
    } else {
      // Remove 'all' if other segments are selected
      newSegments = segmentation.segments.filter(s => s !== 'all');

      if (newSegments.includes(segmentId)) {
        newSegments = newSegments.filter(s => s !== segmentId);
      } else {
        newSegments = [...newSegments, segmentId];
      }

      // If no segments selected, default to 'all'
      if (newSegments.length === 0) {
        newSegments = ['all'];
      }
    }

    updateSegmentation({ segments: newSegments });
  };

  const isSegmentSelected = (segmentId: string) => {
    return segmentation.segments.includes(segmentId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Сегментація користувачів</h2>
        <p className="text-gray-600">Оберіть цільову аудиторію для застосування вигоди</p>
      </div>

      {/* Segment selection */}
      <div className="space-y-3">
        {segmentOptions.map((segment) => {
          const Icon = segment.icon;
          const isSelected = isSegmentSelected(segment.id);

          return (
            <div key={segment.id}>
              <button
                onClick={() => toggleSegment(segment.id)}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    isSelected ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{segment.label}</h3>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSegment(segment.id)}
                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </div>
                    <p className="text-sm text-gray-600">{segment.description}</p>
                  </div>
                </div>
              </button>

              {/* Additional parameters for specific segments */}
              {isSelected && segment.id === 'low_frequency' && (
                <div className="mt-3 ml-14 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Порогове значення транзакцій на місяць
                  </label>
                  <input
                    type="number"
                    value={segmentation.lowFrequencyThreshold || ''}
                    onChange={(e) => updateSegmentation({ lowFrequencyThreshold: parseInt(e.target.value) || undefined })}
                    placeholder="наприклад, 2"
                    min="1"
                    step="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Користувачі, які здійснили менше цієї кількості транзакцій за місяць
                  </p>
                </div>
              )}

              {isSelected && segment.id === 'high_check' && (
                <div className="mt-3 ml-14 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Мінімальний середній чек (грн)
                  </label>
                  <input
                    type="number"
                    value={segmentation.highCheckThreshold || ''}
                    onChange={(e) => updateSegmentation({ highCheckThreshold: parseInt(e.target.value) || undefined })}
                    placeholder="наприклад, 1000"
                    min="1"
                    step="1"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Користувачі з середнім чеком вище цієї суми
                  </p>
                </div>
              )}

              {isSelected && segment.id === 'specific_users' && (
                <div className="mt-3 ml-14 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Список ID користувачів (через кому або новий рядок)
                  </label>
                  <textarea
                    value={segmentation.specificUserIds || ''}
                    onChange={(e) => updateSegmentation({ specificUserIds: e.target.value })}
                    placeholder="USER123, USER456, USER789 або один ID на рядок"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Можна вставити список ID, розділених комою або новими рядками
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Обрано сегментів: </span>
          {segmentation.segments.length === 1 && segmentation.segments[0] === 'all'
            ? 'Всі користувачі'
            : `${segmentation.segments.filter(s => s !== 'all').length} сегмент(ів)`}
        </p>
      </div>
    </div>
  );
}
