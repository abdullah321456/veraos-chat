import { FadeAnimation } from "@/components/atom/fade-animatation";
import { AuthLogo } from "../_components/auth-logo";
import { AuthPageHeader } from "../_components/auth-page-header";
import { InviteSignupForm } from "./form";

export default function InviteSignupPage() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader
        title="Enter Invite Code to Register"
        subtitle="If you have an invite code, enter it below to create your account."
      />
      <InviteSignupForm />
    </FadeAnimation>
  );
}
