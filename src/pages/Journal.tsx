import React from 'react';
import Container from '@/components/common/Container';
import ArticleCard from '@/components/content/ArticleCard';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useContentStore } from '@/stores/contentStore';
import { Search } from 'lucide-react';

const JournalPageComponent: React.FC = () => {
  const { articles } = useContentStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 1);
  const otherArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-6 text-smw-white">Journal</h1>
          <p className="text-xl text-smw-sage">
            Essays, reflections, and analyses from our community of thinkers and creators.
          </p>
        </Container>
      </section>

      {/* Featured Article */}
      {featuredArticles.length > 0 && (
        <section className="py-12 px-4">
          <Container size="lg">
            <h2 className="text-2xl font-serif text-smw-white mb-6">Featured</h2>
            <ArticleCard article={featuredArticles[0]} featured />
          </Container>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-smw-dark">
        <Container size="lg">
          <div className="space-y-4">
            <Input
              label="Search articles"
              icon={<Search className="w-4 h-4" />}
              placeholder="Search by title, keyword, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

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
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <Container size="lg">
          {otherArticles.length > 0 ? (
            <>
              <p className="text-smw-sage mb-8">Showing {otherArticles.length} articles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-smw-sage mb-4">No articles found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
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

export default JournalPageComponent;
