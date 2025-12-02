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
  licNumber: string;
  licState: string;
  image: string;
  vehicleType: 'car' | 'motorcycle' | 'rv';
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

  // Handle automobile as an array
  const vehicleData: Car[] = [];
  
  if (details?.automobile && Array.isArray(details.automobile)) {
    // If automobile is an array, map through each vehicle
    details.automobile.forEach((vehicle: any) => {
      if (vehicle && (vehicle.MAKE || vehicle.MODEL || vehicle.VIN)) {
        vehicleData.push({
          name: `${capitalizeWords(vehicle.MAKE || '')} ${capitalizeWords(vehicle.MODEL || '')}`,
          make: capitalizeWords(vehicle.MAKE || ''),
          model: capitalizeWords(vehicle.MODEL || ''),
          year: vehicle.YEAR?.toString() || '',
          color: vehicle.COLOR || 'N/A',
          vin: vehicle.VIN || '',
          licNumber: vehicle.LIC_NUMBER || '',
          licState: vehicle.LIC_STATE || '',
          image: '/red-car.png',
          vehicleType: 'car',
        });
      }
    });
  } else if (details?.automobile && typeof details.automobile === 'object') {
    // Fallback: if automobile is a single object, convert to array format
    const vehicle = details.automobile;
    if (vehicle.MAKE || vehicle.MODEL || vehicle.VIN) {
      vehicleData.push({
        name: `${capitalizeWords(vehicle.MAKE || '')} ${capitalizeWords(vehicle.MODEL || '')}`,
        make: capitalizeWords(vehicle.MAKE || ''),
        model: capitalizeWords(vehicle.MODEL || ''),
        year: vehicle.YEAR?.toString() || '',
        color: vehicle.COLOR || 'N/A',
        vin: vehicle.VIN || '',
        licNumber: vehicle.LIC_NUMBER || '',
        licState: vehicle.LIC_STATE || '',
        image: '/red-car.png',
        vehicleType: 'car',
      });
    }
  }

  // Handle motorcycle data
  if (details?.motorcycles && Array.isArray(details.motorcycles)) {
    // If motorcycles is an array, map through each motorcycle
    details.motorcycles.forEach((motorcycle: any) => {
      if (motorcycle && (motorcycle.Motorcycle_Make || motorcycle.Motorcycle_Model || motorcycle.Motorcycle_VIN)) {
        vehicleData.push({
          name: `${capitalizeWords(motorcycle.Motorcycle_Make || '')} ${capitalizeWords(motorcycle.Motorcycle_Model || '')}`,
          make: capitalizeWords(motorcycle.Motorcycle_Make || ''),
          model: capitalizeWords(motorcycle.Motorcycle_Model || ''),
          year: motorcycle.Motorcycle_Year?.toString() || '',
          color: motorcycle.Motorcycle_Style || 'N/A',
          vin: motorcycle.Motorcycle_VIN || '',
          licNumber: motorcycle.LIC_NUMBER || '',
          licState: motorcycle.LIC_STATE || '',
          image: '/red-car.png',
          vehicleType: 'motorcycle',
        });
      }
    });
  } else if (details?.motorcycles && typeof details.motorcycles === 'object') {
    // Fallback: if motorcycles is a single object, convert to array format
    const motorcycle = details.motorcycles;
    if (motorcycle.Motorcycle_Make || motorcycle.Motorcycle_Model || motorcycle.Motorcycle_VIN) {
      vehicleData.push({
        name: `${capitalizeWords(motorcycle.Motorcycle_Make || '')} ${capitalizeWords(motorcycle.Motorcycle_Model || '')}`,
        make: capitalizeWords(motorcycle.Motorcycle_Make || ''),
        model: capitalizeWords(motorcycle.Motorcycle_Model || ''),
        year: motorcycle.Motorcycle_Year?.toString() || '',
        color: motorcycle.Motorcycle_Style || 'N/A',
        vin: motorcycle.Motorcycle_VIN || '',
        licNumber: motorcycle.LIC_NUMBER || '',
        licState: motorcycle.LIC_STATE || '',
        image: '/red-car.png',
        vehicleType: 'motorcycle',
      });
    }
  }

  // Handle RV data
  if (details?.rv && Array.isArray(details.rv)) {
    // If rv is an array, map through each RV
    details.rv.forEach((rv: any) => {
      if (rv && (rv.Make || rv.Model || rv.VIN)) {
        vehicleData.push({
          name: `${capitalizeWords(rv.Make || '')} ${capitalizeWords(rv.Model || '')}`,
          make: capitalizeWords(rv.Make || ''),
          model: capitalizeWords(rv.Model || ''),
          year: rv.MYear?.toString() || '',
          color: 'N/A', // RVs don't typically have color in this format
          vin: rv.VIN || '',
          licNumber: rv.LIC_NUMBER || '',
          licState: rv.LIC_STATE || '',
          image: '/red-car.png',
          vehicleType: 'rv',
        });
      }
    });
  } else if (details?.rv && typeof details.rv === 'object') {
    // Fallback: if rv is a single object, convert to array format
    const rv = details.rv;
    if (rv.Make || rv.Model || rv.VIN) {
      vehicleData.push({
        name: `${capitalizeWords(rv.Make || '')} ${capitalizeWords(rv.Model || '')}`,
        make: capitalizeWords(rv.Make || ''),
        model: capitalizeWords(rv.Model || ''),
        year: rv.MYear?.toString() || '',
        color: 'N/A', // RVs don't typically have color in this format
        vin: rv.VIN || '',
        licNumber: rv.LIC_NUMBER || '',
        licState: rv.LIC_STATE || '',
        image: '/red-car.png',
        vehicleType: 'rv',
      });
    }
  }

  // Handle national-drivers-license data for license information
  if (details?.national_drivers_license && Array.isArray(details.national_drivers_license)) {
    // If we have driver's license data, try to match it with existing vehicles or create a license-only entry
    details.national_drivers_license.forEach((license: any) => {
      if (license && (license.LIC_NUMBER || license.LIC_STATE)) {
        // Try to find existing vehicle to add license info to
        const existingVehicle = vehicleData.find(v => !v.licNumber && !v.licState);
        if (existingVehicle) {
          existingVehicle.licNumber = license.LIC_NUMBER || existingVehicle.licNumber;
          existingVehicle.licState = license.LIC_STATE || existingVehicle.licState;
        } else {
          // Create a license-only entry if no vehicle exists
          vehicleData.push({
            name: 'Driver\'s License Information',
            make: '',
            model: '',
            year: '',
            color: '',
            vin: '',
            licNumber: license.LIC_NUMBER || '',
            licState: license.LIC_STATE || '',
            image: '/red-car.png',
            vehicleType: 'car',
          });
        }
      }
    });
  } else if (details?.national_drivers_license && typeof details.national_drivers_license === 'object') {
    // Fallback: if national-drivers-license is a single object
    const license = details.national_drivers_license;
    if (license && (license.LIC_NUMBER || license.LIC_STATE)) {
      // Try to find existing vehicle to add license info to
      const existingVehicle = vehicleData.find(v => !v.licNumber && !v.licState);
      if (existingVehicle) {
        existingVehicle.licNumber = license.LIC_NUMBER || existingVehicle.licNumber;
        existingVehicle.licState = license.LIC_STATE || existingVehicle.licState;
      } else {
        // Create a license-only entry if no vehicle exists
        vehicleData.push({
          name: 'Driver\'s License Information',
          make: '',
          model: '',
          year: '',
          color: '',
          vin: '',
          licNumber: license.LIC_NUMBER || '',
          licState: license.LIC_STATE || '',
          image: '/red-car.png',
          vehicleType: 'car',
        });
      }
    }
  }

  // Filter out duplicate vehicles based on VIN
  const uniqueVehicles = vehicleData.reduce((acc: Car[], current: Car) => {
    const existingVehicle = acc.find(vehicle => vehicle.vin && vehicle.vin === current.vin);
    if (!existingVehicle) {
      acc.push(current);
    } else {
      // Merge license information if current vehicle has license data and existing doesn't
      if (current.licNumber && !existingVehicle.licNumber) {
        existingVehicle.licNumber = current.licNumber;
      }
      if (current.licState && !existingVehicle.licState) {
        existingVehicle.licState = current.licState;
      }
    }
    return acc;
  }, []);

  const hasAny = uniqueVehicles.length > 0;
  if (!hasAny) return null;

  console.log("VehicleOwnership uniqueVehicles:", uniqueVehicles);

  return (
    <Accordion
      translateButton={isEditable}
      title="Vehicle Ownership"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3')}>
        {uniqueVehicles.map((car, index) => (
          <RenderExistingVehicle key={car.vin || `vehicle-${index}`} {...car} isEditable={editable} isDrawer={isDrawer} carNumber={index + 1} />
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
  licNumber,
  licState,
  image,
  vehicleType,
  isEditable,
  isDrawer,
  carNumber,
}: Car & { isEditable: boolean; isDrawer?: boolean; carNumber?: number }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-black">Car {carNumber}</p>
        {isEditable && (
          <button className="text-red-500">
            <PiTrash />
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {make && (
            <p className="text-black font-medium text-xs leading-5">
              Make: <span className="text-black text-xs font-normal leading-4">{make}</span>
            </p>
          )}
          {model && (
            <p className="text-black font-medium text-xs leading-5">
              Model: <span className="text-black text-xs font-normal leading-4">{model}</span>
            </p>
          )}
          {year && (
            <p className="text-black font-medium text-xs leading-5">
              Year: <span className="text-black text-xs font-normal leading-4">{year}</span>
            </p>
          )}
          {vin && (
            <p className="text-black font-medium text-xs leading-5">
              VIN Number: <span className="text-black text-xs font-normal leading-4">{vin}</span>
            </p>
          )}
        </div>
        {(vin || make || model) && (
          <div className="flex-shrink-0">
            <Image src={image} alt={name || 'vehicle'} width={202} height={118} className="object-contain" />
          </div>
        )}
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
          <Input placeholder="Color/Style/Type" />
          <Input placeholder="VIN Number" className="col-span-full" />
          <Input placeholder="License Number" />
          <Input placeholder="License State" />
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
