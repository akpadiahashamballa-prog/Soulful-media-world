import React from 'react';
import { Product } from '@/types';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { formatCurrency } from '@/utils/formatters';
import { ShoppingCart, Star } from 'lucide-react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useMarketplaceStore();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const typeColors: Record<string, string> = {
    book: 'bg-blue-900/30 text-blue-200',
    music: 'bg-purple-900/30 text-purple-200',
    documentary: 'bg-green-900/30 text-green-200',
    course: 'bg-amber-900/30 text-amber-200',
    photography: 'bg-red-900/30 text-red-200',
    artwork: 'bg-pink-900/30 text-pink-200',
    download: 'bg-cyan-900/30 text-cyan-200',
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      {/* Image */}
      <div className="mb-4 -mx-6 -mt-6 h-48 bg-gradient-to-br from-smw-gold/20 to-smw-gold/5 rounded-t-lg flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-4xl text-smw-gold/40">📦</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-serif text-lg text-smw-white flex-1">{product.title}</h3>
          <Badge variant="gold" className={`text-xs whitespace-nowrap ${typeColors[product.type] || 'bg-smw-gold/20 text-smw-gold'}`}>
            {product.type}
          </Badge>
        </div>

        {/* Creator */}
        <p className="text-sm text-smw-sage mb-2">{product.creator.name}</p>

        {/* Description */}
        <p className="text-sm text-smw-sage mb-4 flex-1 line-clamp-2">{product.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="default" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4 text-sm text-smw-sage">
          <div className="flex text-smw-gold">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span>({product.reviews.length})</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-smw-gray pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-serif text-smw-gold">{formatCurrency(product.price)}</span>
          {product.inventory !== undefined && product.inventory < 5 && (
            <Badge variant="warning" className="text-xs">Low stock</Badge>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1.5 bg-smw-dark border border-smw-gray rounded text-smw-white text-center focus:outline-none focus:border-smw-gold"
          />
          <Button
            onClick={handleAddToCart}
            variant="primary"
            className="flex-1"
            disabled={product.inventory === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
