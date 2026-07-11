import React from 'react';
import Container from '@/components/common/Container';

const PineappleCodePage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">The Pineapple Code™</h1>
          <p className="text-xl text-smw-sage">A specialized framework for understanding complex systems and cultures.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>The Pineapple Code section coming soon. Detailed documentation and interactive tools.</p>
        </Container>
      </section>
    </div>
  );
};

export default PineappleCodePage;
