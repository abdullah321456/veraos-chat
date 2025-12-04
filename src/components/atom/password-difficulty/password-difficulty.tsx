"use client";

import cn from '@/lib/utils/cn';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

interface PasswordDifficultyProps {
  password: string;
  className?: string;
}

export function PasswordDifficulty({ password, className }: PasswordDifficultyProps) {
  const { isDarkMode } = useDarkMode();
  
  return (
      <div className={cn('text-xs', className)} style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>
        Min 8 characters, 1 number and 1 special character
      </div>
  );
}
