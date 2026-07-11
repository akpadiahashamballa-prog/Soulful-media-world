import React from 'react';
import Container from '@/components/common/Container';

const JournalPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Journal</h1>
          <p className="text-xl text-smw-sage">Regular essays, reflections, and analyses from our community.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>Journal section coming soon. Featured articles, member contributions, and curated essays.</p>
        </Container>
      </section>
    </div>
  );
};

export default JournalPage;
