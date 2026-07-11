import { create } from 'zustand';
import { SIGNAL, EditorPerspective } from '@/types';

interface AIState {
  signals: SIGNAL[];
  currentSignal: SIGNAL | null;
  loading: boolean;
  error: string | null;
  addSignal: (signal: SIGNAL) => void;
  setCurrentSignal: (signal: SIGNAL | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  generateSignal: (topic: string) => Promise<void>;
}

export const useAIStore = create<AIState>((set) => ({
  signals: [],
  currentSignal: null,
  loading: false,
  error: null,

  addSignal: (signal: SIGNAL) =>
    set((state) => ({
      signals: [signal, ...state.signals],
    })),

  setCurrentSignal: (signal: SIGNAL | null) =>
    set({ currentSignal: signal }),

  setLoading: (loading: boolean) =>
    set({ loading }),

  setError: (error: string | null) =>
    set({ error }),

  generateSignal: async (topic: string) => {
    set({ loading: true, error: null });
    try {
      // Simulated signal generation
      const newSignal: SIGNAL = {
        id: `sig-${Date.now()}`,
        topic,
        perspectives: {
          philosopher: {
            id: 'phil-1',
            type: 'philosopher',
            insight: 'Philosophical perspective on the topic...',
            sources: [],
            confidence: 0.85,
            reasoning: 'Based on ethical and existential considerations...',
            createdAt: new Date(),
          },
          analyst: {
            id: 'ana-1',
            type: 'analyst',
            insight: 'Analytical perspective with data patterns...',
            sources: [],
            confidence: 0.92,
            reasoning: 'Data shows clear trends and correlations...',
            createdAt: new Date(),
          },
          futurist: {
            id: 'fut-1',
            type: 'futurist',
            insight: 'Forward-looking scenarios and implications...',
            sources: [],
            confidence: 0.78,
            reasoning: 'Considering multiple future pathways...',
            createdAt: new Date(),
          },
        },
        synthesis: 'Unified perspective synthesizing all three viewpoints...',
        credibilityScore: 0.85,
        tags: ['emerging', 'analysis'],
        sources: [],
        timestamp: new Date(),
        updatedAt: new Date(),
      };

      set({ currentSignal: newSignal, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate signal',
        loading: false,
      });
    }
  },
}));
