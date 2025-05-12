import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';

interface TableListLoaderProps {
  rowCount?: number;
  cellCount?: number;
}
const TableListLoader: React.FC<TableListLoaderProps> = ({
  rowCount = 5,
  cellCount = 6,
}) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: cellCount }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableListLoader;
