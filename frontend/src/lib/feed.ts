import type { Neo, NeoItem } from '@/models';

export function getHazardousNeos(neo: Neo): NeoItem[] {
  return neo.filter((item) => item.isHazardous);
}

export function getAverageVelocity(neo: Neo): number {
  if (!neo.length) {
    return 0;
  }

  return neo.reduce((sum, item) => sum + item.velocity, 0) / neo.length;
}

export function getClosestNeo(neo: Neo): NeoItem | null {
  if (!neo.length) {
    return null;
  }

  return neo.reduce((closest, item) =>
    item.missDistance < closest.missDistance ? item : closest,
  );
}

export function getFastestNeos(neo: Neo, count: number = 5): Neo {
  return [...neo].sort((a, b) => b.velocity - a.velocity).slice(0, count);
}
