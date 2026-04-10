import type { Feed } from '@/models';

export type LoadFeedFunction = (
  date: Date,
  onComplete?: () => void,
) => Promise<void>;

export type FeedContextType = {
  feed: Feed;
  load: LoadFeedFunction;
};
