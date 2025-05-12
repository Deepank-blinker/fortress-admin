'use client';
import FormSection from '@/app/(pages)/(dashboard)/components/form-section';
import Typography from '@/components/custom/typography';
import { UserAvatar } from '@/components/custom/user-avatar';
import { useAppSelector } from '@/store/store';
import { FormFieldsSection, FormOption } from '@/types';
import { getFullName, getUserInitials } from '@/utils';
import { Form, Formik } from 'formik';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import ArrayForm from '../../components/array-form';
import UserOrganizationDetailSkeleton from '../../components/user-organization-detail-skeleton';
import { getWalletFormFields } from '../../constants/form-fields';
import {
  organizationMembersFields,
  subFormFieldsOrganization,
} from '../constants/form-fields';
import { OrganizationFormValues } from '../constants/interface.constants';
import { getInitialValuesOrganization } from '../helper/map-form-values';
import { useGetOrganizationById } from '../hooks/http.hook';

const initialValuesOrganization: OrganizationFormValues = {
  createdByFirstName: '',
  createdByLastName: '',
  createdByEmail: '',
  createdByUserId: '',
  organizationName: '',
  organizationEmail: '',
  phoneNumber: '',
  registrationNumber: '',
  registrationDate: '',
  countryOfRegistration: '',
  countryOfRegulation: '',
  regulator: '',
  companyRegulateAs: '',
  companyRegulateAsDetails: '',
  otherRegulationDetails: '',
  natureOfActivity: '',
  taxRegistrationNumber: '',
  taxRegistrationCountry: '',
  valueOfAssetsUnderCustody: '',
  numberOfAssetsUnderCustody: 0,
  accountStatus: '',
  kycStatus: '',
  proofOfAddress: '',
  proofOfRegistration: '',
  organizationConstitution: '',
  listOfDirectors: '',
  shareholdersStructure: '',
  whitelistedWallets: [],
  vaultWallets: [],
  authorizedPersons: [],
  beneficiaries: [],
  members: [],
  line1: '', // Add the missing properties
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

const Page = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { tokens } = useAppSelector((state) => state.cryptoTokens);
  const { evmChains } = useAppSelector((state) => state.evmChains);

  const router = useRouter();
  const { data: organization, isPending } = useGetOrganizationById(
    id as string
  );

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

  // const handleDelete = () => {
  //   // TODO: delete
  //   handleToggleEdit(false);
  //   toast.success('Deleted successfully');
  // };

  const handleSubmit = (_values: OrganizationFormValues | null) => {
    if (!_values) return;
    toast.success('Saved successfully');
    handleToggleEdit(false);
  };

  const initialValues =
    useMemo(() => {
      if (!organization) return null;
      return getInitialValuesOrganization(organization);
    }, [organization]) || initialValuesOrganization;

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

  const arraySubFormsOrganization: FormFieldsSection[] = useMemo(
    () => [
      {
        title: 'Authorized Person',
        name: 'authorizedPersons',
        fields: organizationMembersFields,
        hideFields: ['percentageShareInCompany'],
      },
      {
        title: 'Beneficiaries',
        name: 'beneficiaries',
        fields: organizationMembersFields,
        hideFields: ['title'],
      },
      {
        title: 'Members',
        name: 'members',
        fields: organizationMembersFields,
        hideFields: ['title', 'percentageShareInCompany'],
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
  if (isPending) return <UserOrganizationDetailSkeleton />;
  return (
    <div className=" container mx-auto ">
      <Formik<OrganizationFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => {
          return (
            <Form className="[&>*]:p-4 [&>*]:rounded-lg [&>*]:bg-neutral-0 space-y-4">
              <div className=" flex items-center justify-between ">
                {/* name and profile picture */}
                <div className="flex items-center gap-2">
                  <UserAvatar
                    name={getUserInitials(values?.organizationName)}
                  />
                  <Typography variant="base" weight="bold">
                    {getFullName(values?.organizationName)}
                  </Typography>
                </div>
                {/* <ActionButtons
                  deleteButton
                  onDelete={handleDelete}
                  editButton={!editing}
                  onEdit={() => handleToggleEdit(true)}
                  saveButton={editing}
                /> */}
              </div>

              <FormSection
                sections={subFormFieldsOrganization}
                edit={editing}
              />
              <ArrayForm sections={arraySubFormsOrganization} edit={editing} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Page;
