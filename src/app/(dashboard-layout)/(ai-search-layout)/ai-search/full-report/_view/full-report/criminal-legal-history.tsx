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
  details?: any; // Accept details for _index logic
};

export function CriminalAndLegal({
  isEditable = false,
  isDrawer,
  details,
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

  const showCriminal = details?._index === 'criminals' || details?._index === 'criminals_small';
  const showSexOffender = details?._index === 'criminals_small';
  const criminalTypeLabel=showSexOffender?"Sex Offender":"Criminal"

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
      <div className={cn(isDrawer ? "grid gap-3 mt-3" : "grid grid-cols-3 gap-4")}> 
        {showCriminal && (
          <>
            {criminalTypeLabel && (
              <InputDataCell
                label="Criminal Records"
                value={criminalTypeLabel}
                editable={editable}
              />
            )}
            {details?.OFFENSEDES && (
              <InputDataCell
                label="Arrest Records"
                value={details?.OFFENSEDES}
                editable={editable}
              />
            )}
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
            {details?.CONVICTION && (
              <InputDataCell
                label="DUI Information"
                value={`One DUI conviction on ${details?.CONVICTION}`}
                editable={editable}
              />
            )}
            <InputDataCell
              label="Sanctioned Information"
              value="Not on any sanction list"
              editable={editable}
            />
            {details?.OFFENSECOD && (
              <InputDataCell
                label="Court Records"
                value={details?.OFFENSECOD}
                editable={editable}
              />
            )}
          </>
        )}
        {showSexOffender && (
          <>
            <InputDataCell
              label="Sex Offender Registry"
              value="Sex Offender Record Found"
              editable={editable}
            />
            {details?.OFFENDERST && (
              <InputDataCell
                label="Sex Offender Details"
                value={details?.OFFENDERST}
                editable={editable}
              />
            )}
          </>
        )}
        {(!showCriminal && !showSexOffender) && (
          <InputDataCell
            label="Criminal and Legal History"
            value="No criminal or sex offender records found."
            editable={editable}
          />
        )}
      </div>
    </Accordion>
  );
}



