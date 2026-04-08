import type { Feed } from '@/models';
import { getDatabaseDate } from './formatters';

const MAX_ITEMS = 10;
const CACHE_KEY = 'feed-data';

export function getCachedFeeds(): Feed[] {
  const raw = window.localStorage.getItem(CACHE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function findCachedFeed(date: string): Feed | undefined {
  const target = getDatabaseDate(date);
  if (!target) return undefined;
  return getCachedFeeds().find((item) => getDatabaseDate(item.date) === target);
}

export function setCachedFeed(value: Feed): void {
  if (!value.items?.apod || !value.items?.neo) return;
  if (findCachedFeed(value.date)) return;

  const updated = [...getCachedFeeds(), value].slice(-MAX_ITEMS);
  window.localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
}
