'use client';
import Typography from '@/components/custom/typography';
import { FormFieldsSection } from '@/types';
import FormField from '@/components/custom/form-field';
import { cn } from '@/lib/utils';
import { useFormikContext } from 'formik';

interface FormSectionProps {
  sections: FormFieldsSection[];
  edit?: boolean;
  children?: React.ReactNode;
  childrenPosition?: 'start' | 'end';
  childrenSection?: number;
}

export const commonClassName = {
  edit: '!opacity-100 !cursor-default !items-start !disabled:opacity-100 !disabled:default !text-neutral-400',
};
const FormSection: React.FC<FormSectionProps> = ({
  sections,
  edit,
  children,
  childrenPosition = 'start',
  childrenSection = 0,
}) => {
  const { values } = useFormikContext<{ [key: string]: string[] }>();
  if (!sections || sections.length === 0) return null;

  return sections.map((section, index) => (
    <div key={index} className="flex flex-col gap-2 space-y-4">
      <Typography variant="large" weight="bold">
        {section.title}
      </Typography>
      <div>
        {children &&
          childrenSection === index &&
          childrenPosition === 'start' &&
          children}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 justify-start">
          {section.fields.map((fields, index) => {
            if (fields.as === 'file' && !values[fields.name]) return null;

            return (
              <FormField
                key={index}
                {...fields}
                disabled={!edit || !fields.editable}
                className={cn(
                  commonClassName.edit,
                  (fields.as === 'file' || (fields.editable && edit)) &&
                    '!bg-neutral-0 ',
                  fields.as === 'file' ? 'md:col-start-1' : ''
                )}
                fileProps={{
                  hideRemoveButton: fields.as === 'file',
                }}
                textClassName={cn(
                  !(fields.editable && edit) && '!text-neutral-400'
                )}
              />
            );
          })}
        </div>
        {children &&
          childrenSection === index &&
          childrenPosition === 'end' &&
          children}
      </div>
    </div>
  ));
};
FormSection.displayName = 'FormSection';
export default FormSection;
