import FormField from '@/components/custom/form-field';
import Typography from '@/components/custom/typography';
import { FormFieldsSection, FormOption } from '@/types';
import { FieldArray, useFormikContext } from 'formik';
import MultiSelect from './multi-select';
import { cn } from '@/lib/utils';
import { commonClassName } from './form-section';

interface ArrayFormProps<T> {
  sections: FormFieldsSection[];
  edit?: boolean;
  values?: T;
  count?: number;
}
type FieldGroup = Record<string, unknown[]>;

const ArrayForm = <T,>({
  sections,
  edit = false,
  count,
}: ArrayFormProps<T>) => {
  const { values } = useFormikContext<{ [key: string]: string[] }>();
  return sections.map((section, sectionIndex) => (
    <div key={sectionIndex} className="flex flex-col gap-6">
      <Typography variant="large" weight="bold" className="mb-4">
        {section.title}
      </Typography>

      <FieldArray name={section.name || ''}>
        {({ form }) => {
          const fileArrayValues = form.values[section.name || ''] as T[];
          const valueArray = Array.from({
            length: count || fileArrayValues?.length || 0,
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
                        className={cn(
                          'flex flex-col',
                          field.arrayFields ? 'md:col-span-2' : ''
                        )}
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
                              (fileArrayValues[groupIndex] as FieldGroup)[
                                field.name
                              ]?.length || 0
                            }
                          />
                        ) : field.multiSelect ? (
                          <MultiSelect
                            options={field.options as FormOption[]}
                            name={`${section.name}.${groupIndex}.${field.name}`}
                            label={field.label}
                            required={field.required}
                            edit={edit || field.editable}
                          />
                        ) : field.as === 'file' &&
                          !values[field.name] ? null : (
                          <FormField
                            {...field}
                            hideLabel={false}
                            name={`${section.name}.${groupIndex}.${field.name}`}
                            disabled={!edit || !field.editable}
                            className={cn(
                              commonClassName.edit,
                              (field.as === 'file' ||
                                (field.editable && edit)) &&
                                '!bg-neutral-0 ',
                              field.as === 'file' && '!justify-start !flex-row'
                            )}
                            fileProps={{
                              hideRemoveButton: field.as === 'file',
                            }}
                            textClassName={cn(
                              !(field.editable && edit) && '!text-neutral-400'
                            )}
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
