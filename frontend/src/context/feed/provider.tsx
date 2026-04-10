import { useCallback, useState } from 'react';
import type { Feed } from '@/models/feed';
import { getDatabaseDate } from '@/lib/formatters';
import { defaultValue, FeedContext } from './context';
import { findCachedFeed, setCachedFeed } from '@/lib/cache';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [feed, setFeed] = useState<Feed>(defaultValue);

  const loadFeed = useCallback(async (date: Date, onComplete?: () => void) => {
    const parsedDate = getDatabaseDate(date);
    if (!parsedDate) {
      throw new Error('Invalid date provided');
    }

    setFeed(defaultValue);
    const cached = findCachedFeed(parsedDate);
    if (cached) {
      setFeed(cached);
      onComplete?.();
      return;
    }

    const url = apiUrl + '/api/feed?date=' + parsedDate;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch feed data');
    }

    const response = await res.json();
    const data: Feed = response.feed;

    setFeed(data);
    setCachedFeed(data);
    onComplete?.();
  }, []);

  return (
    <FeedContext.Provider value={{ feed: feed, load: loadFeed }}>
      {children}
    </FeedContext.Provider>
  );
}
