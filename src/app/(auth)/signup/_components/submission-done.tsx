import Link from 'next/link';
import { SubmissionDoneVerifiedIcon } from './icons';
import { ROUTES } from '@/config/routes';
import { FadeAnimation } from '@/components/atom/fade-animatation';

export function SubmissionDone() {
  return (
    <FadeAnimation>
      <div className="w-[590px] mx-auto text-center space-y-4 pt-6">
        <SubmissionDoneVerifiedIcon className="w-16 h-16 mx-auto" />
        <div className="space-y-2.5">
          <h3 className="text-lg font-bold">Account Submitted for Review.</h3>
          <p className="text-sm leading-6">
            Thank you! Your account request has been successfully submitted. Our team will review your details and notify you once approved.
          </p>
        </div>
        <div className="flex justify-center pt-6">
          <Link
            href={ROUTES.HOME}
            className="rounded-full px-8 py-3 bg-primary hover:bg-primary-dark duration-300 text-white font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </FadeAnimation>
  );
}
