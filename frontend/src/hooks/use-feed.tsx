import { useContext } from 'react';
import { FeedContext } from '@/context/feed/context';

export function useFeed() {
  return useContext(FeedContext);
}
