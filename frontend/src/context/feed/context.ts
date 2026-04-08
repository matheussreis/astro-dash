import type { Feed } from '@/models';
import { createContext } from 'react';
import type { FeedContextType } from './types';

export const defaultValue: Feed = {
  date: '',
  items: {
    apod: null,
    neo: null,
  },
};

const defaultContextValue: FeedContextType = {
  feed: defaultValue,
  load: async () => {},
};

export const FeedContext = createContext<FeedContextType>(defaultContextValue);
