import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { ArrowLeft, Save, Rocket, ChevronDown, ChevronUp } from 'lucide-react';

// Import step components
import { StepBasics } from '../components/campaign-builder/StepBasics';
import { StepLogic } from '../components/campaign-builder/StepLogic';
import { StepReward } from '../components/campaign-builder/StepReward';

interface Section {
  id: string;
  title: string;
  icon: string;
  description: string;
  isValid: boolean;
}

export function SinglePageCampaignBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const campaignData = location.state?.campaign;
  const isEditMode = !!id && !!campaignData;
  
  // Refs for scrolling
  const basicsRef = useRef<HTMLDivElement>(null);
  const logicRef = useRef<HTMLDivElement>(null);
  const rewardRef = useRef<HTMLDivElement>(null);
  
  // Collapsed sections state
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    basics: false,
    logic: false,
    reward: false,
  });
  
  // Active section tracking for sticky nav
  const [activeSection, setActiveSection] = useState('basics');
  
  const [formData, setFormData] = useState({
    // Step 1 - Basics
    name: '',
    type: '',
    goal: '',
    description: '',
    launchOption: 'now' as 'now' | 'scheduled',
    scheduledDate: '',
    // Step 2 - Logic
    trigger: '',
    conditions: [],
    // Step 3 - Reward
    rewardType: '',
    rewardRate: '',
    categoryRates: {},
    universalRates: {},
    partnerRates: {},
  });

  // Initialize form data from campaign when editing
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        name: campaignData.name || '',
        type: campaignData.type || '',
        goal: '',
        description: '',
        trigger: '',
        conditions: [],
        rewardType: '',
        rewardRate: '',
        categoryRates: {},
        universalRates: {},
        partnerRates: {},
        launchOption: 'now',
        scheduledDate: '',
      });
    }
  }, [isEditMode, campaignData]);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  // Validation logic for sections
  const sections: Section[] = [
    {
      id: 'basics',
      title: 'Основна інформація',
      icon: '📋',
      description: 'Назва, тип та базові налаштування кампанії',
      isValid: formData.type !== '' && formData.name !== '',
    },
    {
      id: 'logic',
      title: 'Період дії',
      icon: '📅',
      description: 'Коли кампанія буде активна',
      isValid: formData.launchOption === 'now' || formData.scheduledDate !== '',
    },
    {
      id: 'reward',
      title: 'Винагорода',
      icon: '💰',
      description: 'Налаштування кешбеку та винагород',
      isValid: formData.rewardType !== '',
    },
  ];

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      basics: basicsRef,
      logic: logicRef,
      reward: rewardRef,
    };
    
    const ref = refs[sectionId];
    if (ref.current) {
      const top = ref.current.offsetTop - 100; // Offset for sticky header
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Toggle section collapse
  const toggleSection = (sectionId: string) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    });
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      
      if (rewardRef.current && scrollPos >= rewardRef.current.offsetTop) {
        setActiveSection('reward');
      } else if (logicRef.current && scrollPos >= logicRef.current.offsetTop) {
        setActiveSection('logic');
      } else {
        setActiveSection('basics');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = () => {
    console.log('Saving campaign:', formData);
    navigate('/campaigns');
  };

  const handleLaunch = () => {
    console.log('Launching campaign:', formData);
    navigate('/campaigns');
  };

  const getCompletionPercentage = () => {
    const validSections = sections.filter(s => s.isValid).length;
    return Math.round((validSections / sections.length) * 100);
  };

  const isFormValid = () => {
    return sections.every(s => s.isValid);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header with Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-4">
          <div className="max-w-5xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/campaigns')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {isEditMode ? 'Редагувати кампанію' : 'Нова кампанія'}
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  Зберегти чернетку
                </button>
                <button
                  onClick={handleLaunch}
                  className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <Rocket className="w-4 h-4" />
                  {formData.launchOption === 'scheduled' ? 'Запланувати' : 'Запустити'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Section 1: Basics */}
          <div ref={basicsRef} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('basics')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sections[0].icon}</span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">{sections[0].title}</h2>
                  <p className="text-sm text-gray-600">{sections[0].description}</p>
                </div>
              </div>
              {collapsedSections.basics ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {!collapsedSections.basics && (
              <div className="border-t border-gray-200 p-6">
                <StepBasics
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={() => scrollToSection('logic')}
                  onBack={() => navigate('/campaigns')}
                  isFirstStep={true}
                  isLastStep={false}
                />
              </div>
            )}
          </div>

          {/* Section 2: Logic (Period) */}
          <div ref={logicRef} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('logic')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sections[1].icon}</span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">{sections[1].title}</h2>
                  <p className="text-sm text-gray-600">{sections[1].description}</p>
                </div>
              </div>
              {collapsedSections.logic ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {!collapsedSections.logic && (
              <div className="border-t border-gray-200 p-6">
                <StepLogic
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={() => scrollToSection('reward')}
                  onBack={() => scrollToSection('basics')}
                  isFirstStep={false}
                  isLastStep={false}
                />
              </div>
            )}
          </div>

          {/* Section 3: Reward */}
          <div ref={rewardRef} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleSection('reward')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{sections[2].icon}</span>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">{sections[2].title}</h2>
                  <p className="text-sm text-gray-600">{sections[2].description}</p>
                </div>
              </div>
              {collapsedSections.reward ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {!collapsedSections.reward && (
              <div className="border-t border-gray-200 p-6">
                <StepReward
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleLaunch}
                  onBack={() => scrollToSection('logic')}
                  isFirstStep={false}
                  isLastStep={true}
                />
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-6">
            <button
              onClick={() => navigate('/campaigns')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Скасувати
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Зберегти чернетку
              </button>
              <button
                onClick={handleLaunch}
                className="flex items-center gap-2 px-8 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Rocket className="w-4 h-4" />
                {formData.launchOption === 'scheduled' ? 'Запланувати кампанію' : 'Запустити кампанію'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}