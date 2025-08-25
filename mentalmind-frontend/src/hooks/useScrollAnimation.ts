'use client';

import { useEffect, useRef, useState } from 'react';
import { gsapUtils, shouldAnimate } from '@/lib/animations';

interface UseScrollAnimationOptions {
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !shouldAnimate() || !elementRef.current) return;

    const {
      animationType = 'fadeIn',
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      delay = 0,
    } = options;

    const element = elementRef.current;

    let animationPromise: Promise<any> | null = null;

    switch (animationType) {
      case 'fadeIn':
        animationPromise = gsapUtils.scrollFadeIn(element, {
          start,
          end,
          scrub,
          delay,
        });
        break;
      
      case 'slideUp':
        animationPromise = gsapUtils.scrollFadeIn(element, {
          start,
          end,
          scrub,
          delay,
          y: 100,
        });
        break;
      
      case 'slideLeft':
        animationPromise = gsapUtils.scrollFadeIn(element, {
          start,
          end,
          scrub,
          delay,
          x: 100,
          y: 0,
        });
        break;
      
      case 'slideRight':
        animationPromise = gsapUtils.scrollFadeIn(element, {
          start,
          end,
          scrub,
          delay,
          x: -100,
          y: 0,
        });
        break;
      
      case 'scale':
        animationPromise = gsapUtils.scrollFadeIn(element, {
          start,
          end,
          scrub,
          delay,
          scale: 0.8,
          y: 0,
        });
        break;
    }

    return () => {
      if (animationPromise) {
        animationPromise.then((animation) => {
          if (animation && animation.kill) {
            animation.kill();
          }
        }).catch(() => {
          // Ignore cleanup errors
        });
      }
    };
  }, [isClient, options]);

  return elementRef;
}