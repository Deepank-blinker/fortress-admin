import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

function ModalLayout({
  children,
  isOpen,
  close,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  className?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogHeader>
        <DialogTitle />
        <DialogDescription aria-describedby="" />
      </DialogHeader>
      <DialogContent
        className={`[&>button]:hidden md:w-[32.5rem]  p-10 rounded-2xl border border-neutral-40 overflow-auto max-h-[80vh] no-scrollbar ${className} overflow-x-hidden`}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default ModalLayout;
