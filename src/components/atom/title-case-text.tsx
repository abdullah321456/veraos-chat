'use client';

import React from 'react';
import { toEnhancedTitleCase, toProperTitleCase } from '@/lib/utils/title-case';
import cn from '@/lib/utils/cn';

interface TitleCaseTextProps {
  children: string;
  variant?: 'simple' | 'proper';
  className?: string;
  as?: React.ElementType;
}

/**
 * Component that automatically applies title case to text content
 * 
 * @param children - The text content to apply title case to
 * @param variant - 'simple' for basic title case, 'proper' for title case with article handling
 * @param className - Additional CSS classes
 * @param as - HTML element to render as
 */
export function TitleCaseText({ 
  children, 
  variant = 'simple', 
  className,
  as: Component = 'span'
}: TitleCaseTextProps) {
  const processedText = variant === 'proper' 
    ? toProperTitleCase(children) 
    : toEnhancedTitleCase(children);

  return (
    <Component className={cn('title-case-js', className)}>
      {processedText}
    </Component>
  );
} 