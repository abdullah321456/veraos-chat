'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from './loading-spinner';
import cn from '@/lib/utils/cn';

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function RouteTransition({ children, className }: RouteTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const pathname = usePathname();

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);
    
    // Small delay to show transition
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={cn('relative', className)}>
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <LoadingSpinner size="md" />
        </div>
      )}
      <div className={cn(
        'transition-opacity duration-200',
        isTransitioning ? 'opacity-0' : 'opacity-100'
      )}>
        {displayChildren}
      </div>
    </div>
  );
}


