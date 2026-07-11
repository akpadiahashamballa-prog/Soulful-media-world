import { create } from 'zustand';
import { User, ModerationReport, SystemStats } from '@/types';

interface AdminState {
  users: User[];
  reports: ModerationReport[];
  stats: SystemStats | null;
  loading: boolean;
  error: string | null;

  // User management
  getUsers: (page?: number) => User[];
  suspendUser: (userId: string, reason: string) => Promise<void>;
  banUser: (userId: string, reason: string) => Promise<void>;
  restoreUser: (userId: string) => Promise<void>;

  // Moderation
  getReports: (status?: string) => ModerationReport[];
  createReport: (report: Omit<ModerationReport, 'id' | 'createdAt'>) => Promise<void>;
  approveReport: (reportId: string) => Promise<void>;
  rejectReport: (reportId: string, reason: string) => Promise<void>;

  // Statistics
  fetchStats: () => Promise<void>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: [],
  reports: [],
  stats: null,
  loading: false,
  error: null,

  getUsers: (page = 1) => {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    return get().users.slice(start, start + pageSize);
  },

  suspendUser: async (userId: string, reason: string) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === userId ? { ...u, status: 'suspended', suspensionReason: reason } : u
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to suspend user',
        loading: false,
      });
      throw error;
    }
  },

  banUser: async (userId: string, reason: string) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === userId ? { ...u, status: 'banned', banReason: reason } : u
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to ban user',
        loading: false,
      });
      throw error;
    }
  },

  restoreUser: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === userId ? { ...u, status: 'active' } : u
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to restore user',
        loading: false,
      });
      throw error;
    }
  },

  getReports: (status?: string) => {
    if (status) {
      return get().reports.filter((r) => r.status === status);
    }
    return get().reports;
  },

  createReport: async (report: Omit<ModerationReport, 'id' | 'createdAt'>) => {
    set({ loading: true, error: null });
    try {
      const newReport: ModerationReport = {
        ...report,
        id: `report-${Date.now()}`,
        createdAt: new Date(),
      };
      set((state) => ({
        reports: [newReport, ...state.reports],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create report',
        loading: false,
      });
      throw error;
    }
  },

  approveReport: async (reportId: string) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        reports: state.reports.map((r) =>
          r.id === reportId ? { ...r, status: 'approved', resolvedAt: new Date() } : r
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to approve report',
        loading: false,
      });
      throw error;
    }
  },

  rejectReport: async (reportId: string, reason: string) => {
    set({ loading: true, error: null });
    try {
      set((state) => ({
        reports: state.reports.map((r) =>
          r.id === reportId
            ? { ...r, status: 'rejected', resolutionNotes: reason, resolvedAt: new Date() }
            : r
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to reject report',
        loading: false,
      });
      throw error;
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const stats: SystemStats = {
        totalUsers: get().users.length,
        activeUsers: get().users.filter((u) => u.status === 'active').length,
        totalReports: get().reports.length,
        pendingReports: get().reports.filter((r) => r.status === 'pending').length,
        systemHealth: 'healthy',
        lastUpdated: new Date(),
      };
      set({ stats, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
        loading: false,
      });
    }
  },

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
