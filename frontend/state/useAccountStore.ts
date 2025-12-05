import { create } from 'zustand';
import { AccountProfile, Platform } from '../types';

interface AccountState {
  selectedPlatform: Platform;
  searchUrl: string;
  accounts: AccountProfile[];
  recent: AccountProfile[];
  active?: AccountProfile;
  loading: boolean;
  setPlatform: (platform: Platform) => void;
  setSearchUrl: (url: string) => void;
  fetchAccount: (url: string) => Promise<AccountProfile | undefined>;
}

const mockAccount: AccountProfile = {
  id: 'tiktok_heyvin',
  name: '@heyvin',
  platform: 'tiktok',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60',
  followers: 1200000,
  avgLikes: 184000,
  avgComments: 4200,
  avgViews: 3200000,
  posts: 35,
  erPost: 15.2,
  erViews: 9.4,
  vr: 7.4
};

export const useAccountStore = create<AccountState>((set) => ({
  selectedPlatform: 'tiktok',
  searchUrl: 'https://www.tiktok.com/@heyvin',
  accounts: [mockAccount],
  recent: [mockAccount],
  active: mockAccount,
  loading: false,
  setPlatform(platform) {
    set({ selectedPlatform: platform });
  },
  setSearchUrl(url) {
    set({ searchUrl: url });
  },
  async fetchAccount(url) {
    set({ loading: true });
    try {
      const res = await fetch(`/analytics/account/${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('network');
      const data: AccountProfile = await res.json();
      set((state) => ({
        active: data,
        accounts: [...state.accounts, data],
        recent: [data, ...state.recent].slice(0, 5)
      }));
      return data;
    } catch (error) {
      set((state) => ({
        active: mockAccount,
        accounts: state.accounts.some((a) => a.id === mockAccount.id)
          ? state.accounts
          : [...state.accounts, mockAccount],
        recent: [mockAccount, ...state.recent.filter((a) => a.id !== mockAccount.id)].slice(0, 5)
      }));
      return mockAccount;
    } finally {
      set({ loading: false });
    }
  }
}));
