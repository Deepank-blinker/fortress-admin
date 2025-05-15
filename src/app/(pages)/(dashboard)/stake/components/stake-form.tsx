'use client';
import { Form, Formik } from 'formik';
import { FC, useMemo } from 'react';
import * as Yup from 'yup';

import FormField, { AsType } from '@/components/custom/form-field';
import ModalLayout from '@/components/custom/modal-layout';
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
// import {
//   addStakeAsset,
//   updateStakeAssetById,
// } from '@/store/slices/stakeAsset.slice';
import { useAppSelector } from '@/store/store';
// import { StakeAsset } from '@/types';

interface StakeFormValues {
  assetName: string;
  assetType: string;
  rewardRate?: string;
  activationPeriod: string;
  unbondingPeriod: string;
  minimumStakeAmount: string;
  minimumStake?: number;
}

interface StakeFormProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editStakeId?: string;
}

const validationSchema = Yup.object().shape({
  assetName: Yup.string().required('Asset name is required'),
  assetType: Yup.string().required('Asset type is required'),
  rewardRate: Yup.number().required('Reward rate is required'),
  activationPeriod: Yup.string().required('Activation period is required'),
  unbondingPeriod: Yup.string().required('Unbonding period is required'),
  minimumStake: Yup.number().optional(),
});

const StakeFormFormFields = [
  {
    name: 'assetName',
    label: 'Asset Name',
    placeholder: 'Ethereum',
    required: true,
  },
  {
    name: 'assetType',
    label: 'Asset Type',
    placeholder: 'ETH',
    required: true,
    as: 'comboBox',
    options: [],
  },
  {
    name: 'rewardRate',
    label: 'Reward Rate (%)',
    type: 'number',
    placeholder: '5',
    required: true,
  },
  {
    name: 'activationPeriod',
    label: 'Activation Period (days)',
    type: 'string',
    placeholder: '7 days',
    required: true,
  },
  {
    name: 'unbondingPeriod',
    label: 'Unbonding Period (days)',
    type: 'string',
    placeholder: '14 days',
    required: true,
  },
  {
    name: 'minimumStakeAmount',
    label: 'Minimum Stake Amount',
    type: 'number',
    placeholder: '32 ETH',
    required: true,
  },
  {
    name: 'minimumStake',
    label: 'Minimum Stake',
    type: 'number',
    placeholder: '0.5',
    required: true,
  },
];

const StakeForm: FC<StakeFormProps> = ({
  isModalOpen,
  setModalOpen,
  editStakeId,
}) => {
  const { tokens } = useAppSelector((state) => state.cryptoTokens);
  const { stakeAssets } = useAppSelector((state) => state.stakeAssets);
  // const dispatch = useAppDispatch();
  const tokenOptions = tokens.map((token) => ({
    label: token.symbol,
    value: token.symbol,
  }));

  const initialValues: StakeFormValues = useMemo(() => {
    if (editStakeId) {
      const asset = stakeAssets?.find((asset) => asset.id === editStakeId);
      return {
        assetName: asset?.assetName || '',
        assetType: asset?.assetType || '',
        rewardRate: asset?.rewardRate?.toString() || '',
        activationPeriod: asset?.activationPeriod || '',
        unbondingPeriod: asset?.unBoundingPeriod || '',
        minimumStakeAmount: asset?.minimumStakingAmount || '',
        minimumStake: asset?.minimumStake as number,
      };
    }
    return {
      assetName: '',
      assetType: '',
      rewardRate: '',
      activationPeriod: '',
      unbondingPeriod: '',
      minimumStakeAmount: '',
      minimumStake: undefined,
    };
  }, [editStakeId]);

  const handleSubmit = (_values: StakeFormValues) => {
    // if (editStakeId) {
    //   dispatch(
    //     updateStakeAssetById({ id: editStakeId, ..._values } as StakeAsset)
    //   );
    // } else {
    //   dispatch(addStakeAsset(_values as StakeAsset));
    // }
    setModalOpen(false);
  };

  return (
    <ModalLayout isOpen={isModalOpen} close={() => setModalOpen(false)}>
      <Typography variant="h5" weight="bold" className="mb-4">
        {editStakeId ? 'Edit Stake Asset' : 'Add New Stake Asset'}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({}) => (
          <Form className="space-y-4">
            {StakeFormFormFields.map((field, index) => (
              <FormField
                key={index}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                as={field.as as AsType}
                type={field.type}
                options={field.name === 'assetType' ? tokenOptions : undefined}
              />
            ))}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editStakeId ? 'Update Stake' : 'Add Stake'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default StakeForm;
