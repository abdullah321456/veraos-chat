"use client";
import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/form-elements/input";
import { inputLabelStyles } from "@/components/atom/form-elements/styles/label-styles";
import { Textarea } from "@/components/atom/form-elements/textarea";
import { Select } from "@/components/atom/select";
import cn from "@/lib/utils/cn";
import { TicketUploader } from "./ticket-uploader";
const labelClassName = cn(
  "block text-[#6D6F73]",
  inputLabelStyles.color.black,
  inputLabelStyles.size.md,
  inputLabelStyles.weight.medium
);
const ticketCategoryOption = [
  {
    id: "1",
    name: "high",
    value: "high",
  },
  {
    id: "2",
    name: "Medium",
    value: "medium",
  },
  {
    id: "3",
    name: "Low",
    value: "low",
  },
];
export function SubmitTicket() {
  return (
    <div className="w-[360px] bg-white shadow-lg rounded-[10px] space-y-3 p-[18px] border border-gray-50 h-[560px]">
      <h4 className="text-black text-base font-bold">Submit a Ticket</h4>
      <Input label="Subject" type="text" placeholder="Enter your subject" />

      <Select
        dropdownMenuClassName="w-[322px]"
        placeholder="Choose ticket category"
        labelClassName={labelClassName}
        label="Category"
        // selected={selectedOrgOption}
        options={ticketCategoryOption}
        formatDisplay={(option) => option?.name}
        // onSelect={({ value }: { value: string }) => {
        //   setSelectedOrgValue(value);
        //   console.log(value);
        // }}
      />
      <Textarea
        label="Description"
        placeholder="Description about the ticket"
        textareaClassName="resize-none min-h-[108px]"
      />
      <h5 className="text-black text-sm font-medium">Attachement</h5>
      <TicketUploader />

      <div className="pt-4">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
