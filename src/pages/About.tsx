import React from 'react';
import Container from '@/components/common/Container';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-8 text-smw-white">About Soulful Media World</h1>
          <p className="text-xl text-smw-sage leading-relaxed">
            We believe that the most profound intelligence emerges when diverse perspectives unite in service of
            understanding. Soulful Media World is a sanctuary for wisdom, knowledge, creativity, and culture.
          </p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-serif mb-4 text-smw-white">Our Mission</h2>
              <p className="text-lg text-smw-sage leading-relaxed">
                To synthesize global intelligence through multiple perspectives, creating a living chronicle of digital
                civilization that honors wisdom, elevates knowledge, celebrates creativity, and builds meaningful culture.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-serif mb-4 text-smw-white">Our Vision</h2>
              <p className="text-lg text-smw-sage leading-relaxed">
                A world where diverse viewpoints are not merely tolerated but celebrated as essential to understanding.
                Where creators are valued, knowledge is curated with care, and civilization advances through collective wisdom.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-serif mb-4 text-smw-white">Our Values</h2>
              <ul className="space-y-3 text-lg text-smw-sage">
                <li>• <strong>Wisdom</strong> - Deep understanding over superficial information</li>
                <li>• <strong>Integrity</strong> - Honest perspectives, transparent attribution, truthful synthesis</li>
                <li>• <strong>Creativity</strong> - Celebrating human expression and innovation</li>
                <li>• <strong>Community</strong> - Building connections that matter</li>
                <li>• <strong>Care</strong> - Thoughtful curation, respectful discourse, meaningful impact</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
