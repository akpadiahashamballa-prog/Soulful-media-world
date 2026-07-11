import { create } from 'zustand';
import { User, UserProfile } from '@/types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>>
  verifyEmail: (token: string) => Promise<void>;

  // State management
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // In production, this would call your backend API
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockProfile: UserProfile = {
        userId: mockUser.id,
        name: 'User',
        bio: '',
        avatar: '',
        role: 'member',
        location: '',
        website: '',
        social: {},
        preferences: {
          theme: 'dark',
          notifications: true,
          newsletter: true,
        },
        updatedAt: new Date(),
      };

      const mockToken = `token-${Date.now()}`;

      set({
        user: mockUser,
        profile: mockProfile,
        token: mockToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        loading: false,
      });
      throw error;
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newProfile: UserProfile = {
        userId: newUser.id,
        name,
        bio: '',
        avatar: '',
        role: 'member',
        location: '',
        website: '',
        social: {},
        preferences: {
          theme: 'dark',
          notifications: true,
          newsletter: true,
        },
        updatedAt: new Date(),
      };

      set({
        user: newUser,
        profile: newProfile,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Signup failed',
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      profile: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    set({ loading: true, error: null });
    try {
      const profile = get().profile;
      if (!profile) throw new Error('No profile found');

      const updatedProfile = { ...profile, ...updates, updatedAt: new Date() };
      set({ profile: updatedProfile, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Profile update failed',
        loading: false,
      });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // In production, this would send an email with reset link
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Password reset failed',
        loading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const user = get().user;
      if (!user) throw new Error('No user found');

      const verifiedUser = { ...user, emailVerified: true };
      set({ user: verifiedUser, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Email verification failed',
        loading: false,
      });
      throw error;
    }
  },

  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
