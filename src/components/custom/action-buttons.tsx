import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';

interface ActionButtonsProps {
  viewButton?: boolean;
  viewButtonText?: string;
  viewButtonClassName?: string;
  onView?: () => void;

  editButton?: boolean;
  editButtonText?: string;
  editButtonClassName?: string;
  onEdit?: () => void;

  saveButton?: boolean;
  saveButtonText?: string;
  saveButtonClassName?: string;
  onSave?: () => void;
  saveButtonType?: 'submit' | 'button';

  deleteButton?: boolean;
  deleteButtonText?: string;
  deleteButtonClassName?: string;
  onDelete?: () => void;
  children?: ReactNode;
}
const ActionButtons: React.FC<ActionButtonsProps> = ({
  viewButton,
  viewButtonText = 'View',
  viewButtonClassName,
  onView,

  editButton,
  editButtonText = 'Edit',
  editButtonClassName,
  onEdit,

  saveButton,
  saveButtonText = 'Save',
  saveButtonClassName,
  onSave,
  saveButtonType = 'submit',

  deleteButton,
  deleteButtonText = 'Delete',
  deleteButtonClassName,
  onDelete,
  children = '',
}) => {
  if (!viewButton && !deleteButton) return null;
  return (
    <div className="flex gap-2 items-center">
      {viewButton && (
        <Button
          type="button"
          variant="secondary"
          className={`${viewButtonClassName}`}
          onClick={onView}
        >
          {viewButtonText}
        </Button>
      )}
      {editButton && (
        <Button
          type="button"
          variant="secondary"
          className={`${editButtonClassName}`}
          onClick={onEdit}
        >
          {editButtonText}
        </Button>
      )}
      {saveButton && (
        <Button
          type={saveButtonType}
          className={`${saveButtonClassName}`}
          onClick={onSave}
        >
          {saveButtonText}
        </Button>
      )}
      {deleteButton && (
        <Button
          type="button"
          variant="destructive"
          className={`${deleteButtonClassName}`}
          onClick={onDelete}
        >
          {deleteButtonText}
        </Button>
      )}
      {children}
    </div>
  );
};

export default ActionButtons;
