import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { ComboBox } from '@/components/custom/combo-box';
import Typography from '@/components/custom/typography';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Importing RadioGroup components
import { Input } from '@/components/ui/input';
import { DateExtraProps, DateInput } from '@/components/custom/date-input'; // Import DateInput
import FileUpload, { FileUploadProps } from './file-upload';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { ConnectedFocusError } from 'focus-formik-error';
import { Checkbox } from '../ui/checkbox';

export type AsType =
  | React.ElementType
  | 'comboBox'
  | 'radio'
  | 'date'
  | 'file'
  | 'password'
  | 'otp'
  | 'selectBox'
  | 'checkbox';
export type IconDirectionType = 'left' | 'right' | undefined;

type FormFieldProps = {
  name: string;
  label?: string;
  type?: string; // Input type (default "text")
  options?: { value: string; label: string }[]; // For ComboBox or Radio options
  required?: boolean;
  fileProps?: FileUploadProps;
  as?: AsType;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  iconDirection?: IconDirectionType;
  hideError?: boolean;
  maxOTPLength?: number;
  onSelectValue?: (value: string, event?: React.SyntheticEvent) => void;
  dateProps?: DateExtraProps;
  onCreate?: (value: string) => void;
  isUpperCase?: boolean;
  isPending?: boolean;
  order?: 'asc' | 'desc';
  noOptionsMessage?: string;
  noOptionSearchPlaceholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  options,
  required = false,
  as = 'input',
  fileProps,
  icon,
  onIconClick,
  iconDirection,
  placeholder,
  hideError = false,
  maxOTPLength = 6,
  min,
  onChange,
  onSelectValue,
  dateProps,
  onCreate,
  isUpperCase = false,
  isPending = false,
  order,
  noOptionsMessage,
  noOptionSearchPlaceholder,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = (visibility: boolean) => {
    setPasswordVisible(visibility);
  };
  return (
    <div className="flex flex-col">
      {/* Label */}
      {as !== 'checkbox' && (
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
      )}

      {/* scroll to error */}
      <ConnectedFocusError />

      {/* Field */}
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          // Render input field
          if (as === 'input') {
            const handleChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              let value = event.target.value;

              // If isUpperCase is true, convert the value to uppercase
              if (isUpperCase) {
                value = value.toUpperCase();
              }

              // Call the onChange handler or Formik's onChange method
              if (onChange) {
                onChange(event);
              } else {
                form.setFieldValue(name, value); // Manually update Formik's value
              }
            };

            return (
              <Input
                {...field}
                {...props}
                id={name}
                type={type}
                icon={icon}
                onIconClick={onIconClick}
                iconDirection={iconDirection}
                placeholder={placeholder}
                className={`border rounded ${props.className}`}
                min={min}
                onChange={handleChange} // Attach modified handleChange function
                onWheel={(e) => e.currentTarget.blur()}
              />
            );
          }

          // Render ComboBox field
          if (as === 'comboBox' && options) {
            return (
              <ComboBox
                options={options}
                value={field.value}
                isUpperCase={isUpperCase}
                order={order}
                icon={icon}
                onCreate={onCreate}
                isPending={isPending}
                noOptionSearchPlaceholder={noOptionSearchPlaceholder}
                noOptionsMessage={noOptionsMessage}
                onSelect={(value) => {
                  if (onSelectValue) {
                    onSelectValue(value); // Use custom onChange if provided
                  } else {
                    form.setFieldValue(name, value); // Otherwise, update the form value
                  }
                }}
                className="p-2 border rounded capitalize"
              />
            );
          }
          // Render Select field
          if (as === 'selectBox' && options) {
            return (
              <Select
                {...field}
                {...(props as React.FC<SelectProps>)}
                defaultValue={field.value ? String(field.value) : undefined}
                value={field.value ? String(field.value) : undefined}
                onValueChange={(value) => {
                  if (onSelectValue) {
                    onSelectValue(value); // Use custom onChange if provided
                  } else {
                    form.setFieldValue(name, value); // Otherwise, update the form value
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }

          // Render radio buttons field
          if (as === 'radio' && options) {
            return (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => {
                  if (onSelectValue) {
                    onSelectValue(value); // Use custom onChange if provided
                  } else {
                    form.setFieldValue(name, value); // Otherwise, update the form value
                  }
                }}
                className="flex gap-4"
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="inline-flex items-center gap-2"
                  >
                    <RadioGroupItem
                      id={`${name}-${option.value}`}
                      value={option.value}
                    />
                    <Typography
                      variant="base"
                      as={'label'}
                      htmlFor={`${name}-${option.value}`}
                      color="text-neutral-100"
                    >
                      {option.label}
                    </Typography>
                  </div>
                ))}
              </RadioGroup>
            );
          }

          // Render Checkbox field
          if (as === 'checkbox') {
            return (
              <div className="flex items-center gap-4">
                <Checkbox
                  id={name}
                  name={name}
                  checked={field.value}
                  onCheckedChange={(checkState) => {
                    form.setFieldValue(name, checkState);
                  }}
                  className="w-4 h-4 border-neutral-50 rounded-md "
                />
                <Typography
                  variant="base"
                  weight="bold"
                  color="text-neutral-900"
                  as="label"
                  htmlFor={name}
                  required={required}
                >
                  {label}
                </Typography>
              </div>
            );
          }

          // Render DateInput field if 'date' is selected
          if (as === 'date') {
            return (
              <div className="flex flex-col gap-2">
                <DateInput
                  {...field}
                  placeholder="DD/MM/YYYY"
                  onChange={(date: Date | null | undefined) => {
                    form.setFieldValue(name, date ?? undefined);
                  }}
                  value={field.value}
                  dateProps={dateProps}
                />
              </div>
            );
          }

          if (as === 'file') {
            return (
              <>
                <FileUpload
                  files={field.value}
                  {...fileProps}
                  onFileDrop={(file: File[]) => form.setFieldValue(name, file)}
                  onFileRemove={() => form.setFieldValue(name, null)}
                  disabled={props.disabled}
                />
              </>
            );
          }

          // password
          if (as === 'password') {
            return (
              <Input
                {...field}
                {...props}
                id={name}
                type={passwordVisible ? 'text' : 'password'}
                placeholder={placeholder}
                className={`border rounded ${props.className}`}
                icon={
                  passwordVisible ? (
                    <EyeIcon
                      className=" cursor-pointer text-neutral-100 w-5 h-5"
                      onClick={() => togglePasswordVisibility(false)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="cursor-pointer text-neutral-100 w-5 h-5"
                      onClick={() => togglePasswordVisibility(true)}
                    />
                  )
                }
              />
            );
          }

          // OTP
          if (as === 'otp') {
            return (
              <InputOTP
                {...field}
                {...props}
                id={name}
                name={name}
                onChange={(value) => form.setFieldValue(name, value)}
                maxLength={maxOTPLength}
              >
                <InputOTPGroup className="flex items-center  justify-between gap-x-2 sm:w-full">
                  {Array(maxOTPLength)
                    .fill('')
                    .map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                </InputOTPGroup>
              </InputOTP>
            );
          }
          // phone number

          // Add other cases for different input types if needed
          return null;
        }}
      </Field>

      {/* Error Message */}
      {!hideError && (
        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-sm font-semibold"
        />
      )}
    </div>
  );
};

export default FormField;
