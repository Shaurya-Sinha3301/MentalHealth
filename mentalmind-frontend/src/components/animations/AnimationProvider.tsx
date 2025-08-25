'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { initializeAnimations, shouldAnimate } from '@/lib/animations';

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export const useAnimations = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Check user's motion preferences
    const enabled = shouldAnimate();
    setAnimationsEnabled(enabled);

    // Initialize animations if enabled
    if (enabled) {
      initializeAnimations();
    }

    // Listen for changes in motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setAnimationsEnabled(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}