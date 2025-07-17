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
  details?: any;
};

export function DeviceInfo({ isEditable = false, isDrawer, details }: DeviceInfoProps) {
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

  // Only show voip->CARRIER and voip->TYPE if they exist
  const carrier = details?.voip?.CARRIER;
  const type = details?.voip?.TYPE;

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
      <div className={cn(isDrawer ? "grid mt-3 gap-3" : "grid grid-cols-3 gap-3")}> 
        {carrier && (
          <InputArrayDataCell
            label="Carrier"
            editable={editable}
            onDone={(value) => console.log("carrier", value)}
            values={[carrier]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
        )}
        {type && (
          <InputArrayDataCell
            label="Type"
            editable={editable}
            onDone={(value) => console.log("type", value)}
            values={[type]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
        )}
      </div>
    </Accordion>
  );
}
