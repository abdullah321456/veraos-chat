"use client";
import cn from "@/lib/utils/cn";
import {useState} from "react";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputArrayDataCell} from "../../../_components/input-array-data-cell";
import {InputDataCell} from "../../../_components/input-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "@/app/(dashboard-layout)/(ai-search-layout)/ai-search/_view/conversation/type";

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
    if (!str || str.trim() === '') return '';

    return str
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

// Utility function to format height from "602" to "6'2"
const formatHeight = (height: string): string => {
    if (!height || height.trim() === '') return '';

    const cleanHeight = height.trim();

    // If it's already in feet'inches format, return as is
    if (cleanHeight.includes("'") || cleanHeight.includes("ft") || cleanHeight.includes("feet")) {
        return capitalizeWords(cleanHeight);
    }

    // If it's a 3-digit number like "602", convert to feet'inches
    if (/^\d{3}$/.test(cleanHeight)) {
        const feet = cleanHeight.charAt(0);
        const inches = parseInt(cleanHeight.substring(1)).toString();
        return `${feet}'${inches}`;
    }

    // If it's a 2-digit number, assume it's inches and convert
    if (/^\d{2}$/.test(cleanHeight)) {
        const feet = Math.floor(parseInt(cleanHeight) / 12);
        const inches = parseInt(cleanHeight) % 12;
        return `${feet}'${inches}`;
    }

    // For other formats, just capitalize
    return capitalizeWords(cleanHeight);
};

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

    const hasMain = details?.HEIGHT || details?.WEIGHT || details?.HAIRCOLOR || details?.EYECOLOR
        || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HEIGHT)
        || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].WEIGHT)
        || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HAIRCOLOR)
        || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].EYECOLOR);
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
                    {(details?.HEIGHT || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HEIGHT)) && (
                        <InputDataCell
                            label="Height"
                            value={formatHeight(details.HEIGHT ||
                                (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HEIGHT))}
                            editable={editable}
                            onDone={(value) => console.log("value", value)}
                        />
                    )}
                    {(details?.WEIGHT || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].WEIGHT)) && (
                        <InputDataCell
                            label="Weight"
                            value={capitalizeWords(details.WEIGHT ||
                                (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].WEIGHT))}
                            editable={editable}
                            onDone={(value) => console.log("value", value)}
                        />
                    )}
                    {(details?.HAIRCOLOR || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HAIRCOLOR)) && (
                        <InputDataCell
                            label="Hair color"
                            value={capitalizeWords(details.HAIRCOLOR ||
                                (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].HAIRCOLOR))}
                            editable={editable}
                            onDone={(value) => console.log("value", value)}
                        />
                    )}
                    {(details?.EYECOLOR || (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].EYECOLOR)) && (
                        <InputDataCell
                            label="Eye color"
                            value={capitalizeWords(details.EYECOLOR ||
                                (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].EYECOLOR))}
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
                        values={details.ScarsMarks ? [capitalizeWords(details.ScarsMarks)] : []}
                    />
                </div>
            )}
            {hasSkin && (
                <div className={cn("grid gap-4", isDrawer ? "grid grid-cols-2" : "grid-cols-4 gap-4 mt-3")}
                     style={{marginTop: "20px"}}>
                    <InputDataCell
                        label="Skin color"
                        value={capitalizeWords(details.SkinTone)}
                        editable={editable}
                        onDone={(value) => console.log("value", value)}
                    />
                </div>
            )}
        </Accordion>
    );
}
