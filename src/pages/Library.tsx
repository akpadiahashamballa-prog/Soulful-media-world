import React from 'react';
import Container from '@/components/common/Container';

const LibraryPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Library</h1>
          <p className="text-xl text-smw-sage">A curated collection of knowledge resources, research, and references.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>Library section coming soon. Books, research papers, guides, and curated resources.</p>
        </Container>
      </section>
    </div>
  );
};

export default LibraryPage;
