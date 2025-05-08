import FormField from '@/components/custom/form-field';
import Typography from '@/components/custom/typography';
import { FormFieldsSection, FormOption } from '@/types';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import MultiSelect from './multi-select';

interface ArrayFormProps<T> {
  sections: FormFieldsSection[];
  edit?: boolean;
  values?: T;
}

const ArrayForm = <T,>({ sections, edit = false }: ArrayFormProps<T>) => {
  const { values } = useFormikContext<T>();

  return sections.map((section, sectionIndex) => (
    <div key={sectionIndex} className="flex flex-col gap-6">
      <Typography variant="large" weight="bold" className="mb-4">
        {section.title}
      </Typography>

      <FieldArray name={section.name || ''}>
        {() => {
          const sectionArray =
            (values as Record<string, T[]>)?.[section.name || ''] || [];

          return sectionArray.map((_, groupIndex: number) => (
            <div
              key={groupIndex}
              className="border rounded-2xl p-6 space-y-6 bg-neutral-100/30 dark:bg-neutral-800/30"
            >
              <Typography variant="base" weight="semibold" className="mb-2">
                {section.title
                  ? `${section.title} ${groupIndex + 1}`
                  : `Group ${groupIndex + 1}`}
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields
                  ?.filter((field) => !section.hideFields?.includes(field.name))
                  .map((field) => (
                    <div key={field.name} className="flex flex-col">
                      {field.multiSelect ? (
                        <MultiSelect
                          options={field.options as FormOption[]}
                          name={`${section.name}.${groupIndex}.${field.name}`}
                          label={field.label}
                          required={field.required}
                        />
                      ) : (
                        <FormField
                          {...field}
                          hideLabel={false}
                          name={`${section.name}.${groupIndex}.${field.name}`}
                          disabled={!edit}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ));
        }}
      </FieldArray>
    </div>
  ));
};

ArrayForm.displayName = 'ArrayForm';
export default ArrayForm;
