import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';

interface FormWrapperProps {
  children?: ReactNode; // Optional, so inner content can be passed as needed
  headingText?: string | ReactNode; // Optional heading text
  descriptionText?: string | ReactNode; // Optional description text
  continueButtonText?: string; // Optional text for the continue button
  handleContinue?: () => void;
  handlePrevious?: () => void;
  showContinueButton?: boolean;
  continueButtonType?: 'submit' | 'button';
  disableContinueButton?: boolean;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  headingText = 'Tell us more about yourself',
  descriptionText = 'To comply with the regulations and protect you from fraud, we need to confirm the information below.',
  continueButtonText = 'Continue',
  handleContinue = () => {},
  handlePrevious,
  showContinueButton = true,
  continueButtonType = 'button',
  disableContinueButton = false,
}) => {
  return (
    <div className="gap-4 space-y-6 h-full">
      <div className="space-y-4">
        <Typography variant="h3" color="text-neutral-900" weight="bold">
          {headingText}
        </Typography>
        <Typography variant="base" color="text-neutral-100" weight="bold">
          {descriptionText}
        </Typography>
      </div>

      {/* Content passed as children */}
      {children}

      {/* Buttons at the bottom with added margin */}
      <div className="flex flex-col gap-4 mb-4">
        {showContinueButton && (
          <Button
            onClick={handleContinue}
            type={continueButtonType}
            className="w-full h-12"
            disabled={disableContinueButton}
          >
            <Typography variant="base" weight="bold" color="text-neutral-900">
              {continueButtonText}
            </Typography>
          </Button>
        )}

        {handlePrevious && (
          <Button
            type="button"
            className="bg-transparent hover:bg-transparent"
            onClick={handlePrevious}
          >
            <Typography
              variant="base"
              weight="bold"
              color="text-neutral-900"
              className="flex gap-2"
            >
              <ArrowLeftIcon fontWeight={'bold'} />
              Go Back
            </Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormWrapper;
