import { FadeAnimation } from '@/components/atom/fade-animatation';
import { FullReport } from '../full-report/_view/full-report';

export default function AiSearchPage() {
  return (
    <FadeAnimation>
      <div className="flex gap-4">
        <FullReport editable />
      </div>
    </FadeAnimation>
  );
}
