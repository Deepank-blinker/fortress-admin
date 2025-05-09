'use client';

import { useState } from 'react';
import type { CustomerTicket } from '@/constants/interface.constant';
import { useEditCustomerTicketById } from '@/hooks/tickets';

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open', color: 'bg-green-100 text-green-800' },
  {
    value: 'in-progress',
    label: 'In Progress',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'review',
    label: 'Under Review',
    color: 'bg-purple-100 text-purple-800',
  },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-800' },
  {
    value: 'completed',
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800',
  },
];

export default function UpdateTicketModal({
  isOpen,
  ticket,
  onClose,
}: {
  isOpen: boolean;
  ticket: CustomerTicket;
  onClose: () => void;
}) {
  const [name, setName] = useState(ticket.name);
  const [desc, setDesc] = useState(ticket.description || '');
  const [status, setStatus] = useState(ticket.status || 'open');
  const [nameError, setNameError] = useState('');

  const { mutate: editTicket, isPending } = useEditCustomerTicketById(
    ticket?.ticketId ?? ''
  );

  if (!isOpen || !ticket) return null;

  const handleUpdate = () => {
    if (!name.trim()) {
      setNameError('Ticket name is required.');
      return;
    }

    editTicket(
      {
        ...ticket,
        name,
        description: desc,
        status,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          console.error('Error updating ticket');
        },
      }
    );
  };

  // Find the status object for the current status
  const currentStatus =
    STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Ticket</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Ticket ID */}
          <div className="text-sm text-gray-500">
            Ticket ID: <span className="font-medium">{ticket.ticketId}</span>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="ticket-name"
              className="block text-sm font-medium text-gray-700"
            >
              Ticket Name <span className="text-red-500">*</span>
            </label>
            <input
              id="ticket-name"
              className={`w-full px-4 py-2 border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError('');
              }}
              placeholder="Enter ticket name"
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <label
              htmlFor="ticket-status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="ticket-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-10"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.color}`}
              >
                {currentStatus.label}
              </span>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label
              htmlFor="ticket-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="ticket-description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[120px]"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter ticket description"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Ticket'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
