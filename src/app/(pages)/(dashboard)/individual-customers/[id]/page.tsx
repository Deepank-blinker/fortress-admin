'use client';
import FormSection from '@/app/(pages)/(dashboard)/components/form-section';
import ActionButtons from '@/components/custom/action-buttons';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { fetchIndividualCustomerThunk } from '@/store/slices/individualCustomers.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FormFieldsSection, FormOption } from '@/types';
import { getFullName, getUserInitials } from '@/utils';
import { Form, Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ArrayForm from '../../components/array-form';
import ProfileImageFormField from '../../components/profile-image-form-field';
import { getWalletFormFields, idFormFields } from '../../constants/form-fields';
import { subformsIndividualCustomer } from '../constants/form-fields';
import { IndividualFormValues } from '../constants/interface.constants';
import { getIndividualInitialvalues } from '../helpers/map-form-values';
import UserOrganizationDetailSkeleton from '../../components/user-organization-detail-skeleton';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = params;
  console.log(id);
  const searchParams = useSearchParams();
  const { customers } = useAppSelector((state) => state.individualCustomer);
  const { tokens } = useAppSelector((state) => state.cryptoTokens);
  const { evmChains } = useAppSelector((state) => state.evmChains);
  const customer = customers[0]; //TODO: dynamic by id
  const router = useRouter();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const isEditing = searchParams.get('edit') === 'true';
    setEditing(isEditing);
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIndividualCustomerThunk());
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

  const handleSubmit = (values: IndividualFormValues) => {
    toast.success('Saved successfully');
    console.log(values);
    handleToggleEdit(false);
  };
  const initialValues = useMemo(
    () => getIndividualInitialvalues(customer),
    [customer]
  );

  const tokenOptions = useMemo(() => {
    return tokens.map((token) => ({
      label: token.name,
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
    ],
    [tokenOptions, evmChainOptions]
  );
  const isPending = false; // TODO: dynamic ispending
  if (isPending) return <UserOrganizationDetailSkeleton />;
  return (
    <div className=" container mx-auto ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({}) => (
          <Form className="[&>*]:p-4 [&>*]:rounded-lg [&>*]:bg-neutral-0 space-y-4">
            <div className=" flex items-center justify-between ">
              {/* name and profile picture */}
              <div className="flex items-center gap-2">
                <UserAvatar
                  name={getUserInitials(
                    customer?.firstName,
                    customer?.lastName
                  )}
                />
                <Typography variant="base" weight="bold">
                  {getFullName(customer?.firstName, customer?.lastName)}
                </Typography>
              </div>
              <ActionButtons
                deleteButton
                onDelete={handleDelete}
                editButton={!editing}
                onEdit={() => handleToggleEdit(true)}
                saveButton={editing}
              />
            </div>

            <FormSection
              sections={subformsIndividualCustomer}
              edit={editing}
              childrenPosition="start"
              childrenSection={0}
            >
              <div className="p-4 w-full flex items-center justify-center">
                <ProfileImageFormField
                  previewUrl={initialValues.profilePicture}
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
