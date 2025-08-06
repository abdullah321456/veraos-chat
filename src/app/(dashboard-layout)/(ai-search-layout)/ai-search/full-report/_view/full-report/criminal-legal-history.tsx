"use client";
import cn from "@/lib/utils/cn";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputDataCell } from "../../../_components/input-data-cell";
import { Accordion } from "../../_components/accordion";

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  if (!str || str.trim() === '') return '';
  
  // First convert everything to lowercase, then capitalize first letter of each word
  return str
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase()) // Capitalize first letter of each word
    .replace(/\/([a-z])/g, (match, letter) => '/' + letter.toUpperCase()); // Capitalize letter after slash
};

// Utility function to format date from YYYY-MM-DD to readable format
const formatDate = (dateString: string): string => {
  if (!dateString || dateString.trim() === '') return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    return dateString; // Return original if parsing fails
  }
};

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
                  value={capitalizeWords(details.ArrestingAgency)}
                  editable={editable}
                />
              )}
              {details?.CASENUMBER && (
                <InputDataCell
                  label="Case Number"
                  value={capitalizeWords(details.CASENUMBER)}
                  editable={editable}
                />
              )}
              {details?.Category && (
                <InputDataCell
                  label="Category"
                  value={capitalizeWords(details.Category)}
                  editable={editable}
                />
              )}
              {details?.caseType && (
                <InputDataCell
                  label="Case Type"
                  value={capitalizeWords(details.caseType)}
                  editable={editable}
                />
              )}
              {details?.OFFENDERST && (
                <InputDataCell
                  label="Offender Status"
                  value={capitalizeWords(details.OFFENDERST)}
                  editable={editable}
                />
              )}
              {details?.CITY && (
                <InputDataCell
                  label="City"
                  value={capitalizeWords(details.CITY)}
                  editable={editable}
                />
              )}
              {details?.Court && (
                <InputDataCell
                  label="Court"
                  value={capitalizeWords(details.Court)}
                  editable={editable}
                />
              )}
              {details?.ChargesFiledDate && (
                <InputDataCell
                  label="Charges Filed Date"
                  value={capitalizeWords(details.ChargesFiledDate)}
                  editable={editable}
                />
              )}
              {details?.Counts && (
                <InputDataCell
                  label="Counts"
                  value={capitalizeWords(details.Counts)}
                  editable={editable}
                />
              )}
              {details?.OFFENDERCA && (
                <InputDataCell
                  label="Offender CA"
                  value={capitalizeWords(details.OFFENDERCA)}
                  editable={editable}
                />
              )}
              {details?.OFFENSECOD && (
                <InputDataCell
                  label="Offense Code"
                  value={capitalizeWords(details.OFFENSECOD)}
                  editable={editable}
                />
              )}
              {details?.OFFENSEDES && (
                <InputDataCell
                  label="Offense Description"
                  value={capitalizeWords(details.OFFENSEDES)}
                  editable={editable}
                />
              )}
              {details?.OffenseDesc2 && (
                <InputDataCell
                  label="Offense Description 2"
                  value={capitalizeWords(details.OffenseDesc2)}
                  editable={editable}
                />
              )}
              {details?.Plea && (
                <InputDataCell
                  label="Plea"
                  value={capitalizeWords(details.Plea)}
                  editable={editable}
                />
              )}
              {details?.Disposition && (
                <InputDataCell
                  label="Disposition"
                  value={capitalizeWords(details.Disposition)}
                  editable={editable}
                />
              )}
              {details?.DispositionDate && (
                <InputDataCell
                  label="Disposition Date"
                  value={capitalizeWords(details.DispositionDate)}
                  editable={editable}
                />
              )}
              {details?.SentenceYYYMMDDD && (
                <InputDataCell
                  label="Sentence Date"
                  value={capitalizeWords(details.SentenceYYYMMDDD)}
                  editable={editable}
                />
              )}
              {details?.ProbationYYYMMDDD && (
                <InputDataCell
                  label="Probation Date"
                  value={capitalizeWords(details.ProbationYYYMMDDD)}
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
                  value={capitalizeWords(details.sourceState)}
                  editable={editable}
                />
              )}
              {details?.CASENUMBER && (
                <InputDataCell
                  label="Case Number"
                  value={capitalizeWords(details.CASENUMBER)}
                  editable={editable}
                />
              )}
              {details?.caseType && (
                <InputDataCell
                  label="Case Type"
                  value={capitalizeWords(details.caseType)}
                  editable={editable}
                />
              )}
              {details?.CONV_PLACE && (
                <InputDataCell
                  label="Conviction Place"
                  value={capitalizeWords(details.CONV_PLACE)}
                  editable={editable}
                />
              )}
              {details?.CONVICTION && (
                <InputDataCell
                  label="Conviction"
                  value={capitalizeWords(details.CONVICTION)}
                  editable={editable}
                />
              )}
              {details?.Court && (
                <InputDataCell
                  label="Court"
                  value={capitalizeWords(details.Court)}
                  editable={editable}
                />
              )}
              {details?.OFFENDERCA && (
                <InputDataCell
                  label="Offender CA"
                  value={capitalizeWords(details.OFFENDERCA)}
                  editable={editable}
                />
              )}
              {details?.OFFENDERST && (
                <InputDataCell
                  label="Offender Status"
                  value={capitalizeWords(details.OFFENDERST)}
                  editable={editable}
                />
              )}
              {details?.OFFENSECOD && (
                <InputDataCell
                  label="Offense Code"
                  value={capitalizeWords(details.OFFENSECOD)}
                  editable={editable}
                />
              )}
              {details?.OFFENSEDES && (
                <InputDataCell
                  label="Offense Description"
                  value={capitalizeWords(details.OFFENSEDES)}
                  editable={editable}
                />
              )}
              {details?.OffenseDesc2 && (
                <InputDataCell
                  label="Offense Description 2"
                  value={capitalizeWords(details.OffenseDesc2)}
                  editable={editable}
                />
              )}
              {details?.Plea && (
                <InputDataCell
                  label="Plea"
                  value={capitalizeWords(details.Plea)}
                  editable={editable}
                />
              )}
              {details?.Disposition && (
                <InputDataCell
                  label="Disposition"
                  value={capitalizeWords(details.Disposition)}
                  editable={editable}
                />
              )}
              {details?.SentenceYYYMMDDD && (
                <InputDataCell
                  label="Sentence Date"
                  value={capitalizeWords(details.SentenceYYYMMDDD)}
                  editable={editable}
                />
              )}
              {details?.ProbationYYYMMDDD && (
                <InputDataCell
                  label="Probation Date"
                  value={capitalizeWords(details.ProbationYYYMMDDD)}
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
              value={capitalizeWords("No Flags")}
              editable={editable}
            />
            <InputDataCell
              label="Gang Affiliation"
              value={capitalizeWords("No known gang affiliation")}
              editable={editable}
            />
            <InputDataCell
              label="Terrorist Organization Information"
              value={capitalizeWords("No known links to terrorist groups")}
              editable={editable}
            />
            {details?.CONVICTION && (
              <InputDataCell
                label="DUI Information"
                value={`One DUI Conviction On ${formatDate(details?.CONVICTION)}`}
                editable={editable}
              />
            )}
            <InputDataCell
              label="Sanctioned Information"
              value={capitalizeWords("Not on any sanction list")}
              editable={editable}
            />
            {details?.OFFENSECOD && (
              <InputDataCell
                label="Court Records"
                value={capitalizeWords(details?.OFFENSECOD)}
                editable={editable}
              />
            )}
            <InputDataCell
              label="Sex Offender Registry"
              value={capitalizeWords("Sex Offender Record Found")}
              editable={editable}
            />
            {details?.OFFENDERST && (
              <InputDataCell
                label="Sex Offender Details"
                value={capitalizeWords(details?.OFFENDERST)}
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
            value={capitalizeWords("No criminal or sex offender records found.")}
            editable={editable}
          />
        )}
      </div>
    </Accordion>
  );
}



