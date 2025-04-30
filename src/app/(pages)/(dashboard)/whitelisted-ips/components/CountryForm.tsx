'use client';

import { ComboBox } from '@/components/custom/combo-box';
import ConfirmationModal from '@/components/custom/confirmation-modal';
import Typography from '@/components/custom/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { COUNTRY_OPTIONS } from '@/constants/form.constant';
import { WhitelistedCountries } from '@/services/whitelistedCountries.api';
import { Form, Formik, FormikHelpers } from 'formik';
import { Check, Globe, Trash } from 'lucide-react';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  useAddCountryToWhitelist,
  useRemoveCountryFromWhitelist,
  useWhitelistedCountries,
} from '../hooks/http.hooks';
import { MAIN_COUNTRY } from '@/constants/index.constant';

// Define the structure of a country option
interface CountryOption {
  label: string;
  value: string;
}

// Form values type
interface CountryFormValues {
  country: string;
}

export const CountryForm = () => {
  const { data: whitelistedCountries, isLoading } = useWhitelistedCountries();
  const { mutate: addWhitelistedCountry } = useAddCountryToWhitelist();
  const { mutate: removeWhitelistedCountry } = useRemoveCountryFromWhitelist();
  console.log(whitelistedCountries);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const validationSchema = Yup.object({
    country: Yup.string().required('Country is required'),
  });

  const initialValues: CountryFormValues = {
    country: '',
  };

  const addCountry = (country: string) => {
    const isAlreadyWhitelisted = whitelistedCountries?.data?.some(
      (item) => item.country === country
    );

    if (isAlreadyWhitelisted) {
      setErrorMessage('Country is already whitelisted');
      return;
    }

    addWhitelistedCountry(country);
    setErrorMessage('');
  };

  const removeCountry = ({
    id,
    country,
  }: Pick<WhitelistedCountries, 'id' | 'country'>) => {
    console.log(country);
    if (country === MAIN_COUNTRY.name) {
      setErrorMessage(
        `Cannot remove ${MAIN_COUNTRY.name} from whitelist countries`
      );
      return;
    }
    removeWhitelistedCountry(id);
  };

  const getCountryFlag = (countryName: string): string => {
    const country = COUNTRY_OPTIONS.find(
      (c: CountryOption) => c.value === countryName
    );
    return country?.label.split(' ')[0] || '';
  };

  return (
    <div className="w-full px-4 py-6 sm:px-8 lg:px-16">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-slate-600" />
            <CardTitle>Country Whitelist Management</CardTitle>
          </div>
          <CardDescription>
            Add or remove countries from your whitelist
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(
              values: CountryFormValues,
              { resetForm }: FormikHelpers<CountryFormValues>
            ) => {
              addCountry(values.country);
              resetForm();
            }}
          >
            {({ values, setFieldValue, touched, errors }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <Typography variant="base" weight="medium" className="mb-2">
                    Add a country to whitelist
                  </Typography>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <div className="flex-1">
                      <ComboBox
                        options={COUNTRY_OPTIONS.filter(
                          (opt: CountryOption) => {
                            const whitelistedCountryValues =
                              whitelistedCountries?.data?.map(
                                (item) => item.country
                              ) ?? [];
                            return !whitelistedCountryValues.includes(
                              opt.value
                            );
                          }
                        )}
                        value={values.country}
                        onSelect={(val: string) =>
                          setFieldValue('country', val)
                        }
                        placeholder="Select a country"
                        searchPlaceholder="Search countries..."
                        isPending={isLoading}
                        className="w-full"
                      />
                      {touched.country && errors.country && (
                        <Typography
                          variant="small"
                          className="mt-1 text-red-500"
                          weight="bold"
                        >
                          {errors.country}
                        </Typography>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || !values.country}
                      className="min-w-[120px]"
                    >
                      {isLoading ? (
                        <Typography
                          variant="small"
                          className="flex items-center gap-2"
                          weight="bold"
                        >
                          Loading...
                        </Typography>
                      ) : (
                        <Typography
                          variant="small"
                          className="flex items-center gap-2"
                          weight="bold"
                        >
                          <Check className="h-4 w-4" />
                          Add Country
                        </Typography>
                      )}
                    </Button>
                  </div>
                  {errorMessage && (
                    <Typography
                      variant="small"
                      className="mt-4 text-red-500"
                      weight="bold"
                    >
                      {errorMessage}
                    </Typography>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <Typography
                      variant="large"
                      weight="bold"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-5 w-5" />
                      Whitelisted Countries
                    </Typography>
                    <Badge variant="outline" className="bg-slate-100">
                      {whitelistedCountries?.data?.length}{' '}
                      {whitelistedCountries?.data?.length === 1
                        ? 'country'
                        : 'countries'}
                    </Badge>
                  </div>

                  {whitelistedCountries?.data?.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-md border border-dashed">
                      <Typography variant="base" className="text-slate-500">
                        No countries have been whitelisted yet
                      </Typography>
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {whitelistedCountries?.data?.map(
                        ({ id, country }: WhitelistedCountries) => (
                          <div
                            key={id}
                            className="flex items-center justify-between bg-slate-50 p-3 rounded-md border hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xl" aria-hidden="true">
                                {getCountryFlag(country)}
                              </span>
                              <Typography as="span" variant="base">
                                {country}
                              </Typography>
                            </div>
                            <ConfirmationModal
                              onConfirm={() =>
                                removeCountry({
                                  id,
                                  country,
                                })
                              }
                              message={`Are you sure you want to remove ${country} from the whitelist countries?`}
                              confirmButtonText="Remove"
                              cancelButtonText="Cancel"
                              trigger={
                                <Button
                                  variant={'destructive'}
                                  className="text-white"
                                  type="button"
                                >
                                  <Typography
                                    variant="small"
                                    weight="bold"
                                    className="flex gap-2 text-white"
                                  >
                                    Remove
                                    <Trash className="h-4 w-4" />
                                  </Typography>
                                </Button>
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};
