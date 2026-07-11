import React from 'react';
import { Article } from '@/types';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { Link } from 'react-router-dom';
import { formatDate, formatReadingTime } from '@/utils/formatters';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const readingTime = formatReadingTime(article.content.split(' ').length);

  return (
    <Link to={`/journal/${article.slug}`}>
      <Card hoverable className={`h-full flex flex-col ${featured ? 'md:col-span-2' : ''}`}>
        {/* Featured Image */}
        {article.image && (
          <div className="mb-4 -mx-6 -mt-6 h-40 bg-gradient-to-br from-smw-gold/20 to-smw-gold/5 rounded-t-lg overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="gold" className="text-xs">
            {article.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className={`font-serif text-smw-white mb-2 flex-1 ${featured ? 'text-2xl' : 'text-lg'}`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-smw-sage mb-4 line-clamp-2">{article.excerpt}</p>

        {/* Meta */}
        <div className="border-t border-smw-gray pt-3 space-y-2 text-xs text-smw-sage">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.createdAt, 'MMM d')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="default" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
