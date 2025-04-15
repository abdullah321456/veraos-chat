'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { FullReport } from './_view/full-report';

export default function AiSearchPage() {
  return (
    <FadeAnimation>
      <div className="flex gap-4">
        <FullReport />
      </div>
    </FadeAnimation>
  );
}
