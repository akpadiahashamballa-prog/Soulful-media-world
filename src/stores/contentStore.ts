import { create } from 'zustand';
import { Article, LibraryItem, Comment } from '@/types';

interface ContentState {
  articles: Article[];
  libraryItems: LibraryItem[];
  comments: Comment[];
  loading: boolean;
  error: string | null;

  // Article management
  addArticle: (article: Article) => void;
  updateArticle: (articleId: string, updates: Partial<Article>) => void;
  deleteArticle: (articleId: string) => void;
  getArticleBySlug: (slug: string) => Article | undefined;

  // Library management
  addLibraryItem: (item: LibraryItem) => void;
  updateLibraryItem: (itemId: string, updates: Partial<LibraryItem>) => void;
  deleteLibraryItem: (itemId: string) => void;
  searchLibrary: (query: string) => LibraryItem[];

  // Comment management
  addComment: (comment: Comment) => void;
  getCommentsByTarget: (targetId: string) => Comment[];
  deleteComment: (commentId: string) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  articles: [],
  libraryItems: [],
  comments: [],
  loading: false,
  error: null,

  addArticle: (article: Article) =>
    set((state) => ({
      articles: [article, ...state.articles],
    })),

  updateArticle: (articleId: string, updates: Partial<Article>) =>
    set((state) => ({
      articles: state.articles.map((a) =>
        a.id === articleId ? { ...a, ...updates } : a
      ),
    })),

  deleteArticle: (articleId: string) =>
    set((state) => ({
      articles: state.articles.filter((a) => a.id !== articleId),
    })),

  getArticleBySlug: (slug: string) => {
    return get().articles.find((a) => a.slug === slug);
  },

  addLibraryItem: (item: LibraryItem) =>
    set((state) => ({
      libraryItems: [item, ...state.libraryItems],
    })),

  updateLibraryItem: (itemId: string, updates: Partial<LibraryItem>) =>
    set((state) => ({
      libraryItems: state.libraryItems.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    })),

  deleteLibraryItem: (itemId: string) =>
    set((state) => ({
      libraryItems: state.libraryItems.filter((item) => item.id !== itemId),
    })),

  searchLibrary: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return get().libraryItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },

  addComment: (comment: Comment) =>
    set((state) => ({
      comments: [comment, ...state.comments],
    })),

  getCommentsByTarget: (targetId: string) => {
    return get().comments.filter((c) => c.targetId === targetId);
  },

  deleteComment: (commentId: string) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== commentId),
    })),

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
