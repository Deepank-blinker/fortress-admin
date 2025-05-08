import React, { ReactNode } from 'react';

interface TableWrapperProps {
  children: ReactNode;
  wrapperClassName?: string;
}
const TableWrapper: React.FC<TableWrapperProps> = ({
  children,
  wrapperClassName,
}) => {
  return (
    <div
      className={`bg-neutral-0 rounded-lg max-w-screen-2xl mx-auto ${wrapperClassName}`}
    >
      {children}
    </div>
  );
};

export default TableWrapper;
