'use client';

import ConfirmationModal from '@/components/custom/confirmation-modal';
import Typography from '@/components/custom/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CARD_COLORS, HEADER_COLORS } from '@/constants/index.constant';
import { removeStakeAsset } from '@/store/slices/stakeAsset.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { StakeAsset } from '@/types';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import StakeForm from './components/stake-form';

const transfromStakeData = (reward: StakeAsset) => {
  return [
    {
      label: 'Reward Rate',
      value: reward.rewardRate ? `${reward.rewardRate}%` : 'N/A',
    },
    {
      label: 'Activation',
      value: reward.activationPeriod || 'N/A',
    },
    {
      label: 'Unbonding',
      value: reward.unBoundingPeriod || 'N/A',
    },
    {
      label: 'Min Amount',
      value: reward.minimumStakingAmount || 'N/A',
    },
    {
      label: 'Min Stake',
      value: reward.minimumStake !== null ? reward.minimumStake : 'N/A',
    },
  ];
};
function getCardColorByIndex(index: number): string {
  return CARD_COLORS[index % CARD_COLORS.length];
}
function getCardHeaderColorByIndex(index: number): string {
  return HEADER_COLORS[index % HEADER_COLORS.length];
}

const Page = () => {
  const dispatch = useAppDispatch();
  const { stakeAssets } = useAppSelector((state) => state.stakeAssets);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editStakeAssetId, setEditStakeAssetId] = useState<string>('');

  //   useEffect(() => {
  //     dispatch(fetchStakeAssetsThunk());
  //   }, [dispatch]);

  const openAddModal = () => {
    setEditStakeAssetId('');
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditStakeAssetId(id);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeStakeAsset(id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <Typography variant="h1" weight="bold" className="text-3xl">
            Staking Assets
          </Typography>
          <Typography
            className="text-muted-foreground mt-1"
            as="p"
            variant="small"
          >
            Manage your staking assets
          </Typography>
        </div>
        <Button
          onClick={openAddModal}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-teal-600 text-neutral-0"
        >
          <PlusIcon className="mr-2 text-neutral-0" /> Add Stake
        </Button>
      </div>

      {stakeAssets.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Typography as="h3" variant="base" weight="medium" className="mb-2">
              No staking asset yet
            </Typography>
            <Typography
              variant="small"
              className="text-muted-foreground text-center max-w-md mb-6"
            >
              Define your first staking asset to get started.
            </Typography>
            <Button onClick={openAddModal}>
              <PlusIcon className="mr-2" /> Define Stake
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeAssets.map((reward, index) => (
            <Card
              key={reward.id}
              className={`relative group  ${getCardColorByIndex(index)} `}
            >
              <CardHeader
                className={`flex flex-row items-center justify-between gap-4 mb-4 ${getCardHeaderColorByIndex(index)}`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="bg-neutral-200">
                    <AvatarImage src={''} />
                    <AvatarFallback className="bg-primary-75">
                      {reward.assetType}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant="base" weight="medium">
                      {reward.assetName}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      {reward.assetType}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-1 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(reward.id)}
                  >
                    <PencilIcon className="text-neutral-300" />
                  </Button>
                  <ConfirmationModal
                    message="Are you sure you want to delete this stake program?"
                    onConfirm={() => handleDelete(reward.id)}
                    confirmButtonText="Delete"
                    cancelButtonText="Cancel"
                    trigger={
                      <Button size="icon" variant="ghost">
                        <TrashIcon className="text-neutral-300" />
                      </Button>
                    }
                  />
                </div>
              </CardHeader>
              <CardContent className="text-sm mt-2 space-y-2">
                {transfromStakeData(reward).map(({ label, value }) => (
                  <div key={label} className="mb-1">
                    <Typography
                      variant="small"
                      weight="medium"
                      className="text-foreground"
                    >
                      {label}:{' '}
                      <span className="text-muted-foreground font-normal">
                        {value}
                      </span>
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Uncomment when ready to show the modal form */}
      <StakeForm
        editStakeId={editStakeAssetId}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Page;
