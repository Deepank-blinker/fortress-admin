'use client';

import ConfirmationModal from '@/components/custom/confirmation-modal';
import Typography from '@/components/custom/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  addCryptoToken,
  fetchTokens,
  removeCryptoToken,
  updateCryptoTokenById,
} from '@/store/slices/cryptoToken.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { CryptoToken } from '@/types';
import { Coins, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import TokenForm from './components/TokenForm';
import { CHAIN_COLORS, CHAINS } from '@/constants/index.constant';
import { getChainColor } from '@/utils';

export default function TokenPage() {
  const dispatch = useAppDispatch();
  const { tokens } = useAppSelector((state) => state.cryptoTokens);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editToken, setEditToken] = useState<CryptoToken | null>(null);
  const [formState, setFormState] = useState<
    Pick<CryptoToken, 'symbol' | 'chain'>
  >({ symbol: '', chain: CHAINS.EVM });
  const [activeTab, setActiveTab] = useState('all');

  // Fetch tokens on component mount
  useEffect(() => {
    dispatch(fetchTokens());
  }, [dispatch]);
  const groupedTokens = useMemo(() => {
    return tokens.reduce<Record<string, CryptoToken[]>>((acc, token) => {
      const chain = token.chain || 'unknown'; // Use a fallback if chain is undefined
      if (!acc[chain]) {
        acc[chain] = [];
      }

      acc[chain].push(token);

      return acc;
    }, {});
  }, [tokens]);

  const handleSubmit = (values: Pick<CryptoToken, 'symbol' | 'chain'>) => {
    if (!values.symbol || !values.chain) return;

    if (editToken) {
      console.log(editToken, formState);
      const payload = {
        id: editToken?.id as string,
        ...values,
      };
      dispatch(updateCryptoTokenById(payload));
    } else {
      dispatch(addCryptoToken(values));
    }

    setModalOpen(false);
    setFormState({ symbol: '', chain: CHAINS.EVM });
    setEditToken(null);
  };

  const handleSetFormState = (newState: Partial<CryptoToken>) => {
    console.log(newState);
    setFormState({ ...formState, ...newState });
  };

  const handleEdit = (token: CryptoToken) => {
    setEditToken(token);
    handleSetFormState({
      symbol: token.symbol || '',
      chain: token.chain as CHAINS,
    });
    setModalOpen(true);
  };

  const handleDelete = (tokenId: string) => {
    dispatch(removeCryptoToken(tokenId));
  };

  const openAddModal = () => {
    setEditToken(null);
    setFormState({ symbol: '', chain: CHAINS.EVM });
    setModalOpen(true);
  };

  const allChains = Object.keys(groupedTokens);
  const filteredTokens =
    activeTab === 'all'
      ? groupedTokens
      : { [activeTab]: groupedTokens[activeTab] };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Typography
            className="text-3xl font-bold tracking-tight"
            variant="h1"
            weight="bold"
          >
            Crypto Tokens
          </Typography>
          <Typography
            className="text-muted-foreground mt-1"
            as="p"
            variant="small"
          >
            Manage your cryptocurrency tokens across different chains
          </Typography>
        </div>
        <Button
          onClick={openAddModal}
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md transition-all"
        >
          <Typography
            as="span"
            variant="small"
            weight="bold"
            className="text-white flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Token
          </Typography>
        </Button>
      </div>

      {tokens.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Coins className="h-12 w-12 text-muted-foreground mb-4" />
            <Typography
              className="text-xl font-medium mb-2"
              as="h3"
              variant="base"
            >
              No tokens added yet
            </Typography>
            <Typography
              className="text-muted-foreground text-center max-w-md mb-6"
              as="p"
              variant="small"
            >
              Start by adding your first cryptocurrency token to track and
              manage across different blockchains.
            </Typography>
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Token
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                <Typography as="span" variant="small" weight="bold">
                  All Chains
                </Typography>
              </TabsTrigger>
              {allChains.map((chain) => (
                <TabsTrigger
                  key={chain}
                  value={chain}
                  className={`flex items-center gap-2${getChainColor(chain)}`}
                >
                  {chain}
                  <Badge
                    variant="outline"
                    className={`ml-1 text-xs ${getChainColor(chain)}`}
                  >
                    {groupedTokens[chain]?.length || 0}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(filteredTokens).map(([chain, tokens]) => (
                  <Card
                    key={chain}
                    className={`overflow-hidden border-t-4 ${CHAIN_COLORS?.[chain as keyof typeof CHAIN_COLORS]?.split(' ')[0]} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle>
                            {chain === CHAINS.UTXO ? CHAINS.BITCOIN : chain}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            CHAIN_COLORS?.[chain as keyof typeof CHAIN_COLORS]
                          }
                        >
                          {tokens.length}{' '}
                          {tokens.length === 1 ? 'Token' : 'Tokens'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <ScrollArea className="h-[220px] pr-4">
                        <div className="space-y-3">
                          {tokens.map((token) => (
                            <div
                              key={token.id}
                              className="flex justify-between items-center p-3 bg-card border rounded-lg hover:bg-accent/5 transition-colors"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    CHAIN_COLORS[
                                      token.chain as unknown as keyof typeof CHAIN_COLORS
                                    ] ?? 'bg-gray-300'
                                  }`}
                                >
                                  {token.symbol.charAt(0)}
                                </div>
                                <div className="flex flex-col gap-1 overflow-hidden">
                                  <Typography
                                    className="font-medium truncate max-w-[160px]"
                                    as="span"
                                    variant="base"
                                  >
                                    {token.symbol}
                                  </Typography>
                                  <Typography
                                    className="text-xs text-muted-foreground truncate max-w-[160px]"
                                    as="span"
                                    variant="small"
                                  >
                                    {token.chain === CHAINS.UTXO
                                      ? CHAINS.BITCOIN
                                      : (token.chain ?? 'Unknown')}
                                  </Typography>
                                </div>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEdit(token)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Pencil size={15} />
                                </Button>
                                <ConfirmationModal
                                  message="Are you sure you want to delete the token?"
                                  onConfirm={() =>
                                    handleDelete(token.id as string)
                                  }
                                  confirmButtonText="Delete"
                                  cancelButtonText="Cancel"
                                  trigger={
                                    <Button
                                      className="h-8 w-8 p-0"
                                      size="sm"
                                      variant="ghost"
                                    >
                                      <Trash2 size={15} color="red" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Add/Edit Token Dialog */}
      <TokenForm
        editToken={editToken}
        handleSubmit={(values: Pick<CryptoToken, 'symbol' | 'chain'>) =>
          handleSubmit(values)
        }
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        formState={formState}
      />
    </div>
  );
}
