export interface ErrorResponse {
    status: string;
    code: number;
    errors: CustomFieldError[] | { message: string }[];
}

export interface CustomFieldError {
    field: string;
    error: string;
}