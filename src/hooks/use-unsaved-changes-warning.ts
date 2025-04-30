'use client';

import { useEffect } from 'react';

export const useUnsavedChangesWarning = (
  dirty: boolean,
  isSubmitting: boolean
) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty && !isSubmitting) {
        e.preventDefault();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' &&
        target.getAttribute('href') &&
        dirty &&
        !isSubmitting
      ) {
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick, true);
    };
  }, [dirty, isSubmitting]);
};
