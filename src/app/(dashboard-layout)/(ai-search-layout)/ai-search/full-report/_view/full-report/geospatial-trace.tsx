"use client";
import { BuildingIcon } from "@/components/atom/icons/ai-search/building";
import { CapIcon } from "@/components/atom/icons/ai-search/cap";
import { CCriminalAssociateIcon } from "@/components/atom/icons/ai-search/criminal-associate";
import { FormerCellMateIcon } from "@/components/atom/icons/ai-search/former-cellmate";
import { FormerResidenceIcon } from "@/components/atom/icons/ai-search/former-residence";
import { MarkIcon } from "@/components/atom/icons/ai-search/mark";
import { MothersHomeIcon } from "@/components/atom/icons/ai-search/mother-home";
import cn from "@/lib/utils/cn";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";

type GeospatialTraceProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};
export function GeospatialTrace({
  isEditable = false,
  isDrawer,
}: GeospatialTraceProps) {
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
      title="Geospatial Trace"
      {...(isLocalEdit && {
        actionButton: (
          <AccordionActionButton
            setEditable={setEditable}
            mode={actionButtonMode}
            onClick={handleActionButtonClick}
          />
        ),
      })}>
      <div className="">
        <div className="border rounded-lg py-1.5 px-2.5">
          <p className="text-xs">Yelp Reviews and Location-Based Check-ins</p>
          <div className="space-y-2 mt-2">
            <div
              className={cn(
                isDrawer
                  ? "grid mt-3 gap-3"
                  : "grid grid-cols-2 items-center gap-3"
              )}>
              <div>
                <Image src="/map.png" alt="location" width={498} height={267} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <CapIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    The Arbor School of Central Florida,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      located near the sex offender address.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <CapIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    Central Florida Leadership Academy,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      located near the sex offender address.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <BuildingIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    Current residence{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      of the human trafficker.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <MarkIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    Mark Stevens,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      friend’s residence, 45 Oak Drive, Springfield, IL.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <FormerResidenceIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    567 Maple St., Chicago,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      IL (former residence from 2015–2018).
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <MothersHomeIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    Jane Doe,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      mother’s home, 890 Birch Ave., Springfield, IL.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <CCriminalAssociateIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    John Smith,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      criminal associate, 678 Pine St., Springfield, IL.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <FormerCellMateIcon />
                  <p className="text-black font-medium text-xs leading-5">
                    Carlos Mendes,{" "}
                    <span className="text-black text-xs font-normal leading-4">
                      former cellmate, 231 Willow St., Chicago, IL.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <InputArrayDataCell
            label="Current Residence"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={["Chicago, IL (Primary Residence)"]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            label="Past Addresses"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "New York, NY (2018-2022)",
              "Austin, TX (2015-2018)",
              "Denver, CO (2010-2015)",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            label="Current Employment"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Marketing Manager at XYZ Corporation (Headquarters in Chicago, IL)",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            bullet
            label="Past Employment"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Digital Marketing Specialist at ABC Solutions, New York, NY",
              "Junior Account Manager at TechWave, Austin, TX",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            bullet
            label="Locations of Family Members"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Parents: Reside in Los Angeles, CA",
              "Siblings: One brother in Seattle, WA",
              "Spouse's family: Based in Miami, FL",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            bullet
            label="Locations of Co-Workers"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Main Office: Colleagues located in Chicago, IL",
              "Remote Team Members: Located in San Francisco, CA and Houston, TX",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            bullet
            label="Known Social Locations"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Frequent visits to Lakefront Trail and Lincoln Park in Chicago.",
              "Regular attendee of networking events at WeWork locations across New York and Chicago",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
          <InputArrayDataCell
            bullet
            label="Places Traveled Domestically and Internationally"
            editable={editable}
            onDone={(value) => console.log("value", value)}
            values={[
              "Domestic Travel: Frequent trips to Miami, FL, and San Francisco, CA for work.",
              "International Travel: Vacationed in Paris, France (2022), Tokyo, Japan (2021), and Barcelona, Spain (2019).",
            ]}
            rowClassName="bg-transparent px-0 py-0"
            rowWrapperClassName="space-y-1.5"
            rowTextClassName="font-medium"
          />
        </div>
      </div>
    </Accordion>
  );
}
