import { MAX_LENGTH_CONSTANTS } from '@/config/constants';
import { ZodDefault, ZodEnum, ZodOptional, ZodString, z } from 'zod';

function getEmailSchema<T extends boolean = true>({
  required = true as T,
  requiredErrorMessage,
  minErrorMessage,
  name = 'Email',
}: {
  required?: T;
  requiredErrorMessage?: string;
  minErrorMessage?: string;
  name?: string;
} = {}): T extends true ? ZodString : ZodOptional<ZodString> {
  const REQUIRED_ERROR_MESSAGE = requiredErrorMessage || `${name} is required`;

  const MIN_ERROR_MESSAGE = minErrorMessage || `${name} must be at least 8 characters`;

  const schema = z
    .string({
      required_error: REQUIRED_ERROR_MESSAGE,
      invalid_type_error: `${name} is invalid`,
    })
    .email({ message: `${name} must be a valid email address` })
    .min(1, { message: MIN_ERROR_MESSAGE })
    .max(MAX_LENGTH_CONSTANTS.EMAIL, {
      message: `${name} must be maximum 50 characters`,
    })
    .trim()
    .toLowerCase();

  if (!required) {
    schema.optional();
  }

  return schema as T extends true ? ZodString : ZodOptional<ZodString>;
}

function getStringSchema<T extends boolean = true>({
  required = true as T,
  requiredErrorMessage,
  name,
  max = 255,
  min = 3,
  maxErrorMessage,
  minErrorMessage,
  invalidTypeErrorMessage,
  trimmed = false,
}: {
  required?: T;
  requiredErrorMessage?: string;
  name: string;
  max?: number;
  min?: number;
  maxErrorMessage?: string;
  minErrorMessage?: string;
  invalidTypeErrorMessage?: string;
  trimmed?: boolean;
}): T extends true ? ZodString : ZodOptional<ZodString> {
  const REQUIRED_ERROR_MESSAGE = requiredErrorMessage || `${name} is required`;

  const MAX_ERROR_MESSAGE = maxErrorMessage || `${name} must be maximum ${max} characters`;

  const MIN_ERROR_MESSAGE = minErrorMessage || `${name} must be at least ${min} characters`;
  const INVALID_TYPE_ERROR_MESSAGE = invalidTypeErrorMessage || `${name} is invalid`;

  if (max < min) {
    throw new Error('Max length should be greater than or equal to min length');
  }

  const schema = z
    .string({
      required_error: REQUIRED_ERROR_MESSAGE,
      invalid_type_error: INVALID_TYPE_ERROR_MESSAGE,
    })
    .min(min, { message: MIN_ERROR_MESSAGE })
    .max(max, { message: MAX_ERROR_MESSAGE });

  if (!required) {
    schema.optional();
  }

  if (trimmed) {
    schema.trim();
  }

  return schema as T extends true ? ZodString : ZodOptional<ZodString>;
}

function getPhoneNumberSchema<T extends boolean = true>({
  required = true as T,
  requiredErrorMessage,
  name = 'Phone',
  max = MAX_LENGTH_CONSTANTS.PHONE_NUMBER,
  min = 3,
  maxErrorMessage,
  minErrorMessage,
  invalidTypeErrorMessage,
}: {
  required?: T;
  requiredErrorMessage?: string;
  name?: string;
  max?: number;
  min?: number;
  maxErrorMessage?: string;
  minErrorMessage?: string;
  invalidTypeErrorMessage?: string;
} = {}): T extends true ? ZodString : ZodOptional<ZodString> {
  const REQUIRED_ERROR_MESSAGE = requiredErrorMessage || `${name} is required`;

  const MAX_ERROR_MESSAGE = maxErrorMessage || `${name} must be maximum ${max} characters`;

  const MIN_ERROR_MESSAGE = minErrorMessage || `${name} must be at least ${min} characters`;
  const INVALID_TYPE_ERROR_MESSAGE = invalidTypeErrorMessage || `${name} is invalid`;

  if (max < min) {
    throw new Error('Max length should be greater than or equal to min length');
  }

  const schema = z
    .string({
      required_error: REQUIRED_ERROR_MESSAGE,
      invalid_type_error: INVALID_TYPE_ERROR_MESSAGE,
    })
    .min(min, { message: MIN_ERROR_MESSAGE })
    .max(max, { message: MAX_ERROR_MESSAGE })
    .trim();

  if (!required) {
    schema.optional();
  }

  return schema as T extends true ? ZodString : ZodOptional<ZodString>;
}

type TGetStrLiteralToBooleanSchemaParams = {
  required?: boolean;
  fieldName: string;
  default?: boolean;
} & ({ required?: false; default: boolean } | { required: true });

function getStrLiteralToBooleanSchema({ required, default: defaultValue, fieldName }: TGetStrLiteralToBooleanSchemaParams) {
  const schema = z
    .boolean({
      errorMap: () => ({
        message: `${fieldName} must be a boolean or 'true'/'false' string`,
      }),
    })
    .or(z.enum(['true', 'false']).transform((value) => value === 'true'))
    .pipe(z.boolean());

  // Conditionally make the schema optional or set a default value
  if (!required) {
    schema.optional();
    if (defaultValue !== undefined) {
      schema.default(defaultValue);
    }
  }

  return schema;
}

type GetEnumSchemaReturnType<R extends boolean, T extends string, D> = R extends true
  ? ZodEnum<[T, ...T[]]>
  : D extends T
  ? ZodDefault<ZodEnum<[T, ...T[]]>>
  : ZodOptional<ZodEnum<[T, ...T[]]>>;

function getEnumSchema<T extends string, R extends boolean = true, D extends T | undefined = undefined>({
  values,
  name,
  required = true as R,
  defaultValue,
  requiredErrorMessage,
  invalidTypeErrorMessage,
}: {
  values: readonly [T, ...T[]];
  name: string;
  required?: R;
  defaultValue?: R extends true ? never : D;
  requiredErrorMessage?: string;
  invalidTypeErrorMessage?: string;
}): GetEnumSchemaReturnType<R, T, D> {
  if (values.length === 0) {
    throw new Error('The values array must contain at least one string.');
  }

  const REQUIRED_ERROR_MESSAGE = requiredErrorMessage || `${name} is required.`;
  const INVALID_TYPE_ERROR_MESSAGE = invalidTypeErrorMessage || `${name} must be one of the allowed values: ${values.join(', ')}.`;

  // Validate defaultValue is in values at runtime
  if (defaultValue !== undefined && !values.includes(defaultValue)) {
    throw new Error(`Default value "${defaultValue}" is not a valid option for "${name}".`);
  }

  const schema = z.enum(values as [T, ...T[]], {
    invalid_type_error: INVALID_TYPE_ERROR_MESSAGE,
    required_error: REQUIRED_ERROR_MESSAGE,
  });

  if (!required) {
    if (defaultValue !== undefined) {
      schema.default(defaultValue as any) as ZodDefault<ZodEnum<[T, ...T[]]>>;
    } else {
      schema.optional() as ZodOptional<ZodEnum<[T, ...T[]]>>;
    }
  }

  return schema as GetEnumSchemaReturnType<R, T, D>;
}

export const zodUtils = {
  getEmailSchema,
  getPhoneNumberSchema,
  getStringSchema,
  getStrLiteralToBooleanSchema,
  getEnumSchema,
};

export const PasswordFormSchema = getStringSchema({
  name: 'Password',
  minErrorMessage: 'Password is required',
  maxErrorMessage: 'Password is required',
});
