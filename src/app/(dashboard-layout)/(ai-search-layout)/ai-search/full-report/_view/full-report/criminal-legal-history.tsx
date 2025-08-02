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
        
        {/* National Criminal Records Subsection */}
        {(details?.ArrestingAgency || details?.CASENUMBER || details?.Category || details?.caseType || 
          details?.OFFENDERST || details?.CITY || details?.Court || details?.ChargesFiledDate || 
          details?.Counts || details?.OFFENDERCA || details?.OFFENSECOD || details?.OFFENSEDES || 
          details?.OffenseDesc2 || details?.Plea || details?.Disposition || details?.DispositionDate || 
          details?.SentenceYYYMMDDD || details?.ProbationYYYMMDDD) && (
          <div className="mb-4">
            <h5 className="text-sm font-medium mb-2 text-gray-600 border-b pb-1">National Criminal Records</h5>
            <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
              {details?.ArrestingAgency && (
                <InputDataCell
                  label="Arresting Agency"
                  value={details.ArrestingAgency}
                  editable={editable}
                />
              )}
              {details?.CASENUMBER && (
                <InputDataCell
                  label="Case Number"
                  value={details.CASENUMBER}
                  editable={editable}
                />
              )}
              {details?.Category && (
                <InputDataCell
                  label="Category"
                  value={details.Category}
                  editable={editable}
                />
              )}
              {details?.caseType && (
                <InputDataCell
                  label="Case Type"
                  value={details.caseType}
                  editable={editable}
                />
              )}
              {details?.OFFENDERST && (
                <InputDataCell
                  label="Offender Status"
                  value={details.OFFENDERST}
                  editable={editable}
                />
              )}
              {details?.CITY && (
                <InputDataCell
                  label="City"
                  value={details.CITY}
                  editable={editable}
                />
              )}
              {details?.Court && (
                <InputDataCell
                  label="Court"
                  value={details.Court}
                  editable={editable}
                />
              )}
              {details?.ChargesFiledDate && (
                <InputDataCell
                  label="Charges Filed Date"
                  value={details.ChargesFiledDate}
                  editable={editable}
                />
              )}
              {details?.Counts && (
                <InputDataCell
                  label="Counts"
                  value={details.Counts}
                  editable={editable}
                />
              )}
              {details?.OFFENDERCA && (
                <InputDataCell
                  label="Offender CA"
                  value={details.OFFENDERCA}
                  editable={editable}
                />
              )}
              {details?.OFFENSECOD && (
                <InputDataCell
                  label="Offense Code"
                  value={details.OFFENSECOD}
                  editable={editable}
                />
              )}
              {details?.OFFENSEDES && (
                <InputDataCell
                  label="Offense Description"
                  value={details.OFFENSEDES}
                  editable={editable}
                />
              )}
              {details?.OffenseDesc2 && (
                <InputDataCell
                  label="Offense Description 2"
                  value={details.OffenseDesc2}
                  editable={editable}
                />
              )}
              {details?.Plea && (
                <InputDataCell
                  label="Plea"
                  value={details.Plea}
                  editable={editable}
                />
              )}
              {details?.Disposition && (
                <InputDataCell
                  label="Disposition"
                  value={details.Disposition}
                  editable={editable}
                />
              )}
              {details?.DispositionDate && (
                <InputDataCell
                  label="Disposition Date"
                  value={details.DispositionDate}
                  editable={editable}
                />
              )}
              {details?.SentenceYYYMMDDD && (
                <InputDataCell
                  label="Sentence Date"
                  value={details.SentenceYYYMMDDD}
                  editable={editable}
                />
              )}
              {details?.ProbationYYYMMDDD && (
                <InputDataCell
                  label="Probation Date"
                  value={details.ProbationYYYMMDDD}
                  editable={editable}
                />
              )}
            </div>
          </div>
        )}

        {/* Sex Offender Records Subsection */}
        {(details?.sourceState || details?.CASENUMBER || details?.caseType || details?.CONV_PLACE || 
          details?.CONVICTION || details?.Court || details?.OFFENDERCA || details?.OFFENDERST || 
          details?.OFFENSECOD || details?.OFFENSEDES || details?.OffenseDesc2 || details?.Plea || 
          details?.Disposition || details?.SentenceYYYMMDDD || details?.ProbationYYYMMDDD || 
          criminalTypeLabel === "Sex Offender") && (
          <div className="mb-4">
            <h5 className="text-sm font-medium mb-2 text-gray-600 border-b pb-1">Sex Offender Records</h5>
            <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
              {details?.sourceState && (
                <InputDataCell
                  label="Source State"
                  value={details.sourceState}
                  editable={editable}
                />
              )}
              {details?.CASENUMBER && (
                <InputDataCell
                  label="Case Number"
                  value={details.CASENUMBER}
                  editable={editable}
                />
              )}
              {details?.caseType && (
                <InputDataCell
                  label="Case Type"
                  value={details.caseType}
                  editable={editable}
                />
              )}
              {details?.CONV_PLACE && (
                <InputDataCell
                  label="Conviction Place"
                  value={details.CONV_PLACE}
                  editable={editable}
                />
              )}
              {details?.CONVICTION && (
                <InputDataCell
                  label="Conviction"
                  value={details.CONVICTION}
                  editable={editable}
                />
              )}
              {details?.Court && (
                <InputDataCell
                  label="Court"
                  value={details.Court}
                  editable={editable}
                />
              )}
              {details?.OFFENDERCA && (
                <InputDataCell
                  label="Offender CA"
                  value={details.OFFENDERCA}
                  editable={editable}
                />
              )}
              {details?.OFFENDERST && (
                <InputDataCell
                  label="Offender Status"
                  value={details.OFFENDERST}
                  editable={editable}
                />
              )}
              {details?.OFFENSECOD && (
                <InputDataCell
                  label="Offense Code"
                  value={details.OFFENSECOD}
                  editable={editable}
                />
              )}
              {details?.OFFENSEDES && (
                <InputDataCell
                  label="Offense Description"
                  value={details.OFFENSEDES}
                  editable={editable}
                />
              )}
              {details?.OffenseDesc2 && (
                <InputDataCell
                  label="Offense Description 2"
                  value={details.OffenseDesc2}
                  editable={editable}
                />
              )}
              {details?.Plea && (
                <InputDataCell
                  label="Plea"
                  value={details.Plea}
                  editable={editable}
                />
              )}
              {details?.Disposition && (
                <InputDataCell
                  label="Disposition"
                  value={details.Disposition}
                  editable={editable}
                />
              )}
              {details?.SentenceYYYMMDDD && (
                <InputDataCell
                  label="Sentence Date"
                  value={details.SentenceYYYMMDDD}
                  editable={editable}
                />
              )}
              {details?.ProbationYYYMMDDD && (
                <InputDataCell
                  label="Probation Date"
                  value={details.ProbationYYYMMDDD}
                  editable={editable}
                />
              )}
            </div>
          </div>
        )}

        {/* Supplemental Subsection */}
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2 text-gray-600 border-b pb-1">Supplemental</h5>
          <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
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
          </div>
        </div>

        {showCriminal && (
          <>
            {/* Criminal Records and Arrest Records removed */}
          </>
        )}
        {showSexOffender && (
          <>
            {/* Sex offender fields moved to Supplemental section above */}
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



