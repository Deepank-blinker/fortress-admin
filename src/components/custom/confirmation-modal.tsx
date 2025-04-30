import React, { useState, cloneElement, ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Typography from './typography';

interface ConfirmationModalProps<T = unknown> {
  onConfirm: (args?: T) => void;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonVariant?: 'outline' | 'destructive' | 'default';
  trigger?: ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonVariant = 'destructive',
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              <Typography variant="base" weight="bold">
                {message}
              </Typography>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={closeModal}>
                <Typography variant="small" weight="bold">
                  {cancelButtonText}
                </Typography>
              </Button>
              <Button variant={confirmButtonVariant} onClick={handleConfirm}>
                <Typography
                  variant="small"
                  weight="bold"
                  className="text-white"
                >
                  {confirmButtonText}
                </Typography>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {trigger ? (
        cloneElement(trigger, { onClick: openModal })
      ) : (
        <Button onClick={openModal}>Open Modal</Button>
      )}
    </>
  );
};

export default ConfirmationModal;
