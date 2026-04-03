import * as z from 'zod';
import type { Validator, ValidatorResponse } from '../types/index.js';

const feedSchema = z.object({
  date: z.coerce
    .date({
      error: (iss) => {
        if (iss.code === 'invalid_type') {
          return 'Value must be a date (YYYY-MM-dd)';
        }

        return 'Invalid date';
      },
    })
    .refine((d) => d <= new Date(), {
      message: 'Date cannot be in the future',
    }),
});

export default class FeedValidator implements Validator {
  validate(date: Date): ValidatorResponse {
    const result = feedSchema.safeParse(date);
    const isValid = result.success === true;

    if (!isValid) {
      return {
        valid: isValid,
        message: result.error.issues.at(0)?.message,
        code: 400,
      };
    }

    return {
      valid: isValid,
      message: null,
      code: 200,
    };
  }
}
