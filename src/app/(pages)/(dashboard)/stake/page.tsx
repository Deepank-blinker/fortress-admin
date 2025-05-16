'use client';

import ConfirmationModal from '@/components/custom/confirmation-modal';
import Typography from '@/components/custom/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CARD_COLORS } from '@/constants/index.constant';
import { removeStakeAsset } from '@/store/slices/stakeAsset.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import type { StakeAsset } from '@/types';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import StakeForm from './components/stake-form';
import StakeTermsModal from './components/stake-term-modal';

const transformStakeData = (reward: StakeAsset) => {
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
      value: reward.minimumStake ?? 'N/A',
    },
  ];
};
const getAvatarGradient = (index: number) => {
  switch (index % 4) {
    case 0:
      return 'from-rose-500 to-red-600';
    case 1:
      return 'from-emerald-500 to-green-600';
    case 2:
      return 'from-violet-500 to-purple-600';
    default:
      return 'from-amber-500 to-yellow-600';
  }
};

function getCardColorByIndex(index: number): string {
  return CARD_COLORS[index % CARD_COLORS.length];
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
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b  min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-x-4 gap-y- mb-10">
        <div>
          <Typography
            variant="h1"
            weight="bold"
            className="text-3xl bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent"
          >
            Staking Assets
          </Typography>
          <Typography
            className="text-muted-foreground mt-1"
            as="p"
            variant="small"
          >
            Manage your staking assets and reward programs
          </Typography>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <StakeTermsModal />

          <Button
            onClick={openAddModal}
            size="default"
            className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-neutral-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> Add Stake Asset
          </Button>
        </div>
      </div>

      {stakeAssets.length === 0 ? (
        <Card className="border-dashed border-2 border-neutral-200 bg-neutral-50/50 shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
              <PlusIcon className="h-8 w-8 text-emerald-500" />
            </div>
            <Typography
              as="h3"
              variant="base"
              weight="medium"
              className="mb-2 text-xl"
            >
              No staking assets yet
            </Typography>
            <Typography
              variant="small"
              className="text-muted-foreground text-center max-w-md mb-6"
            >
              Define your first staking asset to start earning rewards and
              managing your portfolio.
            </Typography>
            <Button
              onClick={openAddModal}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-neutral-0"
            >
              <PlusIcon className="h-5 w-5 mr-2" /> Define First Stake
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeAssets.map((reward, index) => (
            <Card
              key={reward.id}
              className={`relative group overflow-hidden rounded-xl border border-neutral-100 hover:border-neutral-200 transition-all duration-300 shadow-sm hover:shadow-md ${getCardColorByIndex(index)}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 from-transparent to-neutral-400 pointer-events-none" />

              <CardHeader
                className={`flex flex-row items-center justify-between gap-4 mb-2 p-5 border-b border-neutral-100`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-neutral-0 shadow-sm">
                    <AvatarImage src={''} />
                    <AvatarFallback
                      className={`bg-gradient-to-br ${getAvatarGradient(index)} text-neutral-0 font-medium`}
                    >
                      {reward.assetType.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography
                      variant="base"
                      weight="medium"
                      className="text-neutral-900"
                    >
                      {reward.assetName}
                    </Typography>
                    <Typography variant="small" className="text-neutral-500">
                      {reward.assetType}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-1 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(reward.id)}
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-emerald-50 border border-neutral-100"
                  >
                    <PencilIcon className="h-4 w-4 text-emerald-600" />
                  </Button>
                  <ConfirmationModal
                    message="Are you sure you want to delete this stake program?"
                    onConfirm={() => handleDelete(reward.id)}
                    confirmButtonText="Delete"
                    cancelButtonText="Cancel"
                    trigger={
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-rose-50 border border-neutral-100"
                      >
                        <TrashIcon className="h-4 w-4 text-rose-600" />
                      </Button>
                    }
                  />
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {transformStakeData(reward).map(({ label, value }) => (
                    <div key={label} className="flex flex-col">
                      <Typography
                        variant="small"
                        className="text-neutral-500 text-xs"
                      >
                        {label}
                      </Typography>
                      <Typography
                        variant="small"
                        weight="medium"
                        className="text-neutral-900"
                      >
                        {value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <StakeForm
        editStakeId={editStakeAssetId}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Page;
