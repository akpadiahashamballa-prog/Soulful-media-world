import React from 'react';
import Container from '@/components/common/Container';
import LibraryItemCard from '@/components/content/LibraryItemCard';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useContentStore } from '@/stores/contentStore';
import { Search } from 'lucide-react';

const LibraryPageComponent: React.FC = () => {
  const { libraryItems, searchLibrary } = useContentStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const types = Array.from(new Set(libraryItems.map((item) => item.type)));
  const categories = Array.from(new Set(libraryItems.map((item) => item.category)));

  const filteredItems = (searchQuery ? searchLibrary(searchQuery) : libraryItems)
    .filter((item) => !selectedType || item.type === selectedType)
    .filter((item) => !selectedCategory || item.category === selectedCategory);

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-6 text-smw-white">Library</h1>
          <p className="text-xl text-smw-sage">
            A curated collection of knowledge resources, research papers, guides, and references.
          </p>
        </Container>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-smw-dark">
        <Container size="lg">
          <div className="space-y-4">
            <Input
              label="Search library"
              icon={<Search className="w-4 h-4" />}
              placeholder="Search by title, author, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type Filter */}
              {types.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-smw-white mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedType === '' ? 'primary' : 'outline'}
                      onClick={() => setSelectedType('')}
                      className="text-sm"
                    >
                      All
                    </Button>
                    {types.map((type) => (
                      <Button
                        key={type}
                        variant={selectedType === type ? 'primary' : 'outline'}
                        onClick={() => setSelectedType(type)}
                        className="text-sm"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              {categories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-smw-white mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === '' ? 'primary' : 'outline'}
                      onClick={() => setSelectedCategory('')}
                      className="text-sm"
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'primary' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                        className="text-sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Library Items */}
      <section className="py-16 px-4">
        <Container size="lg">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-smw-sage mb-8">Showing {filteredItems.length} resources</p>
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <LibraryItemCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-smw-sage mb-4">No resources found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('');
                  setSelectedCategory('');
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

export default LibraryPageComponent;
