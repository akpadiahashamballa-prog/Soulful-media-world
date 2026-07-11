import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

const MarketplacePage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Marketplace</h1>
          <p className="text-xl text-smw-sage">Discover and support creative work from around the world.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="lg">
          <div className="text-center mb-12">
            <p className="text-smw-sage">Marketplace functionality coming soon. Supporting:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
              {['Books', 'Music', 'Documentaries', 'Courses', 'Photography', 'Artwork', 'Digital Downloads', 'More'].map((item) => (
                <div key={item} className="py-3 px-4 bg-smw-dark rounded-lg border border-smw-gray">
                  <p className="text-smw-white font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <Button variant="outline">Learn More About Selling</Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default MarketplacePage;
