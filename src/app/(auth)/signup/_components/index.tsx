import { CustomSvgElement } from '@/types';
import { SIGNUP_STEPS, SignupStepParamsStepType } from '../constants';

function AccountAndOrganizationInfo({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.783 3.42 3.688 2.019a1.452 1.452 0 0 0-1.175.328A1.51 1.51 0 0 0 2 3.47v17.69c0 .461.372.839.828.839h2.69v-4.408c0-.814.645-1.469 1.448-1.469h2.068c.803 0 1.449.655 1.449 1.47V22H14V4.873c0-.722-.513-1.335-1.217-1.452ZM6.552 14.235H5.31a.625.625 0 0 1-.62-.63c0-.347.278-.63.62-.63h1.242c.342 0 .62.283.62.63 0 .348-.278.63-.62.63Zm0-2.519H5.31a.625.625 0 0 1-.62-.63c0-.347.278-.629.62-.629h1.242c.342 0 .62.282.62.63 0 .347-.278.63-.62.63Zm0-2.518H5.31a.625.625 0 0 1-.62-.63c0-.348.278-.63.62-.63h1.242c.342 0 .62.282.62.63 0 .348-.278.63-.62.63Zm0-2.519H5.31a.625.625 0 0 1-.62-.63c0-.347.278-.63.62-.63h1.242c.342 0 .62.283.62.63 0 .348-.278.63-.62.63Zm4.138 7.556H9.448a.625.625 0 0 1-.62-.63c0-.347.278-.63.62-.63h1.242c.342 0 .62.283.62.63 0 .348-.278.63-.62.63Zm0-2.519H9.448a.625.625 0 0 1-.62-.63c0-.347.278-.629.62-.629h1.242c.342 0 .62.282.62.63 0 .347-.278.63-.62.63Zm0-2.518H9.448a.625.625 0 0 1-.62-.63c0-.348.278-.63.62-.63h1.242c.342 0 .62.282.62.63 0 .348-.278.63-.62.63Zm0-2.519H9.448a.625.625 0 0 1-.62-.63c0-.347.278-.63.62-.63h1.242c.342 0 .62.283.62.63 0 .348-.278.63-.62.63Zm10.173 4.542L15 10v12h5.559A1.44 1.44 0 0 0 22 20.567v-7.945c0-.677-.464-1.252-1.137-1.4Zm-1.951 8.322h-1.235a.616.616 0 0 1-.618-.615c0-.339.276-.614.617-.614h1.236a.615.615 0 1 1 0 1.228Zm0-2.458h-1.235a.616.616 0 0 1-.618-.614c0-.34.276-.615.617-.615h1.236a.615.615 0 1 1 0 1.229Zm0-2.458h-1.235a.616.616 0 0 1-.618-.614c0-.339.276-.614.617-.614h1.236a.615.615 0 1 1 0 1.228Z"
      />
    </svg>
  );
}

function DataAccessNeedsAndUseCases({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        fill="currentColor"
        d="m19.18 7.132-4.206-4.306c-.513-.513-1.23-.82-2.05-.82H6.871C5.333 1.903 4 3.236 4 4.774v14.355A2.866 2.866 0 0 0 6.872 22h10.256A2.866 2.866 0 0 0 20 19.129V9.081c0-.718-.308-1.436-.82-1.949ZM8.923 10.106H12c.41 0 .82.308.82.82 0 .513-.307.82-.82.82H8.923a.809.809 0 0 1-.82-.82c0-.512.41-.82.82-.82Zm6.154 5.742H8.923a.809.809 0 0 1-.82-.82c0-.513.307-.82.82-.82h6.154c.41 0 .82.307.82.82 0 .512-.41.82-.82.82Z"
      />
    </svg>
  );
}
function FinalSubmission({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M18.438 2.917h-.688v1.375a1.833 1.833 0 0 1-1.833 1.833H8.125a1.833 1.833 0 0 1-1.833-1.833V2.917h-.688A1.613 1.613 0 0 0 4 4.52v15.583a1.613 1.613 0 0 0 1.604 1.604h12.834a1.614 1.614 0 0 0 1.604-1.604V4.521a1.613 1.613 0 0 0-1.605-1.604Zm-3.163 9.166-3.438 3.667a.715.715 0 0 1-.504.21.669.669 0 0 1-.458-.173l-2.063-1.834a.669.669 0 0 1-.054-.962.697.697 0 0 1 .971-.128l1.559 1.393 2.979-3.163a.688.688 0 0 1 .971 0 .687.687 0 0 1 .037.944v.046Z"
      />
      <path
        fill="currentColor"
        d="M15.688 2H8.354c-.633 0-1.146.513-1.146 1.146v.917c0 .632.513 1.145 1.146 1.145h7.334c.632 0 1.145-.513 1.145-1.146v-.916c0-.633-.513-1.146-1.145-1.146Z"
      />
    </svg>
  );
}

export function TickIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <path stroke="#5C39D9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export const SIGNUP_STEP_ICONS: Record<SignupStepParamsStepType, CustomSvgElement> = {
  [SIGNUP_STEPS.ACCOUNT_AND_ORGANIZATION_INFO]: AccountAndOrganizationInfo,
  [SIGNUP_STEPS.DATA_ACCESS_NEEDS_AND_USE_CASES]: DataAccessNeedsAndUseCases,
  [SIGNUP_STEPS.FINAL_SUBMISSION]: FinalSubmission,
} as const;
