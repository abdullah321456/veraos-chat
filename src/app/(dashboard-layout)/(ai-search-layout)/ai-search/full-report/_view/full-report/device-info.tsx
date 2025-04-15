"use client";
import cn from "@/lib/utils/cn";
import { useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";
type DeviceInfoProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function DeviceInfo({ isEditable = false, isDrawer }: DeviceInfoProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  const actionButtonMode = isLocalEdit && !editable ? "edit" : "save";

  function handleActionButtonClick() {
    if (actionButtonMode !== "save") {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success("Successfully saved");
    }
  }
  return (
    <Accordion
      translateButton={isEditable}
      title="Device Information"
      {...(isLocalEdit && {
        actionButton: (
          <AccordionActionButton
            setEditable={setEditable}
            mode={actionButtonMode}
            onClick={handleActionButtonClick}
          />
        ),
      })}>
      <div
        className={cn(isDrawer ? "grid mt-3 gap-3" : "grid grid-cols-3 gap-3")}>
        <InputArrayDataCell
          label="UDID (Unique Device Identifier)"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "iPhone 14 Pro (UDID: 00008110-001D3E2E0222001E)",
            "iPad Air 4th Gen (UDID: 00008020-00154F222C9003F2)",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          label="Device Types"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Mobile Phone: iPhone 14 Pro (Primary device)",
            "Tablet: iPad Air 4th Generation",
            "Laptop: MacBook Pro (2021)",
            "Smartwatch: Apple Watch Series 8",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          label="Device Usage History"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "iPhone 14 Pro: Daily usage for calls, emails, social media (Facebook, Instagram), and productivity apps (Slack, Microsoft Teams).",
            "iPad Air: Used primarily for reading, browsing, and light work tasks.",
            "MacBook Pro: Heavy usage for professional work, including design, presentations, and video calls.",
            "Apple Watch: Used for fitness tracking, notifications, and quick calls/texts.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
      </div>
    </Accordion>
  );
}
