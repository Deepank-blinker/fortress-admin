
import { useEffect, useState } from 'react';

interface useApiQueryWithFiltersProps {
  defaultCurrency?: string;
  defaultPage?: number;
  defaultLimit?: number;
  defaultSortBy?: string | null;
}

const useApiQueryWithFilters = ({
  defaultCurrency = 'USD',
  defaultPage = 1,
  defaultLimit = 10,
  defaultSortBy = null,
}: useApiQueryWithFiltersProps) => {
  const [sortBy, setSortBy] = useState<string | null>(defaultSortBy);
  const [currency, setCurrency] = useState<string>(defaultCurrency);
  const [searchString, setSearchString] = useState<string | null>(null);
  const [debouncedSearchString, setDebouncedSearchString] = useState<
    string | null
  >(null);
  const [page, setPage] = useState<number>(defaultPage);
  const [limit, setLimit] = useState<number>(defaultLimit);

  // Debounce search string
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchString(searchString ? searchString : null);
    }, 300); // Adjust debounce time if needed

    return () => clearTimeout(handler);
  }, [searchString]);

  const changeSortBy = (value: string) => {
    setSortBy(value ? value : null);
  };

  const changeCurrency = (value: string) => {
    setCurrency(value ? value : 'USD');
  };

  const changeSearchString = (value: string) => {
    setSearchString(value);
  };

  const changePage = (value: number) => {
    setPage(value);
  };
  const changeLimit = (value: number) => {
    setLimit(value);
  };


  return {
    sortBy,
    currency,
    changeSortBy,
    changeCurrency,
    searchString,
    changeSearchString,
    debouncedSearchString,
    page,
    changePage,
    limit,
    changeLimit,
  };
};

export default useApiQueryWithFilters;
