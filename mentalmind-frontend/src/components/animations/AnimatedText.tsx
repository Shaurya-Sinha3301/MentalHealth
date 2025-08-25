'use client';

import { useEffect, useRef, useState } from 'react';
import { animeUtils, shouldAnimate } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'reveal' | 'typewriter' | 'fadeIn';
  delay?: number;
  stagger?: boolean;
}

export function AnimatedText({ 
  children,
  className,
  animationType = 'reveal',
  delay = 0,
  stagger = true
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !shouldAnimate() || !textRef.current) return;

    const element = textRef.current;
    
    // Split text into spans for stagger effect only on client
    if (stagger && typeof children === 'string') {
      const words = children.split(' ');
      element.innerHTML = words
        .map(word => `<span class="inline-block">${word}</span>`)
        .join(' ');
    }

    switch (animationType) {
      case 'reveal':
        animeUtils.revealText(stagger ? `${element.className} span` : element, delay);
        break;
      case 'fadeIn':
        animeUtils.cardEntrance(element, delay);
        break;
    }
  }, [isClient, children, animationType, delay, stagger]);

  return (
    <div
      ref={textRef}
      className={cn(
        'transform-gpu will-change-transform',
        !isClient && 'opacity-100', // Always visible during SSR
        isClient && !shouldAnimate() && 'opacity-100',
        isClient && shouldAnimate() && 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}