import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { FormOption } from '@/types';
import { useFormikContext } from 'formik';
import React from 'react';

interface MultiSelectProps {
  options: FormOption[];
  name: string;
  label: string;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  name,
  label,
  required,
}) => {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: string[];
  }>();
  const handleSelectOptions = (option: string) => {
    const fieldvalue = values[name] ?? [];
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
            className={`${values[name]?.includes(option.value) ? 'bg-neutral-600' : ''} h-10`}
          >
            <Typography variant="small">{option.label}</Typography>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
