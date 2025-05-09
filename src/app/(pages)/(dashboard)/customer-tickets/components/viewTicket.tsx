import { CustomerTicket } from '@/constants/interface.constant';
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
  const card = ticket?.data[0] as CustomerTicket;

  const handleFormat = (date: string) => {
    return new Date(date ?? '').toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold">Ticket Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
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
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {!isLoading && card ? (
          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Ticket Information
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">ID</p>
                    <p className="text-sm font-medium">TKT-{card.ticketId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      {card.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Trello Card</p>
                    <a
                      href={`https://trello.com/c/${card.trelloTicketId}`}
                      target="_blank"
                      className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
                    >
                      Link
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium">{card.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm">
                    {card.description
                      ? card.description
                      : 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">User</p>
                  <p className="text-sm font-medium">{card.user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Timeline</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Created Date</p>
                    <p className="text-sm font-medium">
                      {handleFormat(card.createdAt)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Last Activity</p>
                    <p className="text-sm">{handleFormat(card.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading Details...</p>
        )}
      </div>
    </div>
  );
}
