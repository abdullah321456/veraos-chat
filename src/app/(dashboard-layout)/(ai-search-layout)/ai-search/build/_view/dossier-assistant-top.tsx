import { SVGProps } from 'react';
import { SearchInput } from '../../_view/conversation/search-input';
import { PiInfo, PiPencilLine } from 'react-icons/pi';
import { Input } from '@/components/atom/form-elements/input';
import { Button } from '@/components/atom/button';
import { useModal } from '@/components/modal-views/use-modal';
import { UpdateModal } from './update-modal';

export function DossierAssistantTop() {
  const { openModal } = useModal();

  function handleViewUpdate() {
    openModal({
      containerClassName: 'w-[536px]',
      view: <UpdateModal />,
    });
  }
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <AiIcon />
        <h4 className="text-black  font-bold">Dossier Assistant</h4>
      </div>
      <SearchInput defaultValue="lLorem Ipsum is simply dummy text of the printing and typesetting industry." />
      <div className="flex items-center text-xs mt-3">
        <PiInfo className="text-yellow-600 me-1" />
        <p>New Employment Record Found | Oct 21, 2024, 11:45 AM. </p> &nbsp;&nbsp;
        <span className="underline text-primary cursor-pointer" onClick={handleViewUpdate}>
          View update
        </span>
      </div>
      <CustomCaseForm />
    </div>
  );
}

function CustomCaseForm() {
  return (
    <div className="border mt-4 border-gray-100 rounded-md shadow-md py-3 px-4">
      <div className="flex items-center justify-between mb-2.5">
        <p className="font-bold text-xs"> Custom Case File Number</p>
        <button>
          <PiPencilLine size={16} />
        </button>
      </div>
      <div className="grid grid-cols-8 gap-3">
        <Input className="col-span-7" inputClassName="bg-gray-100" placeholder="Case File Number" />
        <Button className="h-[43px] rounded-xl">Save</Button>
      </div>
    </div>
  );
}

const AiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path
      fill="#E812EF"
      d="m11.632 6.507.703 1.95a7.731 7.731 0 0 0 4.651 4.652l1.951.703a.2.2 0 0 1 0 .376l-1.951.703a7.73 7.73 0 0 0-4.652 4.651l-.702 1.951a.2.2 0 0 1-.376 0l-.703-1.95a7.73 7.73 0 0 0-4.651-4.652l-1.952-.703a.2.2 0 0 1 0-.376l1.952-.703a7.73 7.73 0 0 0 4.651-4.651l.703-1.951a.2.2 0 0 1 .376 0Zm8.782-4.69.356.988a3.918 3.918 0 0 0 2.356 2.356l.988.356a.101.101 0 0 1 0 .19l-.988.357a3.918 3.918 0 0 0-2.356 2.355l-.356.988a.101.101 0 0 1-.19 0l-.357-.988a3.918 3.918 0 0 0-2.355-2.355l-.988-.356a.101.101 0 0 1 0-.191l.988-.356a3.918 3.918 0 0 0 2.355-2.356l.357-.988c.032-.09.159-.09.19 0Zm0 16.777.356.988a3.918 3.918 0 0 0 2.356 2.355l.988.356c.089.033.089.159 0 .191l-.988.356a3.918 3.918 0 0 0-2.356 2.356l-.356.987a.101.101 0 0 1-.19 0l-.357-.987a3.918 3.918 0 0 0-2.355-2.356l-.988-.356a.101.101 0 0 1 0-.19l.988-.357a3.918 3.918 0 0 0 2.355-2.355l.357-.988c.032-.09.159-.09.19 0Z"
    />
  </svg>
);
