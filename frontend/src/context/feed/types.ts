import type { Feed } from '@/models';

export type LoadFeedFunction = (date: Date) => Promise<void>;

export type FeedContextType = {
  feed: Feed;
  load: LoadFeedFunction;
};
