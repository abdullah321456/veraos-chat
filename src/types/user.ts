// User data structure from /users API endpoint
export interface UserData {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  confirmEmail: string;
  password?: string;
  confirmPassword?: string;
  isAdmin: boolean;
  role: string;
  organization: any | null;
  // Organization details
  organizationName: string;
  organizationType: string;
  organizationWebsite: string;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  jobTitle: string;
  jobId: string;
  intendedUse: string;
  dataAccessNeeds: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
  force_update_password: boolean;
}

// Password update data structure
export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// API response structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// User profile update request
export interface UserProfileUpdateRequest {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  confirmEmail?: string;
  organizationName?: string;
  organizationType?: string;
  organizationWebsite?: string;
  address?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  jobTitle?: string;
  jobId?: string;
} 