'use client';
import TableWrapper from '@/components/custom/table-wrapper';
import Typography from '@/components/custom/typography';
import {
  EmptyTableMessage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchIndividualCustomerThunk } from '@/store/slices/individualCustomers.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import React, { useEffect } from 'react';
import ActionButtons from '@/components/custom/action-buttons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/route';
import { UserAvatar } from '@/components/custom/user-avatar';
import { getUserInitials } from '@/utils';

const TableHeaderItems = [
  'Profile Picture',
  'First Name',
  'Last Name',
  'Email',
  'Contact',
  'Actions',
];

const Page = () => {
  const { customers: individiualCustomers } = useAppSelector(
    (state) => state.individualCustomer
  );
  const router = useRouter();
  // TODO: pagination

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIndividualCustomerThunk());
  }, []);
  return (
    <div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              {TableHeaderItems.map((item) => (
                <TableHead key={item}>
                  <Typography
                    variant="base"
                    weight="bold"
                    color="text-neutral-600"
                  >
                    {item}
                  </Typography>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {individiualCustomers.length > 0 ? (
              individiualCustomers.map((customer) => (
                <TableRow key={customer.id} className="whitespace-nowrap">
                  <TableCell className="w-40">
                    <UserAvatar
                      name={getUserInitials(
                        customer.firstName,
                        customer.lastName
                      )}
                      src={customer.profilePicture}
                    />
                  </TableCell>
                  {[
                    customer.firstName,
                    customer.lastName,
                    customer.email,
                    customer.phoneNumber,
                  ].map((item, index) => (
                    <TableCell key={index}>
                      <Typography variant="base">{item}</Typography>
                    </TableCell>
                  ))}

                  <TableCell>
                    <ActionButtons
                      viewButton
                      deleteButton
                      onView={() =>
                        router.push(`${ROUTES.INDIVIDUAL.path}/${customer.id}`)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyTableMessage message="No customers found" />
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
};

export default Page;
