'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AIResponseFullReport } from './_view/ai-response-full-report';

export default function AIResponseFullReportPage() {
  return (
    <FadeAnimation>
      <div className="flex gap-4">
        <AIResponseFullReport />
      </div>
    </FadeAnimation>
  );
}
