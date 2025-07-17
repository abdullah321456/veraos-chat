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
                    value={details?.HEIGHT}
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Weight"
                    value={details?.WEIGHT}
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Hair color"
                    value={details?.HAIRCOLOR}
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Eye color"
                    value={details?.EYECOLOR}
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
            </div>
            <div className={cn("grid gap-4", isDrawer ? "grid mt-3 gap-4" : "grid-cols-3 gap-4 mt-3")}>
                <InputArrayDataCell
                    label="Tattoos"
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                    values={[]}
                />
                <InputArrayDataCell
                    label="Scars"
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                    values={details?.ScarsMarks?[details?.ScarsMarks]:[]}
                />
                <InputArrayDataCell
                    label="Birthmark"
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                    values={[]}
                />
            </div>
            <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")} style={{marginTop:"20px"}}>
                <InputDataCell
                    label="Hairstyle"
                    value=""
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Piercing"
                    value=""
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Skin color"
                    value={details?.SkinTone}
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell
                    label="Ethnicity"
                    value=""
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
            </div>
        </Accordion>
    );
}
