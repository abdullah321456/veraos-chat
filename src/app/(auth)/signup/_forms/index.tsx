'use client';

import { Suspense } from 'react';
import { SIGNUP_STEPS, SignupStepParamsDoneType, SignupStepParamsStepType } from '../constants';
import { useSignupMultiStep } from '../utils';
import { AccountAndOrganizationInfoForm } from './account-and-organization-info.form';
import { DataAccessForm } from './data-access.form';
import { FinalSubmissionForm } from './final-submission.form';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { SubmissionDone } from '../_components/submission-done';

export type UseQueryParamsMultiStepType = {
  step: SignupStepParamsStepType;
  done: SignupStepParamsDoneType;
};

const MAP_MULTI_STEP_FORMS: Record<SignupStepParamsStepType, React.FC> = {
  [SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO]: AccountAndOrganizationInfoForm,
  [SIGNUP_STEPS.DATA_ACCESS_NEEDS_AND_USE_CASES]: DataAccessForm,
  [SIGNUP_STEPS.FINAL_SUBMISSION]: FinalSubmissionForm,
} as const;

export function SignupForm() {
  const { isDoneAll, currentStep } = useSignupMultiStep();

  const CurrentStepForm = MAP_MULTI_STEP_FORMS[currentStep ?? SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO];

  return (
    <Suspense>
      <FadeAnimation key={currentStep}>{isDoneAll ? <SubmissionDone /> : <CurrentStepForm />}</FadeAnimation>
    </Suspense>
  );
}
