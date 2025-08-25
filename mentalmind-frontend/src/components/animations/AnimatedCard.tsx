'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { gsapUtils, shouldAnimate } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  animationType?: 'fadeIn' | 'slideUp' | 'scale';
  delay?: number;
  children: React.ReactNode;
}

export function AnimatedCard({ 
  animationType = 'fadeIn',
  delay = 0,
  className,
  children,
  ...props 
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !shouldAnimate() || !cardRef.current) return;

    switch (animationType) {
      case 'fadeIn':
        gsapUtils.scrollFadeIn(cardRef.current, { delay });
        break;
      case 'slideUp':
        gsapUtils.scrollFadeIn(cardRef.current, { 
          delay,
          start: 'top 90%',
        });
        break;
      case 'scale':
        gsapUtils.scrollFadeIn(cardRef.current, { 
          delay,
          scale: 0.8,
        });
        break;
    }
  }, [isClient, animationType, delay]);

  return (
    <Card
      ref={cardRef}
      className={cn(
        'transform-gpu will-change-transform',
        !isClient && 'opacity-100', // Always visible during SSR
        isClient && !shouldAnimate() && 'opacity-100',
        isClient && shouldAnimate() && 'opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}