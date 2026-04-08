import { useCallback } from 'react';

type TargetTypes = 'next' | 'prev' | 'self';

interface UseScrollOptions {
  ref: React.RefObject<HTMLElement | null>;
  target?: TargetTypes;
  offset?: number;
  behavior?: ScrollBehavior;
}

function getTargetElement(
  el: HTMLElement,
  target: TargetTypes,
): HTMLElement | null {
  switch (target) {
    case 'self':
      return el;
    case 'next':
      return el.nextElementSibling as HTMLElement | null;
    case 'prev':
      return el.previousElementSibling as HTMLElement | null;
    default:
      return null;
  }
}

function getTargetYAxis(el: HTMLElement, offset: number): number {
  return el.getBoundingClientRect().top + window.scrollY - offset;
}

export function useScroll({
  ref,
  target = 'next',
  offset = 40,
  behavior = 'smooth',
}: UseScrollOptions) {
  const scroll = useCallback(() => {
    const el = ref?.current;
    if (!el) {
      return;
    }

    const targetEl = getTargetElement(el, target);
    if (!targetEl) {
      return;
    }

    const y = getTargetYAxis(targetEl, offset);
    window.scrollTo({ top: y, behavior });
  }, [ref, target, offset, behavior]);

  return scroll;
}
