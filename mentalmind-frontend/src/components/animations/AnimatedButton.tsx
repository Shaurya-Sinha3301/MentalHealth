'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motionUtils, mojsUtils, shouldAnimate } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  celebrateOnClick?: boolean;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export function AnimatedButton({ 
  celebrateOnClick = false, 
  hoverEffect = true,
  className,
  onClick,
  children,
  ...props 
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!shouldAnimate() || !buttonRef.current || !hoverEffect) return;

    const cleanup = motionUtils.buttonHover(buttonRef.current);
    return cleanup;
  }, [hoverEffect]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (celebrateOnClick && shouldAnimate() && buttonRef.current) {
      mojsUtils.successCelebration(buttonRef.current);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(
        'transition-all duration-200 transform-gpu',
        'hover:shadow-lg active:scale-95',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}