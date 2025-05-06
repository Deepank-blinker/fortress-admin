import { TrelloCard } from '@/constants/interface.constant';
import { useEditCustomerTicketById } from '@/hooks/tickets';
import { useState } from 'react';

export default function UpdateTicketModal({
  isOpen,
  ticket,
  onClose,
}: {
  isOpen: boolean;
  ticket: TrelloCard;
  onClose: () => void;
}) {
  const [name, setName] = useState(ticket.name);
  const [desc, setDesc] = useState(ticket.desc);
  const [nameError, setNameError] = useState('');

  const { mutate: editTicket, isPending } = useEditCustomerTicketById(
    ticket?.id ?? ''
  );

  if (!isOpen || !ticket) return null;

  const handleUpdate = () => {
    if (!name.trim()) {
      setNameError('Ticket name is required.');
      return;
    }

    editTicket(
      { ...ticket, name, desc },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          console.error('Error updating ticket:');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
        <input
          className="w-full mb-2 border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ticket Name"
        />
        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        <textarea
          className="w-full mb-2 border px-3 py-2 rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={handleUpdate}
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
