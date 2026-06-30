import { useState } from 'react';
import { Plus, X, Users, TrendingUp, AlertCircle, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

interface StepAudienceProps {
  formData: any;
  updateFormData: (data: any) => void;
}

// Mock data - в реальному проєкті це буде завантажуватись з API
const AVAILABLE_AUDIENCES = [
  {
    id: 1,
    name: 'Клієнти з високими витратами',
    description: 'Клієнти з місячними витратами > ₴10,000',
    size: 8234,
    campaigns: 3,
  },
  {
    id: 2,
    name: 'Нові клієнти',
    description: 'Зареєстровані за останні 30 днів',
    size: 15234,
    campaigns: 2,
  },
  {
    id: 3,
    name: 'Покупці продуктів',
    description: 'Активні в категорії продуктів',
    size: 12534,
    campaigns: 4,
  },
  {
    id: 4,
    name: 'Неактивні користувачі',
    description: 'Без транзакцій за останні 30 днів',
    size: 5821,
    campaigns: 1,
  },
  {
    id: 5,
    name: 'Постійні клієнти аптек',
    description: 'Часті покупки в аптеках',
    size: 4523,
    campaigns: 2,
  },
];

export function StepAudience({ formData, updateFormData }: StepAudienceProps) {
  const [selectedAudienceIds, setSelectedAudienceIds] = useState<number[]>([1, 2]);

  const handleToggleAudience = (audienceId: number) => {
    if (selectedAudienceIds.includes(audienceId)) {
      setSelectedAudienceIds(selectedAudienceIds.filter(id => id !== audienceId));
    } else {
      setSelectedAudienceIds([...selectedAudienceIds, audienceId]);
    }
  };

  const selectedAudiences = AVAILABLE_AUDIENCES.filter(a => selectedAudienceIds.includes(a.id));
  const totalSize = selectedAudiences.reduce((sum, a) => sum + a.size, 0);

  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      {/* Left side - Audience selection */}
      <div className="col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Вибір аудиторії</h2>
          <p className="text-gray-600">Оберіть сегменти користувачів для цієї кампанії</p>
        </div>

        {/* Link to Audiences page */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-900">Управління аудиторіями</p>
              <p className="text-xs text-purple-700">Створіть нові аудиторії та налаштуйте критерії сегментації</p>
            </div>
          </div>
          <Link
            to="/audiences"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Перейти до аудиторій
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Available Audiences */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Доступні аудиторії ({AVAILABLE_AUDIENCES.length})
            </label>
          </div>

          <div className="space-y-3">
            {AVAILABLE_AUDIENCES.map((audience) => {
              const isSelected = selectedAudienceIds.includes(audience.id);
              return (
                <button
                  key={audience.id}
                  onClick={() => handleToggleAudience(audience.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-purple-600' : 'bg-gray-200'
                    }`}>
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Users className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className={`font-semibold ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>
                            {audience.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-0.5">{audience.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className={`text-xl font-bold ${isSelected ? 'text-purple-600' : 'text-gray-900'}`}>
                            {audience.size.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">користувачів</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          {audience.campaigns} активних кампаній
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>💡 Підказка:</strong> Ви можете обрати декілька аудиторій для однієї кампанії. 
            Користувачі, які входять до будь-якої з обраних аудиторій, будуть включені в кампанію.
          </p>
        </div>
      </div>

      {/* Right side - Live preview */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Підсумок</h3>
          
          {/* Estimated users card */}
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-900">{totalSize.toLocaleString()}</p>
                <p className="text-sm text-purple-700">Всього користувачів</p>
              </div>
            </div>
            <p className="text-sm text-purple-700">
              Обрано <span className="font-semibold">{selectedAudiences.length}</span> {selectedAudiences.length === 1 ? 'аудиторія' : 'аудиторій'}
            </p>
          </div>

          {/* Selected audiences list */}
          {selectedAudiences.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Обрані аудиторії:</h4>
              <div className="space-y-2">
                {selectedAudiences.map((audience) => (
                  <div key={audience.id} className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{audience.name}</p>
                        <p className="text-xs text-gray-500">{audience.size.toLocaleString()} користувачів</p>
                      </div>
                      <button
                        onClick={() => handleToggleAudience(audience.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}