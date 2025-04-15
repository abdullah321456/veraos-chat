import { ValueOf } from 'type-fest';

export const SIGNUP_STEPS = {
  ACCOUNT_AND_ORGANIZATION_INFO: 'account_and_organization_info',
  DATA_ACCESS_NEEDS_AND_USE_CASES: 'data_access_needs_and_use_cases',
  FINAL_SUBMISSION: 'final_submission',
} as const;

export type SignupStepParamsStepType = ValueOf<typeof SIGNUP_STEPS> ;
export type SignupStepParamsDoneType = 'true' | 'false';



