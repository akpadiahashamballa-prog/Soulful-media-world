import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useAIStore } from '@/stores/aiStore';

const SignalGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const { generateSignal, loading } = useAIStore();

  const handleGenerate = async () => {
    if (topic.trim()) {
      await generateSignal(topic);
    }
  };

  return (
    <div className="bg-smw-dark rounded-lg border border-smw-gold/30 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-6 h-6 text-smw-gold" />
        <h3 className="text-2xl font-serif text-smw-white">Generate SIGNAL</h3>
      </div>

      <p className="text-smw-sage mb-6">
        Enter a topic and our editors will synthesize perspectives from multiple viewpoints.
      </p>

      <div className="space-y-4">
        <Input
          label="Topic or Question"
          placeholder="e.g., 'Future of AI in education' or 'Climate policy effectiveness'"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          disabled={loading}
        />

        <div className="bg-smw-gray/50 rounded p-4">
          <p className="text-xs font-mono text-smw-gold mb-2">How it works:</p>
          <ul className="text-xs text-smw-sage space-y-1">
            <li>• <strong>Philosopher</strong> analyzes meaning and ethical dimensions</li>
            <li>• <strong>Analyst</strong> identifies patterns and data-driven insights</li>
            <li>• <strong>Futurist</strong> explores scenarios and implications</li>
            <li>• Synthesis combines perspectives into unified SIGNAL</li>
          </ul>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          isLoading={loading}
          size="lg"
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate SIGNAL'}
        </Button>
      </div>
    </div>
  );
};

export default SignalGenerator;
