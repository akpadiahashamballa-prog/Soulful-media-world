import React from 'react';
import Container from '@/components/common/Container';

const CreativeStudioPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Creative Studio</h1>
          <p className="text-xl text-smw-sage">Tools and resources for creators to build, publish, and share.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>Creative Studio section coming soon. Creator tools, publishing platform, and distribution network.</p>
        </Container>
      </section>
    </div>
  );
};

export default CreativeStudioPage;
