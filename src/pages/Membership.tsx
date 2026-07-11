import React from 'react';
import Container from '@/components/common/Container';

const MembershipPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">Membership</h1>
          <p className="text-xl text-smw-sage">Join our community and unlock exclusive benefits.</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md" className="text-center text-smw-sage">
          <p>Membership section coming soon. Tier information, benefits, and subscription management.</p>
        </Container>
      </section>
    </div>
  );
};

export default MembershipPage;
