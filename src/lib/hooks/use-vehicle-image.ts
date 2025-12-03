import { useEffect, useState } from 'react';
import { getVehicleImageUrl } from '@/lib/utils/vehicle-image';

/**
 * Hook to get vehicle image URL with async loading support
 * @param make - Vehicle make
 * @param model - Vehicle model
 * @param year - Vehicle year
 * @returns The vehicle image URL
 */
export function useVehicleImageUrl(
  make: string | undefined | null,
  model: string | undefined | null,
  year: string | number | undefined | null
): string {
  const [imageUrl, setImageUrl] = useState<string>(() => {
    // Initial value: try synchronous lookup first
    return getVehicleImageUrl(make, model, year);
  });

  useEffect(() => {
    // If we got the default image, try to load vehicle info and update
    if (imageUrl === '/red-car.png' && make && model && year) {
      // Dynamically import and use async function
      import('@/lib/utils/vehicle-image').then(({ getVehicleImageFileNameAsync, getVehicleImageUrl: getUrl }) => {
        getVehicleImageFileNameAsync(make, model, year).then((fileName) => {
          if (fileName) {
            const baseUrl = process.env.NEXT_PUBLIC_VEHICLE_IMAGES_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';
            const newUrl = baseUrl ? `${baseUrl}/vehicles/${fileName}` : `/vehicles/${fileName}`;
            setImageUrl(newUrl);
          }
        }).catch(() => {
          // Keep default image on error
        });
      });
    }
  }, [make, model, year, imageUrl]);

  return imageUrl;
}

