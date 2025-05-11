import FormField from '@/components/custom/form-field';
import Typography from '@/components/custom/typography';
import { FormFieldsSection, FormOption } from '@/types';
import { FieldArray } from 'formik';
import MultiSelect from './multi-select';
import { cn } from '@/lib/utils';

interface ArrayFormProps<T> {
  sections: FormFieldsSection[];
  edit?: boolean;
  values?: T;
  count?: number;
}

const ArrayForm = <T,>({
  sections,
  edit = false,
  count,
}: ArrayFormProps<T>) => {
  return sections.map((section, sectionIndex) => (
    <div key={sectionIndex} className="flex flex-col gap-6">
      <Typography variant="large" weight="bold" className="mb-4">
        {section.title}
      </Typography>

      <FieldArray name={section.name || ''}>
        {({ form }) => {
          const fielArrayvalues = form.values[section.name || ''] as T[];
          const valueArray = Array.from({
            length: count || fielArrayvalues?.length || 0,
          });

          if (valueArray?.length === 0) {
            return (
              <Typography
                variant="small"
                className="text-sm italic text-muted-foreground p-4 border rounded-xl bg-neutral-40"
              >
                No entries yet for{' '}
                <strong>{section.title || 'this section'}</strong>.
              </Typography>
            );
          }

          return valueArray.map((_, groupIndex: number) => (
            <div
              key={groupIndex}
              className="border rounded-2xl p-6 space-y-6 bg-neutral-0"
            >
              <Typography variant="base" weight="semibold" className="mb-2">
                {section.title
                  ? `${section.title} ${groupIndex + 1}`
                  : `Group ${groupIndex + 1}`}
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields
                  ?.filter((field) => !section.hideFields?.includes(field.name))
                  .map((field, index) => {
                    return (
                      <div
                        key={field.name}
                        className={`flex flex-col  ${field.arrayFields ? 'md:col-span-2 ' : ''}`}
                      >
                        {field.arrayFields ? (
                          <ArrayForm
                            sections={[
                              {
                                title: field.label,
                                fields: field.arrayFields,
                                name: `${section.name}.${groupIndex}.${field.name}`,
                              },
                            ]}
                            edit={edit}
                            key={index}
                            count={
                              fielArrayvalues[groupIndex]?.[field.name]
                                ?.length || 0
                            }
                          />
                        ) : field.multiSelect ? (
                          <MultiSelect
                            options={field.options as FormOption[]}
                            name={`${section.name}.${groupIndex}.${field.name}`}
                            label={field.label}
                            required={field.required}
                            edit={edit}
                          />
                        ) : (
                          <FormField
                            {...field}
                            hideLabel={false}
                            name={`${section.name}.${groupIndex}.${field.name}`}
                            disabled={!edit}
                            className={cn({
                              '!bg-neutral-0 !disabled:opacity-100 !opacity-100 !cursor-default !disabled:cursor-default !items-start !justify-start !flex-row':
                                !edit,
                            })}
                          />
                        )}
                      </div>
                    );
                  })}
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
