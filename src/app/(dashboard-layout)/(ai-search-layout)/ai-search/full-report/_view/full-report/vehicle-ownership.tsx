import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import { getVehicleImageUrl } from '@/lib/utils/vehicle-image';
import Image from 'next/image';
import { Dispatch, SetStateAction, SVGProps, useState, useEffect } from 'react';
import { PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import { AIResponseDetail } from '../../../_view/conversation/type';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

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
        const make = capitalizeWords(vehicle.MAKE || '');
        const model = capitalizeWords(vehicle.MODEL || '');
        const year = vehicle.YEAR?.toString() || '';
        vehicleData.push({
          name: `${make} ${model}`,
          make,
          model,
          year,
          color: vehicle.COLOR || 'N/A',
          vin: vehicle.VIN || '',
          licNumber: vehicle.LIC_NUMBER || '',
          licState: vehicle.LIC_STATE || '',
          image: getVehicleImageUrl(make, model, year),
          vehicleType: 'car',
        });
      }
    });
  } else if (details?.automobile && typeof details.automobile === 'object') {
    // Fallback: if automobile is a single object, convert to array format
    const vehicle = details.automobile;
    if (vehicle.MAKE || vehicle.MODEL || vehicle.VIN) {
      const make = capitalizeWords(vehicle.MAKE || '');
      const model = capitalizeWords(vehicle.MODEL || '');
      const year = vehicle.YEAR?.toString() || '';
      vehicleData.push({
        name: `${make} ${model}`,
        make,
        model,
        year,
        color: vehicle.COLOR || 'N/A',
        vin: vehicle.VIN || '',
        licNumber: vehicle.LIC_NUMBER || '',
        licState: vehicle.LIC_STATE || '',
        image: getVehicleImageUrl(make, model, year),
        vehicleType: 'car',
      });
    }
  }

  // Handle motorcycle data
  if (details?.motorcycles && Array.isArray(details.motorcycles)) {
    // If motorcycles is an array, map through each motorcycle
    details.motorcycles.forEach((motorcycle: any) => {
      if (motorcycle && (motorcycle.Motorcycle_Make || motorcycle.Motorcycle_Model || motorcycle.Motorcycle_VIN)) {
        const make = capitalizeWords(motorcycle.Motorcycle_Make || '');
        const model = capitalizeWords(motorcycle.Motorcycle_Model || '');
        const year = motorcycle.Motorcycle_Year?.toString() || '';
        vehicleData.push({
          name: `${make} ${model}`,
          make,
          model,
          year,
          color: motorcycle.Motorcycle_Style || 'N/A',
          vin: motorcycle.Motorcycle_VIN || '',
          licNumber: motorcycle.LIC_NUMBER || '',
          licState: motorcycle.LIC_STATE || '',
          image: getVehicleImageUrl(make, model, year),
          vehicleType: 'motorcycle',
        });
      }
    });
  } else if (details?.motorcycles && typeof details.motorcycles === 'object') {
    // Fallback: if motorcycles is a single object, convert to array format
    const motorcycle = details.motorcycles;
    if (motorcycle.Motorcycle_Make || motorcycle.Motorcycle_Model || motorcycle.Motorcycle_VIN) {
      const make = capitalizeWords(motorcycle.Motorcycle_Make || '');
      const model = capitalizeWords(motorcycle.Motorcycle_Model || '');
      const year = motorcycle.Motorcycle_Year?.toString() || '';
      vehicleData.push({
        name: `${make} ${model}`,
        make,
        model,
        year,
        color: motorcycle.Motorcycle_Style || 'N/A',
        vin: motorcycle.Motorcycle_VIN || '',
        licNumber: motorcycle.LIC_NUMBER || '',
        licState: motorcycle.LIC_STATE || '',
        image: getVehicleImageUrl(make, model, year),
        vehicleType: 'motorcycle',
      });
    }
  }

  // Handle RV data
  if (details?.rv && Array.isArray(details.rv)) {
    // If rv is an array, map through each RV
    details.rv.forEach((rv: any) => {
      if (rv && (rv.Make || rv.Model || rv.VIN)) {
        const make = capitalizeWords(rv.Make || '');
        const model = capitalizeWords(rv.Model || '');
        const year = rv.MYear?.toString() || '';
        vehicleData.push({
          name: `${make} ${model}`,
          make,
          model,
          year,
          color: 'N/A', // RVs don't typically have color in this format
          vin: rv.VIN || '',
          licNumber: rv.LIC_NUMBER || '',
          licState: rv.LIC_STATE || '',
          image: getVehicleImageUrl(make, model, year),
          vehicleType: 'rv',
        });
      }
    });
  } else if (details?.rv && typeof details.rv === 'object') {
    // Fallback: if rv is a single object, convert to array format
    const rv = details.rv;
    if (rv.Make || rv.Model || rv.VIN) {
      const make = capitalizeWords(rv.Make || '');
      const model = capitalizeWords(rv.Model || '');
      const year = rv.MYear?.toString() || '';
      vehicleData.push({
        name: `${make} ${model}`,
        make,
        model,
        year,
        color: 'N/A', // RVs don't typically have color in this format
        vin: rv.VIN || '',
        licNumber: rv.LIC_NUMBER || '',
        licState: rv.LIC_STATE || '',
        image: getVehicleImageUrl(make, model, year),
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
            image: getVehicleImageUrl('', '', ''),
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
          image: getVehicleImageUrl('', '', ''),
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
          <button onClick={() => setNewVehicle(true)} className="text-xs" style={{ color: '#C0AEFF' }}>
            + Add New Vehicle
          </button>
        </div>
      )}
    </Accordion>
  );
}

// Helper to get dark mode from localStorage
const getDarkModeFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    } catch {
      return false;
    }
  }
  return false;
};

// Hook to use dark mode with localStorage fallback
const useDarkModeWithFallback = () => {
  const darkModeContext = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };

    updateDarkMode();
    window.addEventListener('storage', updateDarkMode);
    const interval = setInterval(updateDarkMode, 100);
    
    return () => {
      window.removeEventListener('storage', updateDarkMode);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

  return isDarkMode;
};

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
  const isDarkMode = useDarkModeWithFallback();
  const cardBgStyle = isDarkMode 
    ? { background: '#404652', borderColor: 'rgba(255, 255, 255, 0.1)' }
    : { background: '#F9FAFB', borderColor: '#E5E7EB' };
  const textColorStyle = isDarkMode ? { color: '#FFFFFF' } : { color: '#000000' };

  return (
    <div className="border rounded-lg p-4 w-full" style={cardBgStyle}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold" style={textColorStyle}>Car {carNumber}</p>
        {isEditable && (
          <button className="text-red-500">
            <PiTrash />
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {make && (
            <p className="font-medium text-xs leading-5" style={textColorStyle}>
              Make: <span className="text-xs font-normal leading-4" style={textColorStyle}>{make}</span>
            </p>
          )}
          {model && (
            <p className="font-medium text-xs leading-5" style={textColorStyle}>
              Model: <span className="text-xs font-normal leading-4" style={textColorStyle}>{model}</span>
            </p>
          )}
          {year && (
            <p className="font-medium text-xs leading-5" style={textColorStyle}>
              Year: <span className="text-xs font-normal leading-4" style={textColorStyle}>{year}</span>
            </p>
          )}
          {vin && (
            <p className="font-medium text-xs leading-5" style={textColorStyle}>
              VIN Number: <span className="text-xs font-normal leading-4" style={textColorStyle}>{vin}</span>
            </p>
          )}
        </div>
        {image && (
          <div className="flex-shrink-0">
            <Image src={image} alt={name || 'vehicle'} width={202} height={118} className="object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}

function AddNewVehicleForm({ setNewVehicle }: { setNewVehicle: Dispatch<SetStateAction<boolean>> }) {
  const isDarkMode = useDarkModeWithFallback();
  const formBgStyle = isDarkMode 
    ? { background: '#404652', borderColor: 'rgba(255, 255, 255, 0.1)' }
    : { background: undefined, borderColor: undefined };

  return (
    <div className="p-3 border rounded-lg" style={formBgStyle}>
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
