import { zodUtils } from '@/lib/utils/zod';
import { z } from 'zod';

export const FormValidationSchema = z.object({
  amount: z.coerce.number({ required_error: 'Amount is required', invalid_type_error: 'Amount is required' }),
  rate: z.coerce.number({ required_error: 'Rate is required', invalid_type_error: 'Rate is required' }),
  description: zodUtils.getStringSchema({ name: 'Description', minErrorMessage: 'Description is required' }),
});

export type FormInputType = z.infer<typeof FormValidationSchema>;
