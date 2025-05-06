import { useGetCustomerTicketById } from '@/hooks/tickets';
import { X } from 'lucide-react';

export default function ViewTicketModal({
  ticketId,
  onClose,
}: {
  isOpen: boolean;
  ticketId: string;
  onClose: () => void;
}) {
  const { data: ticket, isLoading } = useGetCustomerTicketById(ticketId);
  const card = ticket?.data;

  const renderField = (label: string, value: any) => (
    <p>
      <strong>{label}:</strong>{' '}
      {value !== undefined && value !== null && value !== ''
        ? JSON.stringify(value)
        : 'None'}
    </p>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      {!isLoading && card && (
        <div className="relative bg-white p-6 rounded shadow-lg max-w-3xl overflow-y-auto max-h-[90vh]">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 text-center">Ticket Details</h2>

          {renderField('ID', card.id)}
          {renderField('Name', card.name)}
          {renderField('Description', card.desc)}
          {renderField('Due', card.due)}
          {renderField('Due Complete', card.dueComplete)}
          {renderField('Date Last Activity', card.dateLastActivity)}
          {renderField('Email', card.email)}
          {renderField('ID Board', card.idBoard)}
          {renderField('ID List', card.idList)}
          {renderField('ID Members', card.idMembers)}
          {renderField('ID Members Voted', card.idMembersVoted)}
          {renderField('ID Short', card.idShort)}
          {renderField('ID Attachment Cover', card.idAttachmentCover)}
          {renderField('Manual Cover Attachment', card.manualCoverAttachment)}
          {renderField('Position', card.pos)}
          {renderField('Short Link', card.shortLink)}
          {renderField('Short URL', card.shortUrl)}
        </div>
      )}
    </div>
  );
}
