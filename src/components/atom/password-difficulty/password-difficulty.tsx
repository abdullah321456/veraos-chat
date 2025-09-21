"use client";

import { useState, useEffect } from 'react';
import { GreenTickIcon } from '@/components/atom/icons/green-tick';
import cn from '@/lib/utils/cn';

// Simple X icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PasswordDifficultyProps {
  password: string;
  className?: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export function PasswordDifficulty({ password, className }: PasswordDifficultyProps) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const passwordRequirements: Requirement[] = [
    {
      label: 'At least one uppercase letter',
      test: (pwd) => /[A-Z]/.test(pwd),
      met: false,
    },
    {
      label: 'At least one lowercase letter',
      test: (pwd) => /[a-z]/.test(pwd),
      met: false,
    },
    {
      label: 'At least one number',
      test: (pwd) => /[0-9]/.test(pwd),
      met: false,
    },
    {
      label: 'At least one special character',
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      met: false,
    },
  ];

  useEffect(() => {
    const updatedRequirements = passwordRequirements.map(req => ({
      ...req,
      met: req.test(password),
    }));
    setRequirements(updatedRequirements);
  }, [password]);

  const allRequirementsMet = requirements.length > 0 && requirements.every(req => req.met);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="text-sm font-medium text-gray-700">
        Password Requirements:
      </div>
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {requirement.met ? (
              <GreenTickIcon className="w-4 h-4 flex-shrink-0" />
            ) : (
              <XIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
            <span className={cn(
              'transition-colors',
              requirement.met ? 'text-green-700' : 'text-red-700'
            )}>
              {requirement.label}
            </span>
          </div>
        ))}
      </div>
      {password.length > 0 && (
        <div className={cn(
          'text-xs font-medium transition-colors',
          allRequirementsMet ? 'text-green-600' : 'text-red-600'
        )}>
          {allRequirementsMet ? '✓ All requirements met!' : 'Please meet all requirements above'}
        </div>
      )}
    </div>
  );
}
