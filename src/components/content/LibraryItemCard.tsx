import React from 'react';
import { LibraryItem } from '@/types';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { ExternalLink } from 'lucide-react';

interface LibraryItemCardProps {
  item: LibraryItem;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({ item }) => {
  const typeColors: Record<string, string> = {
    book: 'bg-blue-900/30 text-blue-200',
    research: 'bg-purple-900/30 text-purple-200',
    guide: 'bg-green-900/30 text-green-200',
    resource: 'bg-amber-900/30 text-amber-200',
  };

  return (
    <Card hoverable>
      <div className="flex gap-4">
        {/* Icon/Image */}
        <div className="w-20 h-20 flex-shrink-0 bg-smw-gold/10 rounded flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded" />
          ) : (
            <span className="text-3xl">📚</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-lg text-smw-white flex-1">{item.title}</h3>
            <Badge
              variant="gold"
              className={`text-xs whitespace-nowrap ${typeColors[item.type] || 'bg-smw-gold/20 text-smw-gold'}`}
            >
              {item.type}
            </Badge>
          </div>

          {item.author && (
            <p className="text-sm text-smw-sage mb-1">{item.author}</p>
          )}

          <p className="text-sm text-smw-sage mb-3 flex-1 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smw-gold hover:text-smw-gold-light transition-colors"
              aria-label="Open resource"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LibraryItemCard;
