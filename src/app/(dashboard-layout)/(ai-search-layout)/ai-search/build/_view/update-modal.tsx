"use client";
import { Button } from "@/components/atom/button";
import { ModalCloseIcon } from "@/components/atom/icons/ai-search/modal-close";
import { useModal } from "@/components/modal-views/use-modal";
import Image from "next/image";

export function UpdateModal() {
  const { closeModal } = useModal();

  function closeTheModal() {
    closeModal();
  }
  return (
    <>
      <div className="px-5 py-3.5 rounded-[10px] shadow-lg  border border-gray-50 bg-[#F8F7FC] ">
        <div className="flex items-center justify-between">
          <p className="text-black text-base font-bold">New Data Available</p>
          <ModalCloseIcon className="cursor-pointer " onClick={closeTheModal} />
        </div>
      </div>
      <div className="bg-white p-5 rounded-[10px]">
        <div className="text-[#616166] grid grid-cols-2 text-sm font-medium">
          <p>Data Source</p>
          <p>Fields Affected</p>
        </div>
        <div className="text-black grid grid-cols-2 text-sm font-bold">
          <p>Public records</p>
          <p>New employment</p>
        </div>
        <div className="my-4">
          <p className="text-[#616166] text-sm font-medium">
            <div className="rounded-lg border">
              <div className="border-b grid grid-cols-3">
                <div className="px-4 py-2 font-medium text-black bg-[#D9D9D938] bg-opacity-20 text-sm">Company</div>
                <div className="px-4 py-2 text-black font-medium text-sm col-span-2">123 Solutions</div>
              </div>
              <div className="border-b grid grid-cols-3">
                <div className="px-4 py-2 font-medium text-black bg-[#D9D9D938] bg-opacity-20 text-sm">Position</div>
                <div className="px-4 py-2 text-black font-medium text-sm col-span-2">Intern</div>
              </div>
              <div className="border-b grid grid-cols-3">
                <div className="px-4 py-2 font-medium text-black bg-[#D9D9D938] bg-opacity-20 text-sm">Dates Employed</div>
                <div className="px-4 py-2 text-black font-medium text-sm col-span-2">January 2016 - May 2019</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="px-4 py-2 font-medium text-black bg-[#D9D9D938] bg-opacity-20 text-sm">Responsibilities</div>
                <div className="px-4 py-2 text-black font-medium text-sm col-span-2">
                  Assisted in the execution of marketing sdivategies, coordinated events, and maintained social media presence.
                </div>
              </div>
            </div>
          </p>
        </div>
        <div className="space-y-3.5">
          <p className="text-[#616166] text-sm font-medium leading-5">Map Direction of the company</p>
          <Image src="/modal-map.png" width={504} height={154} alt="location mmap" />
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Button className="text-primary bg-white border-[#5C39D9] hover:bg-slate-100">Remind me later</Button>
          <Button className="text-primary bg-white border-[#5C39D9] hover:bg-slate-100">Ignore</Button>
          <Button>Add to Dossier</Button>
        </div>
      </div>
    </>
  );
}
