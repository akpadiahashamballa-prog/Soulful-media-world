import React from 'react';
import { SIGNAL } from '@/types';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import EditorPerspectiveCard from './EditorPerspectiveCard';
import { formatDate } from '@/utils/formatters';
import { Sparkles } from 'lucide-react';

interface SIGNALDisplayProps {
  signal: SIGNAL;
  detailed?: boolean;
}

const SIGNALDisplay: React.FC<SIGNALDisplayProps> = ({ signal, detailed = false }) => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-smw-gray pb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-smw-gold" />
              <h1 className="text-4xl font-serif text-smw-white">{signal.topic}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {signal.tags.map((tag) => (
                <Badge key={tag} variant="gold">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-smw-sage mb-2">{formatDate(signal.timestamp)}</div>
            <Badge variant="success" className="text-sm">
              Credibility: {(signal.credibilityScore * 100).toFixed(0)}%
            </Badge>
          </div>
        </div>
      </div>

      {/* Synthesis */}
      <div>
        <h2 className="text-2xl font-serif text-smw-gold mb-6">Unified Synthesis</h2>
        <div className="bg-smw-dark rounded-lg border border-smw-gold/30 p-8">
          <p className="text-lg text-smw-white leading-relaxed">{signal.synthesis}</p>
        </div>
      </div>

      {/* Three Perspectives */}
      <div>
        <h2 className="text-2xl font-serif text-smw-white mb-6">Perspectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorPerspectiveCard perspective={signal.perspectives.philosopher} />
          <EditorPerspectiveCard perspective={signal.perspectives.analyst} />
          <EditorPerspectiveCard perspective={signal.perspectives.futurist} />
        </div>
      </div>

      {/* Sources */}
      {signal.sources.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-smw-white mb-6">Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signal.sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-smw-dark rounded-lg border border-smw-gray hover:border-smw-gold transition-colors group"
              >
                <p className="font-medium text-smw-white group-hover:text-smw-gold transition-colors mb-1">
                  {source.title}
                </p>
                {source.author && (
                  <p className="text-sm text-smw-sage mb-1">By {source.author}</p>
                )}
                {source.publishedAt && (
                  <p className="text-xs text-smw-sage">{formatDate(source.publishedAt)}</p>
                )}
                <div className="mt-2">
                  <Badge variant="gold">
                    {(source.credibilityScore * 100).toFixed(0)}% credible
                  </Badge>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SIGNALDisplay;
