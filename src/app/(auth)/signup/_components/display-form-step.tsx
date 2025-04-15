'use client';

import useQueryParams from '@/lib/hooks/use-query-params';
import { CustomSvgElement } from '@/types';
import { Fragment, Suspense } from 'react';
import { SIGNUP_STEP_ICONS, TickIcon } from '.';
import { UseQueryParamsMultiStepType } from '../_forms';
import { SIGNUP_STEPS, SignupStepParamsStepType } from '../constants';

import cn from '@/lib/utils/cn';
import { useSignupMultiStep } from '../utils';

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
    name: 'Final Submission',
    stepKey: 'final_submission',
    icon: SIGNUP_STEP_ICONS['final_submission'],
  },
];

export function DisplayStepMarker() {
  const { currentStep } = useSignupMultiStep();
  return (
    <Suspense>
      <div className="grid grid-cols-11 gap-4 mb-8 w-[630px] mx-auto">
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
            />
            {index < steps.length - 1 && (
              <div className="flex justify-center pt-5">
                <div
                  className={cn(
                    'w-20 h-0.5 bg-gray-300 scale-x-[3] relative duration-300',
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
}: Step & { isLastIndex: boolean; defaultCurrent: boolean }) {
  const { queryParams } = useQueryParams<UseQueryParamsMultiStepType>();
  const isAllDone = isLastIndex && queryParams?.done === 'true';
  const isDone = doneKeys?.includes(queryParams?.step) || isAllDone;
  const isCurrent = defaultCurrent || stepKey === queryParams?.step;

  const isOnlyCurrent = isCurrent && !isDone;

  const Icon = icon;

  return (
    <div className="col-span-3">
      <div className="flex flex-col items-center gap-2 mx-auto">
        {isDone && (
          <span className="h-11 w-11 flex justify-center items-center bg-primary/10 rounded-full">
            <TickIcon className="w-6 h-6 text-primary" />
          </span>
        )}
        {isOnlyCurrent ? (
          <span className="h-11 w-11 flex justify-center items-center text-primary rounded-full border-2 border-primary">
            <Icon className="w-6 h-6" />
          </span>
        ) : (
          !isDone && <span className="h-11 w-11 rounded-full border border-dashed border-gray-600"></span>
        )}
        <span
          className={cn('text-gray-600 pt-2 text-xs font-semibold text-center whitespace-nowrap duration-300', isOnlyCurrent && 'text-primary')}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
