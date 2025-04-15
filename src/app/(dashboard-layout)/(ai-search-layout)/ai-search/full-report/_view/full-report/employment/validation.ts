import { zodUtils } from '@/lib/utils/zod';
import { z } from 'zod';

export const EmploymentFormValidationSchema = z
  .object({
    companyName: zodUtils.getStringSchema({ name: 'Company Name', minErrorMessage: 'Company Name is required' }),
    position: zodUtils.getStringSchema({ name: 'Position', minErrorMessage: 'Position is required' }),
    startDate: z.coerce.date({ required_error: 'Start Date is required', invalid_type_error: 'Start Date is required' }),
    endDate: z.coerce.date({ required_error: 'End Date is required', invalid_type_error: 'End Date is required' }),
    responsibilities: zodUtils.getStringSchema({ name: 'Responsibilities', minErrorMessage: 'Responsibilities is required' }),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (!startDate) {
      ctx.addIssue({
        path: ['startDate'],
        code: z.ZodIssueCode.custom,
        message: 'Start Date is required',
      });
    }
  });

export type EmploymentFormInputType = z.infer<typeof EmploymentFormValidationSchema>;
