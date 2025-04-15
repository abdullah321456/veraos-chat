"use client";
import cn from "@/lib/utils/cn";
import {useState} from "react";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputDataCell} from "../../../_components/input-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "../../../_view/conversation/type";

type PersonalInfoProps = {
    isEditable?: boolean;
    isDrawer?: boolean;
    details?: AIResponseDetail
};

export function PersonalInfo({
                                 isEditable = false,
                                 isDrawer,
                                 details
                             }: PersonalInfoProps) {
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
            title="Personal information"
            {...(isLocalEdit && {
                actionButton: (
                    <AccordionActionButton
                        setEditable={setEditable}
                        mode={actionButtonMode}
                        onClick={handleActionButtonClick}
                    />
                ),
            })}>
            <div className={cn("grid gap-4", isDrawer ? "grid" : "grid-cols-6")}>
                <InputDataCell
                    label="Death index match"
                    value=""
                    editable={editable}
                    onDone={(value) => console.log("value", value)}
                />
                <InputDataCell label="Name Prefix" value="Mr." editable={editable}/>

                {isDrawer ? (
                    <div className="grid grid-cols-3 gap-3">
                        <InputDataCell
                            label="First Name"
                            value={details?.FIRST}
                            editable={editable}
                        />
                        <InputDataCell
                            label="Middle Name"
                            value={details?.MID}
                            editable={editable}
                        />
                        <InputDataCell label="Last Name" value={details?.LAST} editable={editable}/>
                    </div>
                ) : (
                    <>
                        <InputDataCell
                            label="First Name"
                            value={details?.FIRST}
                            editable={editable}
                        />
                        <InputDataCell
                            label="Middle Name"
                            value={details?.MID}
                            editable={editable}
                        />
                        <InputDataCell label="Last Name" value={details?.LAST} editable={editable}/>
                    </>
                )}

                <InputDataCell label="Name Prefix" value="Sr." editable={editable}/>
            </div>
            <div
                className={cn(
                    "grid gap-4",
                    isDrawer ? "grid grid-cols-2 mt-3" : "grid-cols-4 mt-3"
                )}>
                <InputDataCell
                    label="Alias/Nickname 1"
                    value="Johnny D"
                    editable={editable}
                />
                <InputDataCell
                    label="Alias/Nickname 2"
                    value="The Hammer"
                    editable={editable}
                />
                <InputDataCell
                    label="Date of Birth"
                    value={details?.DOB}
                    editable={editable}
                />
                <InputDataCell label="Gender" value={details?.GENDER} editable={editable}/>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
                <InputDataCell
                    label="Marital Status"
                    value="Married"
                    editable={editable}
                />
                <InputDataCell label="Religion" value="Christian" editable={editable}/>
                <InputDataCell label="No. of Children" value="3" editable={editable}/>
            </div>
            <div
                className={cn(
                    isDrawer ? "grid mt-3 gap-3" : "grid grid-cols-3 gap-3 mt-3"
                )}>
                <InputDataCell
                    label="Country of Origin/Citizenship Status"
                    value="United States / Citizen."
                    editable={editable}
                />
                <>
                    {isDrawer ? (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <InputDataCell
                                label="National ID"
                                value="123-45-6789"
                                editable={editable}
                            />
                            <InputDataCell
                                label="Voter Registration"
                                value="Registered"
                                editable={editable}
                            />
                        </div>
                    ) : (
                        <>
                            <InputDataCell
                                label="National ID"
                                value="123-45-6789"
                                editable={editable}
                            />
                            <InputDataCell
                                label="Voter Registration"
                                value="Registered"
                                editable={editable}
                            />
                        </>
                    )}
                </>
            </div>
        </Accordion>
    );
}
