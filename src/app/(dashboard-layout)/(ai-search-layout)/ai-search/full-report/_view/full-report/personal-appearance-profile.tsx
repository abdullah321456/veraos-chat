"use client";
import cn from "@/lib/utils/cn";
import {useState} from "react";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputArrayDataCell} from "../../../_components/input-array-data-cell";
import {InputDataCell} from "../../../_components/input-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "@/app/(dashboard-layout)/(ai-search-layout)/ai-search/_view/conversation/type";

type PersonalAppearanceProfileProps = {
    isEditable?: boolean;
    isDrawer?: boolean;
    details?: AIResponseDetail

};

export function PersonalAppearanceProfile({
                                              isEditable = false,
                                              isDrawer,
                                              details
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

    const hasMain = details?.HEIGHT || details?.WEIGHT || details?.HAIRCOLOR || details?.EYECOLOR;
    const hasScars = !!details?.ScarsMarks;
    const hasSkin = !!details?.SkinTone;
    const hasAny = hasMain || hasScars || hasSkin;

    if (!hasAny) return null;

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
            {hasMain && (
              <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")}> 
                  {details?.HEIGHT && (
                    <InputDataCell
                        label="Height"
                        value={details.HEIGHT}
                        editable={editable}
                        onDone={(value) => console.log("value", value)}
                    />
                  )}
                  {details?.WEIGHT && (
                    <InputDataCell
                        label="Weight"
                        value={details.WEIGHT}
                        editable={editable}
                        onDone={(value) => console.log("value", value)}
                    />
                  )}
                  {details?.HAIRCOLOR && (
                    <InputDataCell
                        label="Hair color"
                        value={details.HAIRCOLOR}
                        editable={editable}
                        onDone={(value) => console.log("value", value)}
                    />
                  )}
                  {details?.EYECOLOR && (
                    <InputDataCell
                        label="Eye color"
                        value={details.EYECOLOR}
                        editable={editable}
                        onDone={(value) => console.log("value", value)}
                    />
                  )}
              </div>
            )}
            {hasScars && (
              <div className={cn("grid gap-4", isDrawer ? "grid mt-3 gap-4" : "grid-cols-3 gap-4 mt-3")}> 
                  <InputArrayDataCell
                      label="Scars"
                      editable={editable}
                      onDone={(value) => console.log("value", value)}
                      values={details.ScarsMarks ? [details.ScarsMarks] : []}
                  />
              </div>
            )}
            {hasSkin && (
              <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")} style={{marginTop:"20px"}}>
                  <InputDataCell
                      label="Skin color"
                      value={details.SkinTone}
                      editable={editable}
                      onDone={(value) => console.log("value", value)}
                  />
              </div>
            )}
        </Accordion>
    );
}
