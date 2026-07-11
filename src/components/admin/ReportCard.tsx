import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Input from '@/components/common/Input';
import { ModerationReport } from '@/types';
import { Flag, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { formatDate, formatRelativeDate } from '@/utils/formatters';

interface ReportCardProps {
  report: ModerationReport;
  onApprove?: (reportId: string) => Promise<void>;
  onReject?: (reportId: string, reason: string) => Promise<void>;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onApprove, onReject }) => {
  const [isResponding, setIsResponding] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const statusConfig = {
    pending: { color: 'warning', icon: AlertCircle, label: 'Pending' },
    approved: { color: 'success', icon: CheckCircle, label: 'Approved' },
    rejected: { color: 'danger', icon: XCircle, label: 'Rejected' },
  };

  const config = statusConfig[report.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  const handleApprove = async () => {
    if (onApprove) {
      try {
        await onApprove(report.id);
      } catch (err) {
        // Error handling
      }
    }
  };

  const handleReject = async () => {
    if (onReject && rejectionReason) {
      try {
        await onReject(report.id, rejectionReason);
        setIsResponding(false);
        setRejectionReason('');
      } catch (err) {
        // Error handling
      }
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Flag className="w-5 h-5 text-smw-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-smw-white mb-1">{report.reportType}</h4>
              <p className="text-sm text-smw-sage">{report.description}</p>
            </div>
          </div>
          <Badge variant={config.color as any} className="flex items-center gap-1 text-xs whitespace-nowrap">
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </Badge>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-smw-gray text-sm">
          <div>
            <p className="text-smw-sage mb-1">Reported By</p>
            <p className="text-smw-white">{report.reportedBy}</p>
          </div>
          <div>
            <p className="text-smw-sage mb-1">Target</p>
            <p className="text-smw-white">{report.targetId}</p>
          </div>
          <div>
            <p className="text-smw-sage mb-1">Created</p>
            <p className="text-smw-white">{formatRelativeDate(report.createdAt)}</p>
          </div>
          {report.resolvedAt && (
            <div>
              <p className="text-smw-sage mb-1">Resolved</p>
              <p className="text-smw-white">{formatDate(report.resolvedAt, 'MMM d, yyyy')}</p>
            </div>
          )}
        </div>

        {/* Resolution Notes */}
        {report.resolutionNotes && (
          <div>
            <p className="text-sm text-smw-sage mb-1">Resolution Notes</p>
            <p className="text-sm text-smw-white bg-smw-gray/30 rounded p-2">{report.resolutionNotes}</p>
          </div>
        )}

        {/* Actions */}
        {report.status === 'pending' && (
          <div className="space-y-3">
            {isResponding && (
              <Input
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            )}
            <div className="flex gap-2">
              <Button onClick={handleApprove} variant="success" className="flex-1">
                Approve
              </Button>
              <Button
                onClick={() => (isResponding ? handleReject() : setIsResponding(true))}
                variant="danger"
                className="flex-1"
              >
                {isResponding ? 'Confirm Reject' : 'Reject'}
              </Button>
            </div>
            {isResponding && (
              <Button onClick={() => setIsResponding(false)} variant="outline" className="w-full">
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReportCard;
