import React from 'react';
import { EditorPerspective } from '@/types';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { Brain, TrendingUp, Zap } from 'lucide-react';

interface EditorPerspectiveCardProps {
  perspective: EditorPerspective;
}

const EditorPerspectiveCard: React.FC<EditorPerspectiveCardProps> = ({ perspective }) => {
  const icons = {
    philosopher: Brain,
    analyst: TrendingUp,
    futurist: Zap,
  };

  const labels = {
    philosopher: 'Philosopher',
    analyst: 'Analyst',
    futurist: 'Futurist',
  };

  const colors = {
    philosopher: 'bg-purple-900/30 text-purple-200',
    analyst: 'bg-blue-900/30 text-blue-200',
    futurist: 'bg-amber-900/30 text-amber-200',
  };

  const Icon = icons[perspective.type];

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colors[perspective.type]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg text-smw-white">{labels[perspective.type]}</h3>
        </div>
        <Badge variant="gold" className="text-xs">
          {(perspective.confidence * 100).toFixed(0)}%
        </Badge>
      </div>

      <p className="text-smw-sage mb-4 leading-relaxed">{perspective.insight}</p>

      <div className="mb-4 p-3 bg-smw-dark rounded border border-smw-gray">
        <p className="text-xs font-mono text-smw-gold mb-2">Reasoning</p>
        <p className="text-sm text-smw-sage">{perspective.reasoning}</p>
      </div>

      {perspective.sources.length > 0 && (
        <div>
          <p className="text-xs font-medium text-smw-white mb-2">Sources ({perspective.sources.length})</p>
          <div className="space-y-1">
            {perspective.sources.slice(0, 3).map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-smw-gold hover:text-smw-gold-light truncate block"
              >
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EditorPerspectiveCard;
