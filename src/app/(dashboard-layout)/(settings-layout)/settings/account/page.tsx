import { FadeAnimation } from "@/components/atom/fade-animatation";
import { TabView } from "./_view/tab-view";

export default function Page() {
  return (
    <FadeAnimation>
      <TabView />
    </FadeAnimation>
  );
}
