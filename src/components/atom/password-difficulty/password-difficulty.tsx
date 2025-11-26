"use client";

import cn from '@/lib/utils/cn';

interface PasswordDifficultyProps {
  password: string;
  className?: string;
}

export function PasswordDifficulty({ password, className }: PasswordDifficultyProps) {
  return (
      <div className={cn('text-xs text-gray-600', className)}>
        Min 8 characters, 1 number and 1 special character
      </div>
  );
}
