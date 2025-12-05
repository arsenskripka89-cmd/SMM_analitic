import { create } from 'zustand';
import { Post, Platform } from '../types';

export type SortKey = 'likes' | 'shares' | 'comments' | 'views' | 'erPost' | 'erView' | 'vrPost' | 'date';

interface DateRange {
  from: string;
  to: string;
}

interface FeedState {
  posts: Post[];
  filtered: Post[];
  sortBy: SortKey;
  dateRange: DateRange;
  contentTypes: string[];
  platformFilter: Platform | 'all';
  loading: boolean;
  fetchPosts: (accountId: string) => Promise<void>;
  setSort: (sort: SortKey) => void;
  setDateRange: (range: DateRange) => void;
  toggleContentType: (type: string) => void;
  setPlatformFilter: (platform: Platform | 'all') => void;
}

const mockPosts: Post[] = [
  {
    id: '1',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@dancer/video/1',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60',
    likes: 12400,
    comments: 450,
    shares: 340,
    views: 158000,
    date: '2024-01-15',
    erPost: 6.8,
    erView: 4.1,
    vrPost: 12.3
  },
  {
    id: '2',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/xyz/',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60',
    likes: 9400,
    comments: 180,
    shares: 120,
    views: 92000,
    date: '2024-01-18',
    erPost: 5.2,
    erView: 3.5,
    vrPost: 8.6
  },
  {
    id: '3',
    platform: 'youtube',
    url: 'https://youtube.com/watch?v=abc',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60',
    likes: 17200,
    comments: 620,
    shares: 220,
    views: 210000,
    date: '2024-02-03',
    erPost: 7.4,
    erView: 4.6,
    vrPost: 10.1
  }
];

function sortPosts(posts: Post[], sortBy: SortKey) {
  if (sortBy === 'date') {
    return [...posts].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  }
  return [...posts].sort((a, b) => b[sortBy] - a[sortBy]);
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: mockPosts,
  filtered: sortPosts(mockPosts, 'date'),
  sortBy: 'date',
  dateRange: { from: '2024-01-01', to: '2024-02-10' },
  contentTypes: ['video', 'photo', 'carousel'],
  platformFilter: 'all',
  loading: false,
  async fetchPosts(accountId: string) {
    set({ loading: true });
    try {
      const res = await fetch(`/analytics/posts?account_id=${accountId}`);
      if (!res.ok) throw new Error('network');
      const data: Post[] = await res.json();
      set({
        posts: data,
        filtered: sortPosts(data, get().sortBy)
      });
    } catch (error) {
      set({ posts: mockPosts, filtered: sortPosts(mockPosts, get().sortBy) });
    } finally {
      set({ loading: false });
    }
  },
  setSort(sortBy) {
    const filtered = sortPosts(get().filtered, sortBy);
    set({ sortBy, filtered });
  },
  setDateRange(range) {
    const filtered = get()
      .posts.filter((p) => p.date >= range.from && p.date <= range.to)
      .filter((p) => (get().platformFilter === 'all' ? true : p.platform === get().platformFilter));
    set({ dateRange: range, filtered: sortPosts(filtered, get().sortBy) });
  },
  toggleContentType(type) {
    const current = get().contentTypes;
    const exists = current.includes(type);
    const next = exists ? current.filter((t) => t !== type) : [...current, type];
    set({ contentTypes: next });
  },
  setPlatformFilter(platform) {
    const filtered = get()
      .posts.filter((p) => (platform === 'all' ? true : p.platform === platform))
      .filter((p) => p.date >= get().dateRange.from && p.date <= get().dateRange.to);
    set({ platformFilter: platform, filtered: sortPosts(filtered, get().sortBy) });
  }
}));
