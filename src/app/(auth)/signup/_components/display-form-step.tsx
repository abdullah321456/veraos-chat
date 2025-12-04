'use client';

import useQueryParams from '@/lib/hooks/use-query-params';
import { CustomSvgElement } from '@/types';
import { Fragment, Suspense, useState, useEffect } from 'react';
import { SIGNUP_STEP_ICONS, TickIcon } from '.';
import { UseQueryParamsMultiStepType } from '../_forms';
import { SIGNUP_STEPS, SignupStepParamsStepType } from '../constants';

import cn from '@/lib/utils/cn';
import { useSignupMultiStep } from '../utils';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

// Helper to get dark mode from localStorage
const getDarkModeFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    } catch {
      return false;
    }
  }
  return false;
};

type Step = {
  name: string;
  stepKey: SignupStepParamsStepType;
  doneKeys?: SignupStepParamsStepType[];
  icon: CustomSvgElement;
};

const steps: Step[] = [
  {
    name: 'Account and Organization Info',
    stepKey: 'account_and_organization_info',
    doneKeys: ['data_access_needs_and_use_cases', 'final_submission'],
    icon: SIGNUP_STEP_ICONS['account_and_organization_info'],
  },
  {
    name: 'Data Access Needs and Use Cases',
    stepKey: 'data_access_needs_and_use_cases',
    doneKeys: ['final_submission'],
    icon: SIGNUP_STEP_ICONS['data_access_needs_and_use_cases'],
  },
  {
    name: 'Upload ID & Final Submission',
    stepKey: 'final_submission',
    icon: SIGNUP_STEP_ICONS['final_submission'],
  },
];

export function DisplayStepMarker() {
  const { currentStep } = useSignupMultiStep();
  const darkModeContext = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };
    updateDarkMode();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') updateDarkMode();
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(updateDarkMode, 50);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  return (
    <Suspense>
      <div className="grid grid-cols-3 sm:grid-cols-11 gap-2 sm:gap-4 mb-6 sm:mb-8 w-full max-w-[630px] mx-auto px-4 sm:px-0">
        {steps.map((step, index) => (
          <Fragment key={step.stepKey}>
            <StepMarker
              defaultCurrent={index === 0}
              key={step.name}
              name={step.name}
              stepKey={step.stepKey}
              doneKeys={step.doneKeys}
              icon={step.icon}
              isLastIndex={index === steps.length - 1}
              isDarkMode={isDarkMode}
            />
            {index < steps.length - 1 && (
              <div className="hidden sm:flex justify-center pt-5">
                <div
                  className={cn(
                    'w-20 h-0.5 scale-x-[3] relative duration-300',
                    isDarkMode ? 'bg-white/20' : 'bg-gray-300',
                    currentStep === SIGNUP_STEPS.DATA_ACCESS_NEEDS_AND_USE_CASES && index === 0 && 'bg-primary',
                    currentStep === SIGNUP_STEPS.FINAL_SUBMISSION && index === 1 && 'bg-primary',
                    currentStep === SIGNUP_STEPS.FINAL_SUBMISSION && index === 0 && 'bg-primary'
                  )}
                ></div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Suspense>
  );
}

function StepMarker({
  name,
  stepKey,
  doneKeys,
  icon,
  isLastIndex,
  defaultCurrent,
  isDarkMode,
}: Step & { isLastIndex: boolean; defaultCurrent: boolean; isDarkMode: boolean }) {
  const { queryParams } = useQueryParams<UseQueryParamsMultiStepType>();
  const isAllDone = isLastIndex && queryParams?.done === 'true';
  const isDone = doneKeys?.includes(queryParams?.step) || isAllDone;
  const isCurrent = defaultCurrent || stepKey === queryParams?.step;

  const isOnlyCurrent = isCurrent && !isDone;

  const Icon = icon;

  return (
    <div className="col-span-1 sm:col-span-3">
      <div className="flex flex-col items-center gap-1 sm:gap-2 mx-auto">
        {isDone && (
          <span className="h-9 w-9 sm:h-11 sm:w-11 flex justify-center items-center bg-primary/10 rounded-full">
            <TickIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </span>
        )}
        {isOnlyCurrent ? (
          <span className="h-9 w-9 sm:h-11 sm:w-11 flex justify-center items-center text-primary rounded-full border-2 border-primary">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
        ) : (
          !isDone && <span className="h-9 w-9 sm:h-11 sm:w-11 rounded-full border border-dashed" style={{ borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#4B5563' }}></span>
        )}
        <span
          className={cn('pt-1 sm:pt-2 text-[10px] sm:text-xs font-semibold text-center duration-300', isOnlyCurrent && 'text-primary')}
          style={{ color: isOnlyCurrent ? undefined : (isDarkMode ? '#A7A7A7' : '#6B7280') }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
