export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: Platform;
  handle: string;
  externalId: string;
  createdAt: Date;
}

export interface SocialToken {
  id: string;
  socialAccountId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface Post {
  id: string;
  socialAccountId: string;
  externalId: string;
  title: string;
  type: 'video' | 'image' | 'text' | 'story';
  publishedAt: Date;
}

export interface PostStatisticDaily {
  id: string;
  postId: string;
  date: Date;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  reach: number;
  engagementRate: number;
}

export interface AccountStatisticDaily {
  id: string;
  socialAccountId: string;
  date: Date;
  followers: number;
  following: number;
  postsCount: number;
  reach: number;
  impressions: number;
  engagementRate: number;
}

export interface Hashtag {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Dashboard {
  id: string;
  userId: string;
  name: string;
  layout: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardWidget {
  id: string;
  dashboardId: string;
  type: string;
  config: Record<string, unknown>;
  position: { x: number; y: number };
  size: { w: number; h: number };
}
