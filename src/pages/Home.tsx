import React from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { ArrowRight, Sparkles, BookOpen, Users, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <Container size="lg" className="text-center">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h1 className="text-6xl sm:text-7xl font-serif mb-6 text-smw-white leading-tight">
              Living Chronicle of Digital <span className="text-smw-gold">Civilization</span>
            </h1>
            <p className="text-xl text-smw-sage mb-8 leading-relaxed">
              A sanctuary for human wisdom, knowledge, creativity, and culture. Explore intelligence synthesized
              through multiple perspectives. Discover, create, and connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Explore Signals <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Read Manifesto
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-smw-dark">
        <Container size="lg">
          <h2 className="text-4xl font-serif text-center mb-16 text-smw-white">Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Multi-Perspective Intelligence',
                description: 'Philosopher, Analyst, and Futurist editors synthesize signals from diverse viewpoints.',
              },
              {
                icon: BookOpen,
                title: 'Curated Knowledge',
                description: 'Explore our journal, library, and archive. Thousands of resources at your fingertips.',
              },
              {
                icon: Zap,
                title: 'Creative Marketplace',
                description: 'Discover and support creators. Books, music, art, courses, and more.',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} hoverable className="text-center">
                  <Icon className="w-12 h-12 text-smw-gold mx-auto mb-4" />
                  <h3 className="text-xl font-serif mb-3 text-smw-white">{feature.title}</h3>
                  <p className="text-smw-sage">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Recent Signals */}
      <section className="py-16 px-4">
        <Container size="lg">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-serif text-smw-white">Recent SIGNALS</h2>
            <Button variant="ghost">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((signal) => (
              <Card key={signal} hoverable>
                <div className="mb-4 flex justify-between items-start">
                  <h3 className="text-xl font-serif text-smw-white flex-1">Emerging Trends in AI</h3>
                  <span className="text-xs text-smw-gold bg-smw-gold/10 px-2 py-1 rounded">Trending</span>
                </div>
                <p className="text-smw-sage mb-4">
                  A synthesis of philosophical implications, analytical patterns, and future scenarios in artificial intelligence.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-smw-gray rounded text-smw-white">Philosophy</span>
                  <span className="text-xs px-2 py-1 bg-smw-gray rounded text-smw-white">Technology</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <Container size="md" className="text-center">
          <h2 className="text-4xl font-serif mb-6 text-smw-white">Join the Community</h2>
          <p className="text-lg text-smw-sage mb-8">
            Become part of a global community dedicated to wisdom, creativity, and meaningful culture.
          </p>
          <Button size="lg" variant="primary">
            Subscribe Now <Users className="w-5 h-5 ml-2" />
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
