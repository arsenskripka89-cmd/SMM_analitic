export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter';

export interface Post {
  id: string;
  platform: Platform;
  url: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  date: string;
  erPost: number;
  erView: number;
  vrPost: number;
}

export interface AccountProfile {
  id: string;
  name: string;
  platform: Platform;
  avatar: string;
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgViews: number;
  posts: number;
  erPost: number;
  erViews: number;
  vr: number;
}
