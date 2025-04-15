"use client";
import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/form-elements/input";
import { Textarea } from "@/components/atom/form-elements/textarea";

export function FeatureRequest() {
  return (
    <div className="p-5 rounded-[10px] shadow-lg w-[880px] border border-gray-50 ">
      <div className="space-y-4">
        <h2 className="text-black text-base font-bold">Feature Requests</h2>
        <Input
          label="Feature title"
          type="text"
          placeholder="Enter feature titlet"
        />
        <Textarea
          label="Description"
          placeholder="Write feature description"
          textareaClassName="resize-none min-h-[90px]"
        />
        <div className="pt-4">
        <Button>Submit Feature Request</Button>
        </div>
      </div>
    </div>
  );
}
