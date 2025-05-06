import { useGetCustomerTicketById } from '@/hooks/tickets';

export default function ViewTicketModal({
  ticketId,
  onClose,
}: {
  isOpen: boolean;
  ticketId: string;
  onClose: () => void;
}) {
  const { data: ticket, isLoading } = useGetCustomerTicketById(ticketId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      {!isLoading && ticket && (
        <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg">
          <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
          <p>
            <strong>ID:</strong> {ticket.data.id}
          </p>
          <p>
            <strong>Name:</strong> {ticket.data.name}
          </p>
          <p>
            <strong>Description:</strong> {ticket.data.desc}
          </p>
          <p>
            <strong>Due:</strong> {ticket.data.due || 'N/A'}
          </p>
          <p>
            <strong>Last Activity:</strong> {ticket.data.dateLastActivity}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
