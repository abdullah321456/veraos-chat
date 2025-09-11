import { z } from 'zod';
import { zodUtils } from '@/lib/utils/zod';

export const SignupFormSchema = z.object({
  // Basic Information
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: zodUtils.getEmailSchema(),
  confirmEmail: zodUtils.getEmailSchema(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
    // .regex(/[0-9]/, 'Password must contain at least one number')
    // .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),

  // Organization Details
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationType: z.string().min(1, 'Organization type is required'),
  organizationWebsite: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  jobTitle: z.string().optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormInputType = z.infer<typeof SignupFormSchema>;

export const DataAccessFormSchema = z.object({
  intendedUse: z.string()
    .min(1, 'Please describe your intended use')
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  dataAccessNeeds: z.array(z.string())
    .min(1, 'Please select at least one data access need')
    .max(10, 'You can select up to 10 data access needs'),
});

export type DataAccessFormInputType = z.infer<typeof DataAccessFormSchema>;

export const FinalSubmissionFormSchema = z.object({
  documents: z.array(z.any()).min(1, 'Please upload at least one document'),
});

export type FinalSubmissionFormInputType = z.infer<typeof FinalSubmissionFormSchema>;
