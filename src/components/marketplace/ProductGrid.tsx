import React from 'react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products?: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 3 }) => {
  const { products: storeProducts } = useMarketplaceStore();
  const displayProducts = products || storeProducts;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns as keyof typeof columnClasses]} gap-6`}>
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
