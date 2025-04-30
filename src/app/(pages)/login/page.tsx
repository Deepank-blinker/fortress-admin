'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import VerificationCode from './components/verification-code';
import { toast } from 'sonner';

const Signin = React.lazy(() => import('./components/sign-in'));
const WelcomeBack = React.lazy(() => import('./components/welcome-back'));

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStep = parseInt(searchParams.get('step') || '0', 10);

  const steps = [
    {
      component: <WelcomeBack handleNext={() => handleNext()} />,

      id: 0,
      prerequisite: 0,
    },
    {
      component: (
        <Signin
          handleNext={() => handleNext()}
          handlePrevious={() => handlePrevious()}
        />
      ),

      id: 1,
      prerequisite: 0,
    },
    {
      component: <VerificationCode handlePrevious={() => handlePrevious()} />,

      id: 2,
      prerequisite: 1,
    },
  ];

  // Initialize the current step once when the component mounts
  useEffect(() => {
    if (queryStep !== currentStep) {
      const validStep = steps.find((step) => step.id === queryStep);
      if (validStep) {
        setCurrentStep(queryStep);
      } else {
        router.push('?step=0');
      }
    }
  }, [queryStep]);

  const handleNext = (query = '') => {
    if (currentStep !== null) {
      const nextStep = currentStep + 1;
      if (nextStep < steps.length) {
        const nextStepObj = steps[nextStep];
        if (
          nextStepObj &&
          nextStepObj.prerequisite !== null &&
          nextStepObj.prerequisite === currentStep
        ) {
          router.push(`?step=${nextStep}${query}`);
          setCurrentStep(nextStep);
        } else {
          toast.error('You cannot move to the next step yet.');
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep !== null && currentStep > 0) {
      router.push(`?step=${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {steps.map((step, index) => {
        if (index === currentStep) {
          return React.cloneElement(step.component, {
            handleNext,
            handlePrevious,
            key: step.id,
          });
        }
        return null;
      })}
    </>
  );
};

export default Page;
