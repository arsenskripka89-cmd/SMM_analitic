import { Platform } from '../../db/models.js';

type AccountMetricRequest = {
  handle: string;
  accessToken?: string;
};

type AccountMetrics = {
  handle: string;
  followers: number;
  following: number;
  posts: number;
  views?: number;
  engagementRate: number;
  lastSync: string;
};

type PlatformAdapter = {
  buildAuthUrl: (redirectUri: string) => string;
  fetchAccountMetrics: (input: AccountMetricRequest) => AccountMetrics;
};

const instagramAdapter: PlatformAdapter = {
  buildAuthUrl: (redirectUri) =>
    `https://www.facebook.com/v18.0/dialog/oauth?client_id=instagram-demo&redirect_uri=${encodeURIComponent(redirectUri)}&scope=instagram_basic,instagram_manage_insights`,
  fetchAccountMetrics: ({ handle }) => ({
    handle,
    followers: 120_450,
    following: 320,
    posts: 870,
    engagementRate: 5.4,
    lastSync: new Date().toISOString()
  })
};

const tiktokAdapter: PlatformAdapter = {
  buildAuthUrl: (redirectUri) =>
    `https://www.tiktok.com/auth/authorize?client_key=tiktok-demo&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user.info.basic,user.stats`,
  fetchAccountMetrics: ({ handle }) => ({
    handle,
    followers: 89_300,
    following: 140,
    posts: 350,
    views: 1_100_000,
    engagementRate: 8.2,
    lastSync: new Date().toISOString()
  })
};

const youtubeAdapter: PlatformAdapter = {
  buildAuthUrl: (redirectUri) =>
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=youtube-demo&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly`,
  fetchAccountMetrics: ({ handle }) => ({
    handle,
    followers: 302_000,
    following: 0,
    posts: 560,
    views: 9_400_000,
    engagementRate: 6.1,
    lastSync: new Date().toISOString()
  })
};

const adapters: Record<Platform, PlatformAdapter> = {
  instagram: instagramAdapter,
  tiktok: tiktokAdapter,
  youtube: youtubeAdapter,
  twitter: instagramAdapter
};

export const getPlatformAdapter = (platform: Platform) => adapters[platform];
