import { CustomerTicket } from '@/constants/interface.constant';
import { useCreateCustomerTicket } from '@/hooks/tickets';
import { useState } from 'react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTicketModal({
  isOpen,
  onClose,
}: CreateTicketModalProps) {
  const { mutate: createTicket } = useCreateCustomerTicket();

  const [ticket, setTicket] = useState({ name: '', description: '' });

  if (!isOpen) return null;

  const handleCreateTicket = (newTicket: {
    name: string;
    description: string;
  }) => {
    const ticketPayload: CustomerTicket = {
      name: newTicket.name,
      description: newTicket.description,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createTicket(ticketPayload, {
      onSuccess: () => {
        onClose();
      },
      onError: (err) => {
        console.error('Failed to create ticket', err);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <input
          type="text"
          placeholder="Customer Name"
          value={ticket.name}
          onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={ticket.description}
          onChange={(e) =>
            setTicket({ ...ticket, description: e.target.value })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCreateTicket(ticket);
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
