import React from 'react';
import Container from '@/components/common/Container';

const ManifestoPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-smw-dark to-smw-black">
        <Container size="md" className="text-center">
          <h1 className="text-6xl font-serif mb-8 text-smw-gold">Manifesto</h1>
          <p className="text-xl text-smw-sage">A declaration of principles for the Soulful Media World</p>
        </Container>
      </section>

      <section className="py-16 px-4">
        <Container size="md">
          <div className="prose prose-invert max-w-none space-y-8">
            <article className="space-y-8 text-lg leading-relaxed">
              <div>
                <h2 className="text-3xl font-serif text-smw-white mb-4">I. Intelligence Without Monolith</h2>
                <p className="text-smw-sage">
                  We reject the false certainty of single perspectives. No one voice—whether AI, institution, or individual—can
                  hold complete truth. We synthesize wisdom by honoring multiple viewpoints: the philosophical depth that asks
                  "why," the analytical rigor that asks "how," and the futures thinking that asks "what if."
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-smw-white mb-4">II. Creativity as Foundation</h2>
                <p className="text-smw-sage">
                  Human creativity is civilization's truest currency. We build platforms that honor creators—writers, musicians,
                  artists, thinkers, builders—not as content machines but as essential architects of culture.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-smw-white mb-4">III. Knowledge With Care</h2>
                <p className="text-smw-sage">
                  Not all information deserves equal amplification. We curate with intention. We archive with dignity. We
                  attribute with precision. Quality over quantity. Depth over virality. Meaning over noise.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-smw-white mb-4">IV. Transparency in Synthesis</h2>
                <p className="text-smw-sage">
                  When perspectives merge, the path of reasoning must be visible. Show the sources. Reveal the disagreements.
                  Explain the confidence levels. Trust emerges from clarity.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif text-smw-white mb-4">V. Community Over Audience</h2>
                <p className="text-smw-sage">
                  We build for connection, not extraction. Community members are collaborators, not consumers. We invest in
                  belonging, not just metrics.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ManifestoPage;
