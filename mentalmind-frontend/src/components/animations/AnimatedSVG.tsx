'use client';

import { useEffect, useRef } from 'react';
import { animeUtils, shouldAnimate } from '@/lib/animations';

interface AnimatedSVGProps {
  className?: string;
  delay?: number;
}

export function AnimatedSVG({ className = '', delay = 0 }: AnimatedSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!shouldAnimate() || !svgRef.current) return;

    // Animate the SVG paths
    animeUtils.drawSVGPath(svgRef.current.querySelectorAll('path'));
  }, [delay]);

  return (
    <svg
      ref={svgRef}
      className={`transform-gpu will-change-transform ${className}`}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain/Mind representation */}
      <path
        d="M200 50C240 50 280 80 280 120C280 140 270 160 250 170C270 180 280 200 280 220C280 260 240 290 200 290C160 290 120 260 120 220C120 200 130 180 150 170C130 160 120 140 120 120C120 80 160 50 200 50Z"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
      
      {/* Neural connections */}
      <path
        d="M150 120Q180 100 210 120Q240 140 270 120"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="500"
        strokeDashoffset="500"
      />
      
      <path
        d="M150 160Q180 140 210 160Q240 180 270 160"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="500"
        strokeDashoffset="500"
      />
      
      <path
        d="M150 200Q180 180 210 200Q240 220 270 200"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="500"
        strokeDashoffset="500"
      />

      {/* Floating particles */}
      <circle cx="100" cy="100" r="3" fill="url(#gradient3)" opacity="0.7">
        <animate attributeName="cy" values="100;80;100" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="150" r="2" fill="url(#gradient3)" opacity="0.5">
        <animate attributeName="cy" values="150;130;150" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="200" r="2.5" fill="url(#gradient3)" opacity="0.6">
        <animate attributeName="cy" values="200;180;200" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="80" r="2" fill="url(#gradient3)" opacity="0.4">
        <animate attributeName="cy" values="80;60;80" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        <radialGradient id="gradient3">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </radialGradient>
      </defs>
    </svg>
  );
}