import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import Image from 'next/image';
import { Dispatch, SetStateAction, SVGProps, useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import { AIResponseDetail } from '../../../_view/conversation/type';

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  if (!str || str.trim() === '') return '';
  
  return str
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

type VehicleOwnershipProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
};

type Car = {
  name: string;
  make: string;
  model: string;
  year: string;
  color: string;
  vin: string;
  image: string;
};

export function VehicleOwnership({ isEditable = false, isDrawer, details }: VehicleOwnershipProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [newVehicle, setNewVehicle] = useState(false);

  console.log("VehicleOwnership details:", details);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
    if (newVehicle) setNewVehicle(false);
  }

  const vehicleData: Car[] = details?.automobile ? [{
    name: `${capitalizeWords(details.automobile.MAKE || '')} ${capitalizeWords(details.automobile.MODEL || '')}`,
    make: capitalizeWords(details.automobile.MAKE || ''),
    model: capitalizeWords(details.automobile.MODEL || ''),
    year: details.automobile.YEAR?.toString() || '',
    color: 'N/A',
    vin: details.automobile.VIN || '',
    image: '/red-car.png',
  }] : [];

  const hasAny = vehicleData.length > 0;
  if (!hasAny) return null;

  console.log("VehicleOwnership vehicleData:", vehicleData);

  return (
    <Accordion
      translateButton={isEditable}
      title="Vehicle Ownership"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer ? 'grid grid-cols-1 gap-2' : 'grid grid-cols-1 gap-3')}>
        {vehicleData.map((car) => (
          <RenderExistingVehicle key={car.vin} {...car} isEditable={editable} isDrawer={isDrawer} />
        ))}
        {newVehicle && editable && <AddNewVehicleForm setNewVehicle={setNewVehicle} />}
      </div>
      {!newVehicle && editable && (
        <div className="mt-3">
          <button onClick={() => setNewVehicle(true)} className="text-primary text-xs">
            + Add New Vehicle
          </button>
        </div>
      )}
    </Accordion>
  );
}

function RenderExistingVehicle({
  name,
  make,
  model,
  year,
  color,
  vin,
  image,
  isEditable,
  isDrawer,
}: Car & { isEditable: boolean; isDrawer?: boolean }) {
  return (
    <div className="border rounded-lg py-3 px-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        {isEditable && (
          <button className="text-red-500">
            <PiTrash />
          </button>
        )}
      </div>
      <div className="space-y-2 mt-3 flex justify-between">
        <div className="w-full">
          <p className="text-black font-medium text-sm leading-5">
            Make: <span className="text-black text-sm font-normal leading-4">{make}</span>
          </p>
          <p className="text-black font-medium text-sm leading-5">
            Model: <span className="text-black text-sm font-normal leading-4">{model}</span>
          </p>
          <p className="text-black font-medium text-sm leading-5">
            Year: <span className="text-black text-sm font-normal leading-4">{year}</span>
          </p>
          <p className="text-black font-medium text-sm leading-5">
            Color: <span className="text-black text-sm font-normal leading-4">{color}</span>
          </p>
          <p className="text-black font-medium text-sm leading-5">
            VIN Number: <span className="text-black text-sm font-normal leading-4">{vin}</span>
          </p>
        </div>
        {!isDrawer && <Image src={image} alt="black-car" width={202} height={118} />}
      </div>
    </div>
  );
}

function AddNewVehicleForm({ setNewVehicle }: { setNewVehicle: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="p-3 border rounded-lg">
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <Input placeholder="Make" />
          <Input placeholder="Model" />
          <Input placeholder="Year" />
          <Input placeholder="Color" />
          <Input placeholder="VIN Number" className="col-span-full" />
        </div>
        <label
          htmlFor="carImg"
          className="border-2 border-dashed rounded-lg text-primary font-semibold gap-1.5 text-xs bg-primary/10 border-primary flex flex-col items-center justify-center cursor-pointer p-4"
        >
          <input type="file" name="carImg" className="hidden" id="carImg" />
          <GalleryIcon className="w-9 h-9" />
          Upload Photo
        </label>
      </div>
      <Button onClick={() => setNewVehicle(false)} size="sm" variant="outline" color="danger">
        Remove
      </Button>
    </div>
  );
}

export const GalleryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" {...props}>
    <path
      fill="currentColor"
      d="M23.563 11.917v6.5a3.665 3.665 0 0 1-4.063 4.062h-13a3.666 3.666 0 0 1-4.063-4.062V7.583A3.665 3.665 0 0 1 6.5 3.521h8.667a.812.812 0 1 1 0 1.625H6.5c-1.708 0-2.438.729-2.438 2.437v10.021l2.752-2.751a1.092 1.092 0 0 1 1.538 0l1.019 1.018a.542.542 0 0 0 .758 0l5.352-5.352a1.092 1.092 0 0 1 1.538 0l4.919 4.919v-3.521a.813.813 0 0 1 1.625 0ZM8.659 8.396a1.357 1.357 0 1 0 .008 0h-.008Zm11.415-2.947.238-.237v2.371a.813.813 0 0 0 1.625 0V5.212l.239.237a.812.812 0 0 0 1.148-1.148L21.7 2.676a.814.814 0 0 0-1.148 0L18.926 4.3a.812.812 0 0 0 1.148 1.148Z"
    />
  </svg>
);
