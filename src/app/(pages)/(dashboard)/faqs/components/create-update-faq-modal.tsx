import FormField from '@/components/custom/form-field';
import ModalLayout from '@/components/custom/modal-layout';
import TextEditor from '@/components/custom/text-editor';
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { API_ROUTES } from '@/constants/api.routes';
import { Faqs } from '@/constants/interface.constant';
import {
  createFaq,
  CreateFAQPayload,
  deleteFaq,
  updateFaq,
  UpdateFaqPayload,
} from '@/services/faqs.api';
import { PaginationResponse, Response } from '@/types';
import { getErrorMessage, unescapeHtml } from '@/utils';
import { ArrowLeftIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

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
      return edit
        ? await updateFaq(payload as UpdateFaqPayload)
        : await createFaq(payload);
    },
    onSuccess: (response) => {
      const newFaq = response.data;
      toast.success(
        edit ? 'FAQ updated successfully' : 'FAQ created successfully'
      );

      queryClient.setQueryData(
        [API_ROUTES.faqs.fetchFaqs.queryKey],
        (oldData?: Response<PaginationResponse<Faqs[]>>) => {
          const oldFaqs = oldData?.data?.data || [];
          const updatedFaqs = edit
            ? oldFaqs?.map((faq) => (faq.id === newFaq?.id ? newFaq : faq))
            : [newFaq, ...oldFaqs];

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              data: updatedFaqs,
              // pagination: {
              //   ...oldData.data.pagination,
              //   total: edit
              //     ? oldData.data.pagination.total
              //     : oldData.data.pagination.total + 1,
              // },
            },
          };
        }
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

  const { mutate: deleteFaqMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteFaq(id);
    },
    onSuccess: (response, deletedId) => {
      toast.success('FAQ deleted successfully');

      queryClient.setQueryData(
        [API_ROUTES.faqs.fetchFaqs.queryKey],
        (oldData?: Response<PaginationResponse<Faqs[]>>) => {
          const updatedFaqs = oldData?.data?.data.filter(
            (faq) => faq.id !== deletedId
          );
          const updatedTotal = (oldData?.data?.pagination?.total || 1) - 1;
          const updatedTotalPages = Math.ceil(
            updatedTotal / (oldData?.data?.pagination?.limit || 1)
          );

          return {
            ...oldData,
            data: {
              ...oldData?.data,
              data: updatedFaqs,
              pagination: {
                ...oldData?.data?.pagination,
                total: updatedTotal,
                totalPages: updatedTotalPages,
              },
            },
          };
        }
      );
      handleClose();
    },
    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
  const handleDelete = () => {
    if (!data?.id) return toast.error('FAQ id is required');
    deleteFaqMutate(data?.id);
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
          <div className="flex justify-between items-center gap-2">
            <Typography variant="h3" weight="bold" color="text-neutral-900">
              {edit ? 'Update FAQ' : 'Create FAQ'}
            </Typography>
            {edit && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-fit"
              >
                {isDeleting ? 'Deleteng...' : 'Delete'}
              </Button>
            )}
          </div>
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
