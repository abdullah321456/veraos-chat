'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { FullReport } from './_view/full-report';

export default function AiSearchPage() {
  return (
    <FadeAnimation>
      <div className="ml-0 sm:ml-[30px]">
        <FullReport />
      </div>
    </FadeAnimation>
  );
}
