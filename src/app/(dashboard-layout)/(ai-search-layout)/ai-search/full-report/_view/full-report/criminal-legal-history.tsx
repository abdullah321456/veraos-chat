"use client";
import cn from "@/lib/utils/cn";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputDataCell } from "../../../_components/input-data-cell";
import { Accordion } from "../../_components/accordion";

type CriminalAndLegalProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

export function CriminalAndLegal({
  isEditable = false,
  isDrawer,
}: CriminalAndLegalProps) {
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
      title="Criminal and Legal History"
      {...(isLocalEdit && {
        actionButton: (
          <AccordionActionButton
            mode={actionButtonMode}
            onClick={handleActionButtonClick}
            setEditable={function (value: SetStateAction<boolean>): void {
              throw new Error("Function not implemented.");
            }}
          />
        ),
      })}>
      <div
        className={cn(isDrawer ? "grid gap-3 mt-3" : "grid grid-cols-3 gap-4")}>
        <InputDataCell
          label="Criminal Records"
          value="No criminal record"
          editable={editable}
        />
        <InputDataCell
          label="Arrest Records"
          value="One arrest for public intoxication on March 15, 2021"
          editable={editable}
        />
        {isDrawer ? (
          <div className="grid grid-cols-2 gap-3 mt-3">
            <InputDataCell
              label="Sex Offender Registry"
              value="Not listed"
              editable={editable}
            />
            <InputDataCell
              label="Interpol Data"
              value="No Flags"
              editable={editable}
            />
            <InputDataCell
              label="Gang Affiliation"
              value="No known gang affiliation"
              editable={editable}
            />
            <InputDataCell
              label="Terrorist Organization Information"
              value="No known links to terrorist groups"
              editable={editable}
            />
          </div>
        ) : (
          <>
            <InputDataCell
              label="Sex Offender Registry"
              value="Not listed"
              editable={editable}
            />
            <InputDataCell
              label="Interpol Data"
              value="No Flags"
              editable={editable}
            />
            <InputDataCell
              label="Gang Affiliation"
              value="No known gang affiliation"
              editable={editable}
            />
            <InputDataCell
              label="Terrorist Organization Information"
              value="No known links to terrorist groups"
              editable={editable}
            />
          </>
        )}

        <InputDataCell
          label="Sex Offender Registry"
          value="Not listed"
          editable={editable}
        />
        <InputDataCell
          label="Interpol Data"
          value="No Flags"
          editable={editable}
        />
        <InputDataCell
          label="Gang Affiliation"
          value="No known gang affiliation"
          editable={editable}
        />
        <InputDataCell
          label="Terrorist Organization Information"
          value="No known links to terrorist groups "
          editable={editable}
        />
        <InputDataCell
          label="DUI Information"
          value="One DUI conviction on July 22, 2019"
          editable={editable}
        />
        <InputDataCell
          label="Sanctioned Information"
          value="Not on any sanction list"
          editable={editable}
        />
        <InputDataCell
          label="Court Records"
          value="Involved in a civil case for breach of contract on 
January 10, 2023"
          editable={editable}
        />
      </div>
    </Accordion>
  );
}
