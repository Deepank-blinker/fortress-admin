import { useUnsavedChangesWarning } from '@/hooks/use-unsaved-changes-warning';

const UnsavedChangesHandler = ({
  dirty,
  isSubmitting,
}: {
  dirty: boolean;
  isSubmitting: boolean;
}) => {
  useUnsavedChangesWarning(dirty, isSubmitting);
  return null;
};

export default UnsavedChangesHandler;
