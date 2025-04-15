'use client';

import useQueryParams from '@/lib/hooks/use-query-params';
import { UseQueryParamsMultiStepType } from './_forms';
import { SIGNUP_STEPS, SignupStepParamsStepType } from './constants';
import { useEffect } from 'react';

export function getNextStepKey(currentStep: SignupStepParamsStepType) {
  switch (currentStep) {
    case SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO:
      return SIGNUP_STEPS.DATA_ACCESS_NEEDS_AND_USE_CASES;
    case SIGNUP_STEPS.DATA_ACCESS_NEEDS_AND_USE_CASES:
      return SIGNUP_STEPS.FINAL_SUBMISSION;
    default:
      return SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO;
  }
}

export function useSignupMultiStep() {
  const { setQueryParams, queryParams } = useQueryParams<UseQueryParamsMultiStepType>();

  const currentStep = queryParams?.step as SignupStepParamsStepType;

  const nextStepKey = getNextStepKey(queryParams?.step as SignupStepParamsStepType);

  const isDoneAll = queryParams?.done === 'true';

  function handleNext() {
    if (queryParams?.done === 'true') {
      return setQueryParams({ step: SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO, done: 'false' }, { scroll: true });
    }
    if (queryParams?.step === SIGNUP_STEPS.FINAL_SUBMISSION) {
      setQueryParams({ done: 'true' }, { scroll: true });
    } else {
      setQueryParams({ step: nextStepKey }, { scroll: true });
    }
  }

  useEffect(() => {
    if (!queryParams?.step) {
      setQueryParams({ step: SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO }, { scroll: true });
    }
  }, []);

  return { isDoneAll, currentStep, nextStepKey, handleNext };
}
