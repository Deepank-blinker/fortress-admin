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
import { fetchOrganizationThunk } from '@/store/slices/organizations.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import ActionButtons from '@/components/custom/action-buttons';
import { ROUTES } from '@/constants/route';
import { useRouter } from 'next/navigation';

const TableHeaderItems = ['Name', 'Email', 'Contact', 'Actions'];

const Page = () => {
  const { organizations } = useAppSelector((state) => state.organizations);
  const dispatch = useAppDispatch();

  const router = useRouter();

  // TODO: pagination

  useEffect(() => {
    dispatch(fetchOrganizationThunk());
  }, []);
  return (
    <div className="conatiner mx-auto">
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
            {organizations?.length > 0 ? (
              organizations.map((organization) => (
                <TableRow key={organization.id} className="whitespace-nowrap">
                  <TableCell>
                    <Typography variant="base">{organization.name}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="base">{organization.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="base">
                      {organization.phoneNumber}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <ActionButtons
                      viewButton
                      deleteButton
                      onView={() =>
                        router.push(
                          `${ROUTES.CORPORATE.path}/${organization.id}`
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyTableMessage message="No organizations found" />
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );
};

export default Page;
