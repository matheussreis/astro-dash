import type { Feed } from '@/models';
import { createContext, useContext, useState } from 'react';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export type LoadFeedFunction = (date: Date) => Promise<void>;

export type FeedContextType = {
  feed: Feed;
  load: LoadFeedFunction;
};

export const defaultValue: Feed = {
  date: new Date(),
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

export function useFeed() {
  return useContext(FeedContext);
}

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [feed, setFeed] = useState<Feed>(defaultValue);

  const loadFeed = async (date: Date) => {
    const parsedDate = date.toISOString().substring(0, 10);
    const url = apiUrl + '/api/feed?date=' + parsedDate;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch feed data');
    }

    const response = await res.json();
    const data: Feed = response.feed;
    setFeed(data);
  };

  return (
    <FeedContext.Provider value={{ feed: feed, load: loadFeed }}>
      {children}
    </FeedContext.Provider>
  );
}
