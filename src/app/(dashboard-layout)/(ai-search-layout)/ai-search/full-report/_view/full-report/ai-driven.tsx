"use client";
import cn from "@/lib/utils/cn";
import { useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";
type AiDrivenProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};
export function AiDriven({ isEditable = false, isDrawer }: AiDrivenProps) {
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
      title="AI-Driven Risk Insights"
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
        className={cn(
          isDrawer ? "grid  gap-3" : "grid grid-cols-2  gap-3"
        )}>
        <InputArrayDataCell
          bullet
          label="Behavioral Analytics"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Recent financial transactions indicate a 50% increase in high-risk spending, particularly related to online gambling platforms such as CraftKings and FanDuel.",
            "Social media analysis reveals a pattern of engagement in polarizing political discussions, with a significant uptick in posts related to controversial topics.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          bullet
          label="Predictive Analysis"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Financial Distress Likelihood: The analysis shows a 70% probability of experiencing financial distress within the next 12 months, particularly due to increased credit card debt exceeding $15,000.",
            "Criminal Activity Probability: There is a 15% risk of potential criminal activity based on current associations with individuals previously flagged for petty theft and drug-related offenses.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          bullet
          label="Sentiment Analysis"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Public Sentiment: Analysis of public communications on Twitter and Facebook shows a predominantly negative sentiment (approximately 65% negative, 30% neutral, 5% positive) related to discussions about government policies and social justice issues.",
            "Professional Sentiment: On LinkedIn, the individual has received positive feedback from colleagues, reflecting a positive sentiment in professional interactions, with comments highlighting team leadership and project success.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
        <InputArrayDataCell
          bullet
          label="Flagging Inconsistencies"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Multiple Conflicting Addresses: Records show addresses in Brooklyn, NY (previous) and Chicago, IL (current), with overlapping residency periods raising flags for potential identity fraud.",
            "Criminal Records and Financial Issues Link: Analysis reveals a connection between unresolved judgments totaling $12,000 for unpaid debts and criminal activity involving theft reported in the past year.",
            "Inconsistent Personal Data: A discrepancy between the birth date listed in government identification (January 15, 1985) and that found on social media profiles (January 12, 1985) raises a flag for potential identity misrepresentation.",
          ]}
          rowClassName="bg-transparent px-0 py-0"
          rowWrapperClassName="space-y-1.5"
          rowTextClassName="font-medium"
        />
      </div>
    </Accordion>
  );
}
