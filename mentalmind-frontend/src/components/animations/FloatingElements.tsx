'use client';

import { useEffect, useRef, useState } from 'react';
import { animeUtils, shouldAnimate } from '@/lib/animations';

interface FloatingElementsProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'strong';
  className?: string;
}

export function FloatingElements({ 
  children, 
  intensity = 'normal',
  className = ''
}: FloatingElementsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !shouldAnimate() || !elementRef.current) return;

    animeUtils.floatingAnimation(elementRef.current);
  }, [isClient, intensity]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}