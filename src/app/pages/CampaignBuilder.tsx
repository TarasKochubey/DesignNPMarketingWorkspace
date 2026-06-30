import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Check, ChevronRight } from 'lucide-react';
import { StepBasics } from '../components/campaign-builder/StepBasics';
import { StepLogic } from '../components/campaign-builder/StepLogic';
import { StepReward } from '../components/campaign-builder/StepReward';
import { StepBenefit } from '../components/campaign-builder/StepBenefit';
import { StepBenefitLimits } from '../components/campaign-builder/StepBenefitLimits';
import { StepBenefitSegmentation } from '../components/campaign-builder/StepBenefitSegmentation';
import { StepBenefitPreview } from '../components/campaign-builder/StepBenefitPreview';

const defaultSteps = [
  { id: 1, name: 'Основне', key: 'basics' },
  { id: 2, name: 'Логіка', key: 'logic' },
  { id: 3, name: 'Винагорода', key: 'reward' },
];

const benefitSteps = [
  { id: 1, name: 'Основне', key: 'basics' },
  { id: 2, name: 'Вигода', key: 'benefit' },
  { id: 3, name: 'Обмеження', key: 'limits' },
  { id: 4, name: 'Сегментація', key: 'segmentation' },
  { id: 5, name: 'Перегляд', key: 'preview' },
];

export function CampaignBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Get campaign data from location state (when editing)
  const campaignData = location.state?.campaign;
  const isEditMode = !!id && !!campaignData;
  
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    type: '',
    goal: '',
    description: '',
    launchOption: 'now' as 'now' | 'scheduled',
    scheduledDate: '',
    priority: 1, // Priority for 'benefit' campaign type
    // Step 2
    trigger: '',
    conditions: [],
    // Step 3
    rewardType: '',
    rewardRate: '',
    categoryRates: {}, // Category rates from CashbackCategorySetup
    universalRates: {}, // Universal cashback rates from UniversalCashbackSetup
    benefits: [], // Benefits for 'benefit' campaign type
    benefitLimits: {}, // Limits for 'benefit' campaign type
    benefitSegmentation: {}, // Segmentation for 'benefit' campaign type
  });

  // Get the appropriate steps array based on campaign type
  const steps = formData.type === 'benefit' ? benefitSteps : defaultSteps;
  const maxStep = steps.length;

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
        launchOption: 'now',
        scheduledDate: '',
        priority: 1,
        benefits: [],
        benefitLimits: {},
        benefitSegmentation: {},
      });
    }
  }, [isEditMode, campaignData]);

  useEffect(() => {
    const stepFromLocation = new URLSearchParams(location.search).get('step');
    if (stepFromLocation) {
      setCurrentStep(parseInt(stepFromLocation, 10));
    }
  }, [location]);

  // Reset to step 1 when campaign type changes to prevent out-of-bounds step
  useEffect(() => {
    if (currentStep > maxStep) {
      setCurrentStep(1);
    }
  }, [formData.type, currentStep, maxStep]);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    if (currentStep < maxStep && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    // In real app, would save data
    navigate('/campaigns');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== ''; // Має бути вибраний тип кампанії
      default:
        return true;
    }
  };

  const getReviewButtonText = () => {
    if (formData.launchOption === 'scheduled') {
      return 'Зберегти кампанію';
    }
    return 'Запустити кампанію';
  };

  const isReviewButtonEnabled = () => {
    if (formData.launchOption === 'now') {
      return true;
    }
    // For scheduled, need a month selected
    return formData.scheduledDate !== '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditMode ? 'Редагувати кампанію' : 'Створити нову кампанію'}
          </h1>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`relative px-1 py-4 text-sm font-medium transition-colors border-b-2 -mb-px ${
                      isActive
                        ? 'text-purple-600 border-purple-600'
                        : isCompleted
                        ? 'text-gray-700 border-transparent hover:text-gray-900'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted && <Check className="w-4 h-4 text-green-600" />}
                      {step.name}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-[500px]">
          {currentStep === 1 && <StepBasics formData={formData} updateFormData={updateFormData} />}

          {formData.type === 'benefit' ? (
            <>
              {currentStep === 2 && <StepBenefit formData={formData} updateFormData={updateFormData} />}
              {currentStep === 3 && <StepBenefitLimits formData={formData} updateFormData={updateFormData} />}
              {currentStep === 4 && <StepBenefitSegmentation formData={formData} updateFormData={updateFormData} />}
              {currentStep === 5 && <StepBenefitPreview formData={formData} updateFormData={updateFormData} />}
            </>
          ) : (
            <>
              {currentStep === 2 && <StepLogic formData={formData} updateFormData={updateFormData} />}
              {currentStep === 3 && <StepReward formData={formData} updateFormData={updateFormData} />}
            </>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Назад
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/campaigns')}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Зберегти як чернетку
            </button>
            {currentStep < maxStep ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium ${
                  isStepValid()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Далі
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                disabled={!isReviewButtonEnabled()}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  isReviewButtonEnabled() 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {getReviewButtonText()}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}