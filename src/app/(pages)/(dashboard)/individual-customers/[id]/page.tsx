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
import { OrganizationFormValues } from '../../corporate-customers/constants/interface.constansts';
import { subformsIndividualCustomer } from '../constants/form-fields';
import { getIndividualInitialvalues } from '../helpers/map-form-values';
import { IndividualFormValues } from '../constants/interface.constants';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = React.use(params);
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
  console.log(initialValues);

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
        title: 'Wallets',
        name: 'wallets',
        fields: getWalletFormFields(
          tokenOptions as FormOption[],
          evmChainOptions as FormOption[]
        ),
      },
    ],
    [tokenOptions, evmChainOptions]
  );
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
            <div className="p-4 w-full flex items-center justify-center">
              <ProfileImageFormField
                previewUrl={initialValues.profilePicture}
                edit={editing}
              />
            </div>
            <FormSection
              sections={subformsIndividualCustomer}
              edit={editing}
            ></FormSection>
            <ArrayForm<OrganizationFormValues>
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
