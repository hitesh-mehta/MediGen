import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const OnboardingContainer = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleComplete = () => navigate('/login'); // Navigate to login

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onComplete={handleComplete} />}
    </div>
  );
};

export default OnboardingContainer;
