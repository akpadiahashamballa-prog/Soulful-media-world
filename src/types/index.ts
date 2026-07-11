// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'viewer' | 'creator' | 'editor' | 'admin';
  createdAt: Date;
}

// AI Intelligence System
export interface EditorPerspective {
  id: string;
  type: 'philosopher' | 'analyst' | 'futurist';
  insight: string;
  sources: Source[];
  confidence: number;
  reasoning: string;
  createdAt: Date;
}

export interface Source {
  id: string;
  title: string;
  url: string;
  author?: string;
  publishedAt?: Date;
  credibilityScore: number;
}

export interface SIGNAL {
  id: string;
  topic: string;
  perspectives: {
    philosopher: EditorPerspective;
    analyst: EditorPerspective;
    futurist: EditorPerspective;
  };
  synthesis: string;
  credibilityScore: number;
  tags: string[];
  sources: Source[];
  timestamp: Date;
  updatedAt: Date;
}

// Content
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'book' | 'research' | 'guide' | 'resource';
  author?: string;
  description: string;
  url: string;
  image?: string;
  category: string;
  tags: string[];
  createdAt: Date;
}

// Marketplace
export interface Product {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'music' | 'documentary' | 'course' | 'photography' | 'artwork' | 'download';
  price: number;
  currency: string;
  image: string;
  images?: string[];
  creator: User;
  category: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviews: Review[];
  inventory?: number;
  digital: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  author: User;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: 'stripe' | 'paystack' | 'selar';
  createdAt: Date;
  updatedAt: Date;
}

// Community
export interface Comment {
  id: string;
  content: string;
  author: User;
  targetId: string;
  targetType: 'article' | 'signal' | 'product';
  likes: number;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mention' | 'comment' | 'like' | 'follow' | 'purchase';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: Date;
}

// Membership
export interface MembershipTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  limit?: number;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  tierId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  createdAt: Date;
}
