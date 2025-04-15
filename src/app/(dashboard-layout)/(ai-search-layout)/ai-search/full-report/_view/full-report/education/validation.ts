import { zodUtils } from '@/lib/utils/zod';
import { z } from 'zod';

export const FormValidationSchema = z.object({
  institution: zodUtils.getStringSchema({ name: 'Institution', minErrorMessage: 'Institution is required' }),
  degree: zodUtils.getStringSchema({ name: 'Degree', minErrorMessage: 'Degree is required' }),
  graduationDate: z.coerce.date({ required_error: 'Graduation date is required', invalid_type_error: 'Graduation date is required' }),
  gpa: zodUtils.getStringSchema({ name: 'GPA', minErrorMessage: 'GPA is required' }),
});

export type FormInputType = z.infer<typeof FormValidationSchema>;
