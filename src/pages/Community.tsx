import React from 'react';
import Container from '@/components/common/Container';

const CommunityPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Community</h1>
          <p className="text-xl text-smw-sage">Connect with creators, thinkers, and fellow explorers.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>Community section coming soon. Forums, member profiles, events, and collaboration opportunities.</p>
        </Container>
      </section>
    </div>
  );
};

export default CommunityPage;
