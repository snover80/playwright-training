import { z } from "zod";

export const ApiResponseSchema = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()

type ApiResponse = z.infer<typeof ApiResponseSchema>

export class ApiResponseBuilder{
    private apiResponse : Partial<ApiResponse> = {};

    setCode(code: number): ApiResponseBuilder {
        this.apiResponse.code = code;
        return this;
    }

    setType(type: string): ApiResponseBuilder {
        this.apiResponse.type = type;
        return this;
    }

    setMessage(message: string): ApiResponseBuilder {
        this.apiResponse.message = message;
        return this;
    }

    build(): ApiResponse {
        return ApiResponseSchema.parse(this.apiResponse);
    }
}