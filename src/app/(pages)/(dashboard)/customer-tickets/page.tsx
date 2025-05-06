'use client';

import { useGetCustomerTickets } from '@/hooks/tickets';
import { useState } from 'react';
import CreateTicketModal from './components/createTicket';
import { TrelloCard } from '@/constants/interface.constant';
import ViewTicketModal from './components/viewTicket';
import UpdateTicketModal from './components/updateTicket';

export default function CustomerTickets() {
  const { data: tickets, isLoading } = useGetCustomerTickets();
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TrelloCard | null>(null);
  const [updateMode, setUpdateMode] = useState(false);

  const handleView = (ticket: TrelloCard) => {
    setSelectedTicket(ticket);
    setUpdateMode(false);
  };

  const handleUpdate = (ticket: TrelloCard) => {
    setSelectedTicket(ticket);
    setUpdateMode(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Customer Tickets</h1>
      <p className="text-sm text-neutral-500">
        View and manage customer tickets here.
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-4 mb-4 px-4 py-2 bg-success-300 text-white rounded hover:bg-success-400"
      >
        + Create New Ticket
      </button>

      {!isLoading && tickets && tickets.data.cards.length > 0 ? (
        <div className="mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">Customer Name</th>
                <th className="px-4 py-2 text-left">Last Activity</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.data.cards.map((ticket: TrelloCard) => (
                <tr key={ticket.id}>
                  <td className="border px-4 py-2">{ticket.id}</td>
                  <td className="border px-4 py-2">{ticket.name}</td>
                  <td className="border px-4 py-2">
                    {new Date(ticket.dateLastActivity ?? '').toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(ticket)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdate(ticket)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tickets available.</p>
      )}

      <CreateTicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      {selectedTicket && selectedTicket.id && (
        <ViewTicketModal
          isOpen={!!selectedTicket && !updateMode}
          ticketId={selectedTicket.id}
          onClose={() => setSelectedTicket(null)}
        />
      )}
      {selectedTicket && (
        <UpdateTicketModal
          isOpen={!!selectedTicket && updateMode}
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
