import FormField from '@/components/custom/form-field';
import ModalLayout from '@/components/custom/modal-layout';
import TextEditor from '@/components/custom/text-editor';
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import {
  createFaq,
  CreateFAQPayload,
  updateFaq,
  UpdateFaqPayload,
} from '@/services/faqs.api';
import { getErrorMessage, unescapeHtml } from '@/utils';
import {
  ArrowLeftIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'sonner';
import * as Yup from 'yup';

interface CreateUpdateFaqModalProps {
  edit?: boolean;
  data?: UpdateFaqPayload;
  showButtonText?: boolean;
  triggerButtonClassName?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize?: string;
  iconClassName?: string;
  textClassName?: string;
}

const CreateUpdateFaqModal: React.FC<CreateUpdateFaqModalProps> = ({
  edit,
  showButtonText = false,
  triggerButtonClassName = '',
  icon: Icon = edit ? PencilIcon : PlusIcon,
  iconClassName = 'w-5 h-5 text-neutral-900',
  iconSize = '1rem',
  textClassName = '',
  data,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    ...(edit && { id: Yup.string().required('Id is required') }),
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const initialValues = edit
    ? ({
        id: data?.id || '',
        question: data?.question || '',
        answer: data?.answer || '',
      } as UpdateFaqPayload)
    : ({
        question: data?.question || '',
        answer: data?.answer || '',
      } as CreateFAQPayload);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: UpdateFaqPayload | CreateFAQPayload) => {
      if (edit) {
        return await updateFaq(payload as UpdateFaqPayload);
      }
      return await createFaq(payload);
    },
    onSuccess: () => {
      toast.success(
        edit ? 'Faq updated successfully' : 'Faq created successfully'
      );
      handleClose();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });

  const handleFormSubmit = (values: UpdateFaqPayload | CreateFAQPayload) => {
    mutate(values);
  };
  return (
    <>
      <Button
        variant="outline"
        onClick={handleOpen}
        className={`bg-neutral-20 border border-neutral-40 flex items-center gap-2 px-6 py-2.5 hover:opacity-80 ${triggerButtonClassName}`}
      >
        <Icon width={iconSize} height={iconSize} className={iconClassName} />
        {showButtonText && (
          <Typography variant="base" weight="bold" className={textClassName}>
            {edit ? 'Edit' : 'Add'}
          </Typography>
        )}
      </Button>
      <ModalLayout isOpen={open} close={handleClose}>
        <div className="space-y-4 relative">
          <Button
            variant="text"
            className="absolute top-4 right-0 sm:hidden "
            onClick={handleClose}
          >
            <XMarkIcon className="w-6 h-6 text-neutral-900" />
          </Button>
          <Typography variant="h3" weight="bold" color="text-neutral-900">
            {edit ? 'Update FAQ' : 'Create FAQ'}
          </Typography>
          <div className="h-5 w-full self-stretch" />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ setFieldValue, values }) => {
              return (
                <Form className="space-y-4 w-full">
                  <FormField
                    name="question"
                    label="Question"
                    placeholder="Enter your question"
                    required
                  />

                  <Typography variant="base" weight="bold" className="mb-2">
                    Answer
                  </Typography>
                  <div>
                    <TextEditor
                      content={unescapeHtml(values.answer)}
                      onChange={(html) => setFieldValue('answer', html)}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    className="w-full h-12 hover:bg-primary-400"
                    disabled={isPending}
                  >
                    {isPending ? 'Submitting...' : 'Submit'}
                  </Button>
                </Form>
              );
            }}
          </Formik>

          <Button variant="text" className="flex mx-auto" onClick={handleClose}>
            <ArrowLeftIcon className="w-5 h-5" />
            <Typography variant="base" weight="bold" color="text-neutral-900">
              Go Back
            </Typography>
          </Button>
        </div>
      </ModalLayout>
    </>
  );
};

export default CreateUpdateFaqModal;
