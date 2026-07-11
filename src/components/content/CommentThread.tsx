import React from 'react';
import { Comment } from '@/types';
import { formatRelativeDate } from '@/utils/formatters';
import { ThumbsUp, Reply } from 'lucide-react';
import Badge from '@/components/common/Badge';

interface CommentThreadProps {
  comment: Comment;
  onReply?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comment, onReply, onLike }) => {
  return (
    <div className="space-y-3">
      {/* Main Comment */}
      <div className="bg-smw-dark rounded-lg p-4 border border-smw-gray">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-medium text-smw-white">{comment.author.name}</p>
            <p className="text-xs text-smw-sage">{formatRelativeDate(comment.createdAt)}</p>
          </div>
          {comment.author.role && (
            <Badge variant="gold" className="text-xs">
              {comment.author.role}
            </Badge>
          )}
        </div>

        <p className="text-smw-white mb-3">{comment.content}</p>

        <div className="flex items-center gap-4 text-xs text-smw-sage">
          <button
            onClick={() => onLike?.(comment.id)}
            className="flex items-center gap-1 hover:text-smw-gold transition-colors"
          >
            <ThumbsUp className="w-3 h-3" />
            <span>{comment.likes}</span>
          </button>
          <button
            onClick={() => onReply?.(comment.id)}
            className="flex items-center gap-1 hover:text-smw-gold transition-colors"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-4 space-y-3 border-l-2 border-smw-gray pl-4">
          {comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} onReply={onReply} onLike={onLike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread;
