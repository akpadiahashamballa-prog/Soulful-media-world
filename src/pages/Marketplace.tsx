import React, { useState } from 'react';
import Container from '@/components/common/Container';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ShoppingCart from '@/components/marketplace/ShoppingCart';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import { Product } from '@/types';
import { Search, Filter } from 'lucide-react';

const MarketplacePageComponent: React.FC = () => {
  const { products } = useMarketplaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [showCart, setShowCart] = useState(false);

  const productTypes = ['book', 'music', 'documentary', 'course', 'photography', 'artwork', 'download'];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || product.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  if (showCart) {
    return (
      <div className="space-y-20 pb-24">
        <section className="pt-24 pb-16 px-4">
          <Container size="md">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" onClick={() => setShowCart(false)}>
                ← Back to Marketplace
              </Button>
              <h1 className="text-4xl font-serif text-smw-white">Shopping Cart</h1>
            </div>
            <ShoppingCart />
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-6 text-smw-white">Marketplace</h1>
          <p className="text-xl text-smw-sage">Discover and support creative work. Books, music, courses, art, and more.</p>
        </Container>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-smw-dark">
        <Container size="lg">
          <div className="space-y-6">
            {/* Search */}
            <Input
              label="Search products"
              icon={<Search className="w-4 h-4" />}
              placeholder="Search by title, creator, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-smw-white mb-2">Product Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 bg-smw-gray text-smw-white rounded-lg border border-smw-gray focus:outline-none focus:border-smw-gold"
                >
                  <option value="">All Types</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-smw-white mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-low' | 'price-high' | 'rating')}
                  className="w-full px-4 py-2 bg-smw-gray text-smw-white rounded-lg border border-smw-gray focus:outline-none focus:border-smw-gold"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Cart Button */}
              <div className="flex items-end">
                <Button
                  onClick={() => setShowCart(true)}
                  variant="outline"
                  className="w-full"
                >
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <Container size="lg">
          {filteredProducts.length > 0 ? (
            <>
              <p className="text-smw-sage mb-8">Showing {filteredProducts.length} products</p>
              <ProductGrid products={filteredProducts} columns={3} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-smw-sage mb-4">No products found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default MarketplacePageComponent;
