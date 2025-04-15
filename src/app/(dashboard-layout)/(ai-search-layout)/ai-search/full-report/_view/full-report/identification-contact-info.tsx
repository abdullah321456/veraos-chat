import { BlueLocationIcon } from "@/components/atom/icons/ai-search/blue-location";
import cn from "@/lib/utils/cn";
import { useState } from "react";
import { PiEnvelope, PiPhone } from "react-icons/pi";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";

type IdentificationAndContactProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function IdentificationAndContact({
  isEditable = false,
  isDrawer,
}: IdentificationAndContactProps) {
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
      title="Identification and Contact Information"
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
          isDrawer ? "grid gap-4 mt-3" : "grid grid-cols-4 gap-4 mt-3"
        )}>
        <InputArrayDataCell
          entryPrefix={<PiPhone className="text-primary min-w-4 h-4" />}
          label="Verified Cell Phone Numbers"
          editable={editable}
          onDone={(value) => console.log("phone-numbers", value)}
          values={["(555) 123-4567", "(555) 987-6543"]}
        />
        <InputArrayDataCell
          entryPrefix={<PiEnvelope className="text-primary min-w-4 h-4" />}
          label="Email Addresses"
          editable={editable}
          onDone={(value) => console.log("email", value)}
          values={["john.smith@example.com", "j.smith123@domain.com"]}
        />
        <InputArrayDataCell
          entryPrefix={<BlueLocationIcon className="min-w-4 h-4" />}
          label="Full Residential Address"
          editable={editable}
          onDone={(value) => console.log("full-residential-address", value)}
          values={["1234 Elm Street, Springfield, IL, 62704"]}
        />
        <InputArrayDataCell
          entryPrefix={<BlueLocationIcon className="min-w-4 h-4" />}
          label="Address History"
          editable={editable}
          onDone={(value) => console.log("address-history", value)}
          values={[
            "1234 Elm Street, Springfield, IL, 62704",
            "5678 Oak Avenue, Chicago, IL, 60601",
            "9101 Maple Drive, Naperville, IL, 60540",
          ]}
        />
      </div>
    </Accordion>
  );
}
