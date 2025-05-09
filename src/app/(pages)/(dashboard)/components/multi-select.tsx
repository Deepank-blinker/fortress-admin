import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { FormOption } from '@/types';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface MultiSelectProps {
  options: FormOption[];
  name: string;
  label: string;
  required?: boolean;
  edit?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  name,
  label,
  required,
  edit,
}) => {
  const { setFieldValue } = useFormikContext<{
    [key: string]: string[];
  }>();
  const [field] = useField<string[]>(name);
  const handleSelectOptions = (option: string) => {
    if (!edit) return;
    const fieldvalue = field?.value ?? [];
    let newValue = [...fieldvalue];
    if (fieldvalue?.includes(option)) {
      newValue = fieldvalue?.filter((item: string) => item !== option);
    } else {
      newValue = [...fieldvalue, option];
    }
    setFieldValue(name, newValue);
  };
  return (
    <div className="space-y-1">
      <Typography
        variant="base"
        weight="bold"
        color="text-neutral-900"
        className="mb-2"
        as="label"
        htmlFor={name}
        required={required}
      >
        {label}
      </Typography>
      <div className="flex items-center gap-4">
        {options.map((option, index) => (
          <Button
            type="button"
            variant="secondary"
            key={index}
            onClick={() => handleSelectOptions(option.value)}
            className={`${field?.value?.includes(option.value) ? 'bg-neutral-800 hover:bg-neutral-800' : ''} h-10`}
          >
            <Typography
              variant="small"
              color={
                field?.value?.includes(option.value)
                  ? 'text-neutral-0'
                  : 'text-neutral-900'
              }
            >
              {option.label}
            </Typography>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
