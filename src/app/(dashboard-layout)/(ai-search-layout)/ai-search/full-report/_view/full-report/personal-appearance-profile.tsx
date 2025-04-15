"use client";
import cn from "@/lib/utils/cn";
import { useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { InputDataCell } from "../../../_components/input-data-cell";
import { Accordion } from "../../_components/accordion";

type PersonalAppearanceProfileProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function PersonalAppearanceProfile({
  isEditable = false,
  isDrawer
}: PersonalAppearanceProfileProps) {
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
      title="Personal Appearance Profile"
      {...(isLocalEdit && {
        actionButton: (
          <AccordionActionButton
            setEditable={setEditable}
            mode={actionButtonMode}
            onClick={handleActionButtonClick}
          />
        ),
      })}>
      <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")}>
        <InputDataCell
          label="Height"
          value="5.0"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Weight"
          value="200"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Hair color"
          value="Brown"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Eye color"
          value="Blue"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
      </div>
      <div className={cn("grid gap-4", isDrawer ? "grid mt-3 gap-4" : "grid-cols-3 gap-4 mt-3")}>
        <InputArrayDataCell
          label="Tattoos"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={["Chain tattoo on right hand.", "Tattoo on right palm."]}
        />
        <InputArrayDataCell
          label="Scars"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={["Scars on face"]}
        />
        <InputArrayDataCell
          label="Birthmark"
          editable={editable}
          onDone={(value) => console.log("value", value)}
          values={[
            "Birthmark on the left side of the nose on the face.",
            "Mole above and below the right ear.",
          ]}
        />
      </div>
      <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")}>
        <InputDataCell
          label="Hairstyle"
          value="Short and wavy"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Piercing"
          value="Both ears"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Skin color"
          value="Light tan"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
        <InputDataCell
          label="Ethnicity"
          value="Caucasian"
          editable={editable}
          onDone={(value) => console.log("value", value)}
        />
      </div>
    </Accordion>
  );
}
