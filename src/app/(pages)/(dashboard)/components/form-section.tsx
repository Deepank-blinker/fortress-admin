'use client';
import Typography from '@/components/custom/typography';
import { FormFieldsSection } from '@/types';
import FormField from '@/components/custom/form-field';

interface FormSectionProps {
  sections: FormFieldsSection[];
  edit?: boolean;
  children?: React.ReactNode;
  childrenPosition?: 'start' | 'end';
  childrenSection?: number;
}

const FormSection: React.FC<FormSectionProps> = ({
  sections,
  edit,
  children,
  childrenPosition = 'start',
  childrenSection = 0,
}) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {section.fields.map((fields, index) => (
            <>
              <FormField
                key={index}
                {...fields}
                disabled={!edit}
                className={`${!edit ? '!bg-neutral-0 !disabled:opacity-100  !opacity-100 !cursor-default !disabled:cursor-default' : ''}`}
              />
            </>
          ))}
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
