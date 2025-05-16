'use client';

import { useState } from 'react';
import ModalLayout from '@/components/custom/modal-layout';
import TextEditor from '@/components/custom/text-editor';
import Typography from '@/components/custom/typography';
import { Button } from '@/components/ui/button';
import { DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

// Optional: create a helper if you use it frequently
const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const StakeTermsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState(
    '<p>Welcome to the staking terms and conditions.</p>'
  );
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    console.log('Saved Terms:', terms);
    setEditing(false);
    setIsOpen(false);
  };

  const handleClose = () => {
    setEditing(false);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Button
        onClick={handleOpen}
        size="default"
        className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-neutral-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
      >
        <DocumentTextIcon className="h-5 w-5 mr-2" /> Stake Terms
      </Button>

      <ModalLayout isOpen={isOpen} close={handleClose}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h5" weight="bold">
              Stake Terms and Conditions
            </Typography>

            {!editing && (
              <Button
                size="sm"
                // variant="primary"
                onClick={() => setEditing(true)}
                className="text-sm flex items-center gap-1"
              >
                <PencilSquareIcon className="h-4 w-4 text-emerald-600" />
                Edit
              </Button>
            )}
          </div>

          {editing ? (
            <>
              <TextEditor content={terms} onChange={setTerms} />
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          ) : (
            <div
              className="prose prose-sm !text-neutral-700 leading-[1.4rem] pt-3 ql-editor"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(terms),
              }}
            />
          )}
        </div>
      </ModalLayout>
    </>
  );
};

export default StakeTermsModal;
