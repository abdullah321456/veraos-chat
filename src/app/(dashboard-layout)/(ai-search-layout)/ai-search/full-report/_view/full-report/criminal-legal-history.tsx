"use client";
import cn from "@/lib/utils/cn";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputDataCell } from "../../../_components/input-data-cell";
import { Accordion } from "../../_components/accordion";
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

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
  const { isDarkMode } = useDarkMode();
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


  let selectedDetails=JSON.parse(JSON.stringify(details));
  if(details && details._index!=='criminals' && details._index!=='criminals_small' && details.criminals && details.criminals.length>0){
    selectedDetails=JSON.parse(JSON.stringify(details.criminals[0]));
    selectedDetails._index="criminals";
  }

  const showCriminal = selectedDetails?._index === 'criminals' || selectedDetails?._index === 'criminals_small';
  const showSexOffender = selectedDetails && selectedDetails.OFFENDERCA === 'SEX OFFENDER';
  const isVets = selectedDetails?._index === 'vets' && selectedDetails?.VETERAN==='Y';
  const isDrunkDriving = selectedDetails?._index === 'drunk-drivings' && selectedDetails?.ACCIDENTS==='Y';

  const criminalTypeLabel=showSexOffender?"Sex Offender":"Criminal"


  console.log("isDrunkDriving = ",selectedDetails)

  return (


      (showCriminal || showSexOffender || isVets || isDrunkDriving) &&
      <Accordion
          translateButton={isEditable}
          title={(showCriminal || showSexOffender || isVets || isDrunkDriving) && "Criminal and Legal History"}
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

          {/* National Criminal Records Subsection - Only show for criminals */}
          {showCriminal && !showSexOffender && (selectedDetails?.Category || selectedDetails?.ChargesFiledDate || selectedDetails?.Court || selectedDetails?.Disposition ||
              selectedDetails?.DispositionDate || selectedDetails?.OFFENDERCA || selectedDetails?.OFFENSEDES || selectedDetails?.SentenceYYYMMDDD) && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 border-b pb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined }}>National Criminal Records</h5>
                <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
                  {selectedDetails?.Category && (
                      <InputDataCell
                          label="Criminal Case Type"
                          value={capitalizeWords(selectedDetails.Category)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.CASENUMBER && (
                      <InputDataCell
                          label="Case Number"
                          value={capitalizeWords(selectedDetails.CASENUMBER)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.DATE_OF_ARREST && (
                      <InputDataCell
                          label="Date of Arrest"
                          value={formatDate(selectedDetails.DATE_OF_ARREST)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.ArrestingAgency && (
                      <InputDataCell
                          label="Arresting Agency"
                          value={capitalizeWords(selectedDetails.ArrestingAgency)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.ChargesFiledDate && (
                      <InputDataCell
                          label="Charges Filed Date"
                          value={formatDate(selectedDetails.ChargesFiledDate)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.Court && (
                      <InputDataCell
                          label="Court"
                          value={capitalizeWords(selectedDetails.Court)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.Disposition && (
                      <InputDataCell
                          label="Disposition"
                          value={capitalizeWords(selectedDetails.Disposition)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.DispositionDate && (
                      <InputDataCell
                          label="Disposition Date"
                          value={formatDate(selectedDetails.DispositionDate)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENDERCA && (
                      <InputDataCell
                          label="Jurisdiction"
                          value={capitalizeWords(selectedDetails.OFFENDERCA)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENSEDES && (
                      <InputDataCell
                          label="Offense"
                          value={capitalizeWords(selectedDetails.OFFENSEDES)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.SentenceYYYMMDDD && (
                      <InputDataCell
                          label="Sentence Date"
                          value={formatDate(selectedDetails.SentenceYYYMMDDD)}
                          editable={editable}
                      />
                  )}
                </div>
              </div>
          )}

          {/* Sex Offender Records Subsection */}
          {showSexOffender && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 border-b pb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined }}>Sex Offender Records</h5>
                <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
                  {selectedDetails?.sourceState && (
                      <InputDataCell
                          label="Source State"
                          value={capitalizeWords(selectedDetails.sourceState)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.CASENUMBER && (
                      <InputDataCell
                          label="Case Number"
                          value={capitalizeWords(selectedDetails.CASENUMBER)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.caseType && (
                      <InputDataCell
                          label="Case Type"
                          value={capitalizeWords(selectedDetails.caseType)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.CONV_PLACE && (
                      <InputDataCell
                          label="Conviction Place"
                          value={capitalizeWords(selectedDetails.CONV_PLACE)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.CONVICTION && (
                      <InputDataCell
                          label="Conviction"
                          value={capitalizeWords(selectedDetails.CONVICTION)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.Court && (
                      <InputDataCell
                          label="Court"
                          value={capitalizeWords(selectedDetails.Court)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENDERCA && (
                      <InputDataCell
                          label="Offender CA"
                          value={capitalizeWords(selectedDetails.OFFENDERCA)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENDERST && (
                      <InputDataCell
                          label="Offender Status"
                          value={capitalizeWords(selectedDetails.OFFENDERST)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENSECOD && (
                      <InputDataCell
                          label="Offense Code"
                          value={capitalizeWords(selectedDetails.OFFENSECOD)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OFFENSEDES && (
                      <InputDataCell
                          label="Offense Description"
                          value={capitalizeWords(selectedDetails.OFFENSEDES)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.OffenseDesc2 && (
                      <InputDataCell
                          label="Offense Description 2"
                          value={capitalizeWords(selectedDetails.OffenseDesc2)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.Plea && (
                      <InputDataCell
                          label="Plea"
                          value={capitalizeWords(selectedDetails.Plea)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.Disposition && (
                      <InputDataCell
                          label="Disposition"
                          value={capitalizeWords(selectedDetails.Disposition)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.SentenceYYYMMDDD && (
                      <InputDataCell
                          label="Sentence Date"
                          value={capitalizeWords(selectedDetails.SentenceYYYMMDDD)}
                          editable={editable}
                      />
                  )}
                  {selectedDetails?.ProbationYYYMMDDD && (
                      <InputDataCell
                          label="Probation Date"
                          value={capitalizeWords(selectedDetails.ProbationYYYMMDDD)}
                          editable={editable}
                      />
                  )}
                </div>
              </div>
          )}

          {/* Drunk Driving Match Subsection */}
          {isDrunkDriving && (
              <div className="mb-4">
                <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-4")}>
                  <div 
                    className={cn("min-h-14 text-xs rounded-md px-2.5 py-1.5 border-dashed border-2 border-primary/0", isDarkMode ? "ring-[1px] ring-white/10" : "ring-[1px] ring-gray-200")}
                    style={{
                      background: isDarkMode ? '#404652' : undefined,
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined
                    }}
                  >
                    <div className="flex justify-between w-full mb-1.5 relative">
                      <p className="whitespace-nowrap" style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563' }}>Drunk Driving Match</p>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold font-bold" style={{ color: '#DC2626' }}>YES</p>
                    </div>
                  </div>
                  <InputDataCell
                      label="Source"
                      value="Reported by Insurance Company"
                      editable={editable}
                  />
                </div>
              </div>
          )}

          {/* Supplemental Subsection - Only show for veterans */}
          {isVets && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 border-b pb-1" style={{ color: isDarkMode ? '#FFFFFF' : '#4B5563', borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined }}>Supplemental</h5>
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
                  <InputDataCell
                      label="Sanctioned Information"
                      value={capitalizeWords("Not on any sanction list")}
                      editable={editable}
                  />
                  <InputDataCell
                      label="Do Not Fly List"
                      value={capitalizeWords("Not on Do Not Fly list")}
                      editable={editable}
                  />
                </div>
              </div>
          )}

        </div>
      </Accordion>


  );
}



