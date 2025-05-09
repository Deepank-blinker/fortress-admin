'use client';

import { useGetCustomerTickets } from '@/hooks/tickets';
import { useState } from 'react';
import CreateTicketModal from './components/createTicket';
import { CustomerTicket } from '@/constants/interface.constant';
import ViewTicketModal from './components/viewTicket';
import UpdateTicketModal from './components/updateTicket';

export default function CustomerTickets() {
  const { data: tickets, isLoading } = useGetCustomerTickets();
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<CustomerTicket | null>(
    null
  );
  const [updateMode, setUpdateMode] = useState(false);

  const handleView = (ticket: CustomerTicket) => {
    setSelectedTicket(ticket);
    setUpdateMode(false);
  };

  const handleUpdate = (ticket: CustomerTicket) => {
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

      {!isLoading && tickets && tickets.data.length > 0 ? (
        <div className="mt-4">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="border-b-[1px]">
              <tr className="">
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">Customer Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Last Activity</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.data.map((ticket: CustomerTicket) => (
                <tr
                  key={ticket.id}
                  className="border-b-[1px] cursor-pointer hover:bg-gray-200"
                >
                  <td className="px-4 py-2">{ticket.ticketId}</td>
                  <td className="px-4 py-2">{ticket.name}</td>
                  <td className="px-4 py-2">
                    <p className="inline-flex uppercase px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      {ticket.status}
                    </p>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(ticket.updatedAt ?? '').toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
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
      {selectedTicket && selectedTicket.id && !updateMode && (
        <ViewTicketModal
          isOpen={!!selectedTicket && !updateMode}
          ticketId={selectedTicket.ticketId}
          onClose={() => setSelectedTicket(null)}
        />
      )}
      {selectedTicket && updateMode && (
        <UpdateTicketModal
          isOpen={!!selectedTicket && updateMode}
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
