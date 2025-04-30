import FormField from '@/components/custom/form-field'; // Custom ComboBox component or FormField component
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CHAINS } from '@/constants/index.constant';
import { CryptoToken } from '@/types';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  symbol: Yup.string()
    .required('Token symbol is required')
    .matches(/^[A-Z]+$/, 'Token symbol must be in uppercase'),
  chain: Yup.string().required('Blockchain is required'),
});

interface TokenFormProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  formState: Pick<CryptoToken, 'symbol' | 'chain'>;
  editToken: CryptoToken | null;
  handleSubmit: (values: Pick<CryptoToken, 'symbol' | 'chain'>) => void;
}

const TokenForm: FC<TokenFormProps> = ({
  isModalOpen,
  setModalOpen,
  formState,
  editToken,
  handleSubmit,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <Typography as="span" variant="small" weight="bold">
              {editToken ? 'Edit Token' : 'Add New Token'}
            </Typography>
          </DialogTitle>
          <DialogDescription>
            <Typography as="span" variant="small" weight="bold">
              {editToken
                ? 'Update the details of your existing token.'
                : 'Enter the details of the cryptocurrency token you want to add.'}
            </Typography>
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={formState}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values }) => (
            <Form>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Typography
                    htmlFor="symbol"
                    className="text-sm font-medium"
                    as="label"
                    variant="small"
                    weight="bold"
                  >
                    Token Symbol
                  </Typography>
                  <FormField
                    as={'input'}
                    id="symbol"
                    name="symbol"
                    placeholder="e.g., BTC, ETH, SOL"
                    value={values.symbol}
                    isUpperCase
                    className="col-span-3"
                  />

                  <Typography
                    className="text-xs text-muted-foreground"
                    as="p"
                    variant="small"
                    weight="bold"
                  >
                    Enter the ticker symbol for your token
                  </Typography>
                </div>

                <div className="space-y-2">
                  <Typography
                    htmlFor="chain"
                    className="text-sm font-medium"
                    as="label"
                    variant="small"
                    weight="bold"
                    required
                  >
                    Blockchain
                  </Typography>

                  <FormField
                    name="chain"
                    as="comboBox"
                    options={Object.values(CHAINS)
                      .filter((chain) => chain !== CHAINS.BITCOIN) // Remove BITCOIN
                      .map((chain) => ({
                        label:
                          String(
                            chain === CHAINS.UTXO ? CHAINS.BITCOIN : chain
                          ) || '', // Ensure it's a string
                        value: String(chain) || '', // Ensure it's a string
                      }))}
                    isUpperCase
                    value={values.chain}
                    placeholder="Select a blockchain"
                    className="w-full"
                  />

                  <Typography
                    className="text-xs text-muted-foreground"
                    as="p"
                    variant="small"
                  >
                    Select the blockchain network for this token
                  </Typography>
                </div>
              </div>

              <DialogFooter className="flex space-x-2 sm:justify-end">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!values.symbol || !values.chain}
                  className={
                    !(values.symbol && values.chain) ? 'opacity-50' : ''
                  }
                >
                  {editToken ? 'Update Token' : 'Add Token'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TokenForm;
