import React from 'react';
import Container from '@/components/common/Container';
import SignalGenerator from '@/components/ai/SignalGenerator';
import SIGNALDisplay from '@/components/ai/SIGNALDisplay';
import { useAIStore } from '@/stores/aiStore';

const IntelligencePage: React.FC = () => {
  const { currentSignal, signals } = useAIStore();

  return (
    <div className="space-y-20 pb-24">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-smw-dark to-smw-black">
        <Container size="md" className="text-center">
          <h1 className="text-5xl font-serif mb-6 text-smw-white">Intelligence Synthesis</h1>
          <p className="text-xl text-smw-sage">
            Multi-perspective analysis from Philosopher, Analyst, and Futurist editors
          </p>
        </Container>
      </section>

      {/* Generator */}
      <section className="py-16 px-4">
        <Container size="lg">
          <SignalGenerator />
        </Container>
      </section>

      {/* Current Signal Display */}
      {currentSignal && (
        <section className="py-16 px-4">
          <Container size="lg">
            <SIGNALDisplay signal={currentSignal} detailed />
          </Container>
        </section>
      )}

      {/* Recent Signals */}
      {signals.length > 0 && (
        <section className="py-16 px-4">
          <Container size="lg">
            <h2 className="text-3xl font-serif mb-8 text-smw-white">Recent SIGNALS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signals.map((signal) => (
                <div
                  key={signal.id}
                  className="p-6 bg-smw-dark rounded-lg border border-smw-gray hover:border-smw-gold transition-colors cursor-pointer"
                  onClick={() => useAIStore.setState({ currentSignal: signal })}
                >
                  <h3 className="text-xl font-serif text-smw-white mb-2">{signal.topic}</h3>
                  <p className="text-smw-sage mb-4 line-clamp-2">{signal.synthesis}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-smw-sage">{new Date(signal.timestamp).toLocaleDateString()}</span>
                    <span className="text-smw-gold">Credibility: {(signal.credibilityScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default IntelligencePage;
