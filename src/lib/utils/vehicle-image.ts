interface VehicleInfo {
  Make: string;
  Model: string;
  'Starting Year': number;
  'Ending Year': number;
  'File Name': string;
}

// Cache for vehicle info
let vehicleInfoCache: VehicleInfo[] | null = null;

/**
 * Loads vehicle info from public folder (client-side) or requires it (server-side)
 */
async function loadVehicleInfo(): Promise<VehicleInfo[]> {
  if (vehicleInfoCache) {
    return vehicleInfoCache;
  }

  if (typeof window !== 'undefined') {
    // Client-side: fetch from public folder
    try {
      const response = await fetch('/vehicle-info.json');
      if (response.ok) {
        vehicleInfoCache = await response.json();
        return vehicleInfoCache;
      }
    } catch (e) {
      console.warn('Could not load vehicle-info.json:', e);
    }
  } else {
    // Server-side: use require
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'public', 'vehicle-info.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      vehicleInfoCache = JSON.parse(fileContent);
      return vehicleInfoCache;
    } catch (e) {
      console.warn('Could not load vehicle-info.json on server:', e);
    }
  }

  return [];
}

/**
 * Gets the vehicle image file name from vehicle-info.json based on Make, Model, and Year
 * @param make - Vehicle make (e.g., "Volkswagen")
 * @param model - Vehicle model (e.g., "Jetta")
 * @param year - Vehicle year (e.g., "2007" or 2007)
 * @returns The file name if found, null otherwise
 */
export async function getVehicleImageFileNameAsync(
  make: string | undefined | null,
  model: string | undefined | null,
  year: string | number | undefined | null
): Promise<string | null> {
  if (!make || !model || !year) {
    return null;
  }

  // Normalize inputs
  const normalizedMake = make.trim();
  const normalizedModel = model.trim();
  const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;

  if (isNaN(yearNum)) {
    return null;
  }

  // Load vehicle info
  const vehicleInfoArray = await loadVehicleInfo();

  // Find matching vehicle in vehicle-info.json
  const match = vehicleInfoArray.find((vehicle) => {
    const makeMatch = vehicle.Make.trim().toLowerCase() === normalizedMake.toLowerCase();
    const modelMatch = vehicle.Model.trim().toLowerCase() === normalizedModel.toLowerCase();
    const yearInRange = yearNum >= vehicle['Starting Year'] && yearNum <= vehicle['Ending Year'];
    
    return makeMatch && modelMatch && yearInRange;
  });

  return match ? match['File Name'] : null;
}

/**
 * Synchronous version - uses cached data if available
 * Note: This will return null on first call if data isn't cached yet
 * @param make - Vehicle make
 * @param model - Vehicle model
 * @param year - Vehicle year
 * @returns The file name if found, null otherwise
 */
export function getVehicleImageFileName(
  make: string | undefined | null,
  model: string | undefined | null,
  year: string | number | undefined | null
): string | null {
  if (!make || !model || !year) {
    return null;
  }

  // Normalize inputs
  const normalizedMake = make.trim();
  const normalizedModel = model.trim();
  const yearNum = typeof year === 'string' ? parseInt(year, 10) : year;

  if (isNaN(yearNum)) {
    return null;
  }

  // Use cached data if available
  if (!vehicleInfoCache || vehicleInfoCache.length === 0) {
    // Try to load synchronously on server-side
    if (typeof window === 'undefined') {
      try {
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(process.cwd(), 'public', 'vehicle-info.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        vehicleInfoCache = JSON.parse(fileContent);
      } catch (e) {
        return null;
      }
    } else {
      // Client-side: return null if not cached (will use default image)
      return null;
    }
  }

  // Find matching vehicle
  const match = vehicleInfoCache.find((vehicle) => {
    const makeMatch = vehicle.Make.trim().toLowerCase() === normalizedMake.toLowerCase();
    const modelMatch = vehicle.Model.trim().toLowerCase() === normalizedModel.toLowerCase();
    const yearInRange = yearNum >= vehicle['Starting Year'] && yearNum <= vehicle['Ending Year'];
    
    return makeMatch && modelMatch && yearInRange;
  });

  return match ? match['File Name'] : null;
}

/**
 * Gets the full vehicle image URL
 * @param make - Vehicle make
 * @param model - Vehicle model
 * @param year - Vehicle year
 * @returns The full image URL or default fallback image
 */
export function getVehicleImageUrl(
  make: string | undefined | null,
  model: string | undefined | null,
  year: string | number | undefined | null
): string {
  const fileName = getVehicleImageFileName(make, model, year);
  
  // Get base URL from environment variable or use default
  const baseUrl = process.env.NEXT_PUBLIC_VEHICLE_IMAGES_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';
  
  if (!fileName) {
    // Return default image if no match found: /default-car.png
    return '/default-car.png';
  }
  
  // If base URL is provided, check if it's the same origin
  if (baseUrl && typeof window !== 'undefined') {
    try {
      const baseUrlObj = new URL(baseUrl);
      const currentOrigin = window.location.origin;
      
      // If base URL matches current origin, use relative path to avoid Next.js image config issues
      if (baseUrlObj.origin === currentOrigin) {
        return `/vehicles/${fileName}`;
      }
    } catch (e) {
      // If baseUrl is not a valid URL, treat it as a relative path prefix
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        return `${baseUrl}/vehicles/${fileName}`;
      }
    }
  }
  
  // Construct the full URL: base_url/vehicles/file_name
  if (baseUrl) {
    return `${baseUrl}/vehicles/${fileName}`;
  }
  
  // Fallback to relative path if no base URL is configured
  return `/vehicles/${fileName}`;
}

// Preload vehicle info on module initialization (client-side)
if (typeof window !== 'undefined') {
  loadVehicleInfo().catch(() => {
    // Silently fail - will use default image on first render
  });
}
