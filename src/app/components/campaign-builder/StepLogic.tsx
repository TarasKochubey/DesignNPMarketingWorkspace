import { Plus, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StepLogicProps {
  formData: any;
  updateFormData: (data: any) => void;
}

interface Condition {
  id: string;
  type: 'condition';
  field: string;
  value: string;
  operatorBefore?: 'AND' | 'OR'; // Оператор перед цією умовою
}

interface Group {
  id: string;
  type: 'group';
  operatorBefore?: 'AND' | 'OR'; // Оператор перед цією групою
  rules: (Condition | Group)[];
}

type Rule = Condition | Group;

export function StepLogic({ formData, updateFormData }: StepLogicProps) {
  const [queryBuilder, setQueryBuilder] = useState<Group>({
    id: 'root',
    type: 'group',
    rules: [
      { id: '1', type: 'condition', field: '', value: '' }
    ]
  });

  // Встановлюємо trigger по замовчуванню
  useEffect(() => {
    if (!formData.trigger) {
      updateFormData({ trigger: 'on_transaction' });
    }
  }, [formData.trigger, updateFormData]);

  const updateGroup = (groupId: string, updates: Partial<Group>, path: string[] = []): Group => {
    const updateRecursive = (group: Group, currentPath: string[]): Group => {
      if (group.id === groupId && currentPath.length === 0) {
        return { ...group, ...updates };
      }
      
      return {
        ...group,
        rules: group.rules.map(rule => {
          if (rule.type === 'group') {
            return updateRecursive(rule, currentPath.slice(1));
          }
          return rule;
        })
      };
    };
    
    return updateRecursive(queryBuilder, path);
  };

  const addRule = (groupId: string, ruleType: 'condition' | 'group') => {
    const addToGroup = (group: Group): Group => {
      if (group.id === groupId) {
        const newRule: Rule = ruleType === 'condition'
          ? { id: Date.now().toString(), type: 'condition', field: '', value: '' }
          : { id: Date.now().toString(), type: 'group', rules: [
              { id: Date.now().toString() + '_1', type: 'condition', field: '', value: '' }
            ]};
        
        return { ...group, rules: [...group.rules, newRule] };
      }
      
      return {
        ...group,
        rules: group.rules.map(rule => 
          rule.type === 'group' ? addToGroup(rule) : rule
        )
      };
    };
    
    setQueryBuilder(addToGroup(queryBuilder));
  };

  const removeRule = (groupId: string, ruleId: string) => {
    const removeFromGroup = (group: Group): Group => {
      if (group.id === groupId) {
        const newRules = group.rules.filter(r => r.id !== ruleId);
        // Завжди залишаємо хоча б одну умову
        return { ...group, rules: newRules.length > 0 ? newRules : [
          { id: Date.now().toString(), type: 'condition', field: '', value: '' }
        ]};
      }
      
      return {
        ...group,
        rules: group.rules.map(rule => 
          rule.type === 'group' ? removeFromGroup(rule) : rule
        )
      };
    };
    
    setQueryBuilder(removeFromGroup(queryBuilder));
  };

  const updateCondition = (conditionId: string, field: string, value: string) => {
    const updateInGroup = (group: Group): Group => {
      return {
        ...group,
        rules: group.rules.map(rule => {
          if (rule.type === 'condition' && rule.id === conditionId) {
            return { ...rule, field, value };
          } else if (rule.type === 'group') {
            return updateInGroup(rule);
          }
          return rule;
        })
      };
    };
    
    setQueryBuilder(updateInGroup(queryBuilder));
  };

  const renderConditionValueInput = (rule: Condition) => {
    switch (rule.field) {
      case 'excluded_mcc':
        return (
          <input
            type="text"
            value={rule.value}
            onChange={(e) => updateCondition(rule.id, rule.field, e.target.value)}
            placeholder="Введіть MCC коди через кому (напр: 5411, 5812, 7995)..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        );

      case 'amount_min':
      case 'amount_max':
        return (
          <input
            type="number"
            value={rule.value}
            onChange={(e) => updateCondition(rule.id, rule.field, e.target.value)}
            placeholder="Введіть суму..."
            min="0"
            step="0.01"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        );
      
      default:
        return (
          <input
            type="text"
            value={rule.value}
            onChange={(e) => updateCondition(rule.id, rule.field, e.target.value)}
            placeholder="Введіть значення..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        );
    }
  };

  const setOperator = (groupId: string, operator: 'AND' | 'OR') => {
    const setInGroup = (group: Group): Group => {
      if (group.id === groupId) {
        return { ...group, operator };
      }
      
      return {
        ...group,
        rules: group.rules.map(rule => 
          rule.type === 'group' ? setInGroup(rule) : rule
        )
      };
    };
    
    setQueryBuilder(setInGroup(queryBuilder));
  };

  const setRuleOperator = (ruleId: string, operator: 'AND' | 'OR') => {
    const setInGroup = (group: Group): Group => {
      return {
        ...group,
        rules: group.rules.map(rule => {
          if (rule.id === ruleId) {
            return { ...rule, operatorBefore: operator };
          } else if (rule.type === 'group') {
            return setInGroup(rule);
          }
          return rule;
        })
      };
    };
    
    setQueryBuilder(setInGroup(queryBuilder));
  };

  const renderGroup = (group: Group, depth: number = 0): JSX.Element => {
    const isRoot = depth === 0;
    
    return (
      <div 
        key={group.id}
        className={`${!isRoot ? 'ml-6 pl-4 border-l-2 border-purple-300' : ''}`}
      >
        {/* Add condition/group buttons */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => addRule(group.id, 'condition')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Умова
          </button>
          <button
            onClick={() => addRule(group.id, 'group')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Група
          </button>
        </div>

        {/* Rules */}
        <div className="space-y-2">
          {group.rules.map((rule, index) => (
            <div key={rule.id}>
              {index > 0 && (
                <div className="flex items-center gap-2 my-3">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-0.5">
                    <button
                      onClick={() => setRuleOperator(rule.id, 'AND')}
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded transition-colors ${
                        (rule.operatorBefore || 'AND') === 'AND'
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      AND
                    </button>
                    <button
                      onClick={() => setRuleOperator(rule.id, 'OR')}
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded transition-colors ${
                        rule.operatorBefore === 'OR'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      OR
                    </button>
                  </div>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
              )}
              
              {rule.type === 'condition' ? (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <select
                        value={rule.field}
                        onChange={(e) => updateCondition(rule.id, e.target.value, '')}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      >
                        <option value="">Оберіть умову</option>
                        <option value="amount_min">Мінімальна сума</option>
                        <option value="amount_max">Максимальна сума</option>
                        <option value="excluded_mcc">Виключені МСС</option>
                      </select>
                      
                      {renderConditionValueInput(rule)}
                    </div>
                    <button
                      onClick={() => removeRule(group.id, rule.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-purple-50/30 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      {renderGroup(rule, depth + 1)}
                    </div>
                    <button
                      onClick={() => removeRule(group.id, rule.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Логіка та тригери кампанії</h2>
        <p className="text-gray-600">Визначте, коли і як активується кампанія</p>
      </div>

      {/* Trigger info (read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип тригера
        </label>
        <div className="relative">
          <select
            value={formData.trigger}
            onChange={(e) => updateFormData({ trigger: e.target.value })}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer font-medium"
          >
            <option value="on_transaction">Транзакція</option>
            <option value="on_event">Подія</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Required Conditions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Обов'язкові умови транзакції
        </label>
        
        <div className="space-y-3">
          {/* Operation Type - Required */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип операції
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="">Оберіть тип операції</option>
              <option value="merchant">Торгові операції</option>
            </select>
          </div>

          {/* Card Type - Required */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип картки
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <div className="space-y-1.5">
                {[
                  { value: 'debit', label: 'Дебетна картка' },
                  { value: 'credit', label: 'Кредитна картка' },
                  { value: 'entrepreneur', label: 'Картка ФОП' }
                ].map(cardType => (
                  <label key={cardType.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{cardType.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Conditions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-700">Додаткові умови транзакції</label>
          <button
            onClick={() => addRule('root', 'condition')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати умову
          </button>
        </div>

        <div className="space-y-3">
          {renderGroup(queryBuilder)}
        </div>
      </div>
    </div>
  );
}