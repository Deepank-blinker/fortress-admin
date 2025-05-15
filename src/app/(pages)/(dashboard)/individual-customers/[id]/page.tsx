'use client';
import FormSection from '@/app/(pages)/(dashboard)/components/form-section';
import ActionButtons from '@/components/custom/action-buttons';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { useAppSelector } from '@/store/store';
import { FormFieldsSection, FormOption, USER_PROFILE } from '@/types';
import { getFullName, getUserInitials } from '@/utils';
import { Form, Formik } from 'formik';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ArrayForm from '../../components/array-form';
import ProfileImageFormField from '../../components/profile-image-form-field';
import UserOrganizationDetailSkeleton from '../../components/user-organization-detail-skeleton';
import {
  getTransactionFormFields,
  getWalletFormFields,
  idFormFields,
} from '../../constants/form-fields';
import { subFormsIndividualCustomer } from '../constants/form-fields';
import { IndividualFormValues } from '../constants/interface.constants';
import { getIndividualInitialValues } from '../helpers/map-form-values';
import { useGetUserById } from '../hooks/http.hooks';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [editing, setEditing] = useState<boolean>(false);
  const { tokens } = useAppSelector((state) => state.cryptoTokens);
  const { evmChains } = useAppSelector((state) => state.evmChains);

  const router = useRouter();
  const { data: customer, isPending } = useGetUserById(id as string);
  useEffect(() => {
    const isEditing = searchParams.get('edit') === 'true';
    setEditing(isEditing);
  }, []);

  const handleToggleEdit = (newEditState: boolean) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (newEditState) {
      newParams.set('edit', 'true');
    } else {
      newParams.delete('edit');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
    setEditing(newEditState);
  };

  const handleDelete = () => {
    // TODO: delete
    handleToggleEdit(false);
    toast.success('Deleted successfully');
  };

  const handleSubmit = (_values: IndividualFormValues) => {
    handleToggleEdit(false);
  };
  const initialValues = useMemo(() => {
    if (isPending) return {} as IndividualFormValues;
    return getIndividualInitialValues(customer as USER_PROFILE);
  }, [customer, isPending]);
  // const initialValues = {};

  const tokenOptions = useMemo(() => {
    return tokens.map((token) => ({
      label: token.symbol,
      value: token.id,
    }));
  }, [tokens]);

  const evmChainOptions = useMemo(() => {
    return evmChains.map((chain) => ({
      label: chain.name,
      value: chain.id,
    }));
  }, [evmChains]);

  const arraySubFormsIndividualCustomer: FormFieldsSection[] = useMemo(
    () => [
      {
        title: 'IDs',
        name: 'ids',
        fields: idFormFields,
      },
      {
        title: 'Whitelisted Wallets',
        name: 'whitelistedWallets',
        fields: getWalletFormFields(
          tokenOptions as FormOption[],
          evmChainOptions as FormOption[]
        ),
      },
      {
        title: 'Vault Wallets',
        name: 'vaultWallets',
        fields: getWalletFormFields(
          tokenOptions as FormOption[],
          evmChainOptions as FormOption[]
        ),
      },
      {
        title: 'Transactions',
        name: 'transactions',
        fields: getTransactionFormFields(
          tokenOptions as FormOption[],
          evmChainOptions as FormOption[]
        ),
      },
    ],
    [tokenOptions, evmChainOptions]
  );
  if (isPending) return <UserOrganizationDetailSkeleton profilePicture />;
  return (
    <div className=" container mx-auto ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="[&>*]:p-4 [&>*]:rounded-lg [&>*]:bg-neutral-0 space-y-4">
            <div className=" flex items-center justify-between ">
              {/* name and profile picture */}
              <div className="flex items-center gap-2">
                <UserAvatar
                  name={getUserInitials(values?.firstName, values?.lastName)}
                />
                <Typography variant="base" weight="bold">
                  {getFullName(values?.firstName, values?.lastName)}
                </Typography>
              </div>
              <ActionButtons
                // deleteButton
                onDelete={handleDelete}
                // editButton={!editing}
                onEdit={() => handleToggleEdit(true)}
                // saveButton={editing}
              />
            </div>

            <FormSection
              sections={subFormsIndividualCustomer}
              edit={editing}
              childrenPosition="start"
              childrenSection={0}
            >
              <div className="p-4 w-full flex items-center justify-center">
                <ProfileImageFormField
                  previewUrl={values.profilePicture}
                  edit={editing}
                />
              </div>
            </FormSection>
            <ArrayForm<IndividualFormValues>
              sections={arraySubFormsIndividualCustomer}
              edit={editing}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
