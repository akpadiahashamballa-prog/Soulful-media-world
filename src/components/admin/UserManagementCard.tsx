import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { User } from '@/types';
import { Shield, Ban, RotateCcw } from 'lucide-react';
import { formatDate } from '@/utils/formatters';

interface UserManagementCardProps {
  user: User;
  onSuspend?: (userId: string, reason: string) => Promise<void>;
  onBan?: (userId: string, reason: string) => Promise<void>;
  onRestore?: (userId: string) => Promise<void>;
}

const UserManagementCard: React.FC<UserManagementCardProps> = ({
  user,
  onSuspend,
  onBan,
  onRestore,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [actionReason, setActionReason] = useState('');
  const [selectedAction, setSelectedAction] = useState<'suspend' | 'ban' | null>(null);

  const statusConfig: Record<string, { color: string; label: string }> = {
    active: { color: 'success', label: 'Active' },
    suspended: { color: 'warning', label: 'Suspended' },
    banned: { color: 'danger', label: 'Banned' },
  };

  const status = user.status || 'active';
  const config = statusConfig[status];

  const handleAction = async () => {
    if (selectedAction === 'suspend' && onSuspend) {
      await onSuspend(user.id, actionReason);
    } else if (selectedAction === 'ban' && onBan) {
      await onBan(user.id, actionReason);
    }
    setShowActions(false);
    setActionReason('');
    setSelectedAction(null);
  };

  const handleRestore = async () => {
    if (onRestore) {
      await onRestore(user.id);
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-serif text-smw-white mb-1">{user.email}</p>
            <p className="text-sm text-smw-sage">ID: {user.id}</p>
          </div>
          <Badge variant={config.color as any}>{config.label}</Badge>
        </div>

        {/* Details */}
        <div className="text-sm text-smw-sage space-y-1 py-2 border-y border-smw-gray">
          <p>Joined: {formatDate(user.createdAt, 'MMM d, yyyy')}</p>
          {status === 'suspended' && user.suspensionReason && (
            <p className="text-yellow-400">Suspension: {user.suspensionReason}</p>
          )}
          {status === 'banned' && user.banReason && <p className="text-red-400">Ban: {user.banReason}</p>}
        </div>

        {/* Actions */}
        {status === 'active' ? (
          <div className="space-y-2">
            <Button
              onClick={() => (showActions ? setShowActions(false) : setShowActions(true))}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-sm"
            >
              <Shield className="w-4 h-4" />
              Manage
            </Button>
            {showActions && (
              <div className="space-y-2">
                <textarea
                  placeholder="Reason for action..."
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="w-full px-3 py-2 bg-smw-gray text-smw-white rounded text-sm focus:outline-none focus:border border-smw-gold resize-none"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedAction('suspend');
                      handleAction();
                    }}
                    variant="warning"
                    className="flex-1 text-sm flex items-center justify-center gap-1"
                  >
                    <Ban className="w-3 h-3" /> Suspend
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedAction('ban');
                      handleAction();
                    }}
                    variant="danger"
                    className="flex-1 text-sm flex items-center justify-center gap-1"
                  >
                    <Ban className="w-3 h-3" /> Ban
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={handleRestore}
            variant="success"
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Restore User
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserManagementCard;
