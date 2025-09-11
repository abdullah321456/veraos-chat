'use client';

import { FadeAnimation } from "@/components/atom/fade-animatation";
import { TabView } from "./_view/tab-view";
import { useUser } from "@/lib/hooks/use-user";
import { useEffect } from "react";

export default function Page() {

  return (
    <FadeAnimation>
      <TabView />
    </FadeAnimation>
  );
}
