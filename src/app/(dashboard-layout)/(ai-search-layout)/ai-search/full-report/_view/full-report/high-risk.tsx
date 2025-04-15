"use client";
import cn from "@/lib/utils/cn";
import { useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";
type HighRiskProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function HighRisk({ isEditable = false, isDrawer }: HighRiskProps) {
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
      title="High-Risk Indicators"
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
          label="Presence on Pornographic Sites"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "No evidence found linking the individual to adult content websites.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          bullet
          label="Presence on Gambling Sites"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Linked to multiple visits on known online gambling sites, including Bet365 and PokerStars.",
            "Participates in online sports betting during major sporting events.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          bullet
          label="Other High-Risk Online Activity"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Suspicious activity detected in the form of frequent visits to websites flagged for phishing and scam involvement.",
            "Involvement in cryptocurrency trading on platforms with questionable reputation, but no direct evidence of fraud.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
      </div>
    </Accordion>
  );
}
