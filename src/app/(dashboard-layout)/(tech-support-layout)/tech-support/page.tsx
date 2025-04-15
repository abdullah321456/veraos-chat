import { FadeAnimation } from "@/components/atom/fade-animatation";
import { FeatureRequest } from "./_components/feature-request";
import { LiveChat } from "./_components/live-chat";
import { SubmitTicket } from "./_components/submit-ticket";
import { YourTicket } from "./_components/your-ticket";
// todo chat 
export default function Page() {
  return (
    <FadeAnimation>
      <div className=" mx-auto  flex  justify-center gap-[18px]">
        <SubmitTicket />
        <div className="grid gap-[18px]">
          <YourTicket />
          <FeatureRequest />
          <LiveChat />
        </div>
      </div>
    </FadeAnimation>
  );
}
