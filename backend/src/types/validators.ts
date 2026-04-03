export interface Validator {
  validate: (value: any) => ValidatorResponse;
}

export interface ValidatorResponse {
  valid: boolean;
  message: string | null | undefined;
  code: number;
}
