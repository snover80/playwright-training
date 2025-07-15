import { APIRequestContext, APIResponse } from "@playwright/test";

export class RequestHandler{
    private readonly request: APIRequestContext;
    protected readonly token: string;
    protected readonly tokenHeader: {};

    constructor(request: APIRequestContext, token?: string){
        this.request = request;
        this.token = token ?? "";
        this.tokenHeader = {"x-auth-token": token}
    }

    protected async getRequest(endpoint: string, testHeaders: {} = {}, queryParams: {} = {}): Promise<APIResponse>{
        return await this.request.get(endpoint, { headers: testHeaders, params: queryParams });
    }

    protected async postRequest<Type>(endpoint: string, testHeaders: {} = {}, testBody: Type): Promise<APIResponse>{
        return await this.request.post(endpoint, { headers: testHeaders, data: testBody});
    }

    protected async postUrlEncodedRequest(endpoint: string, testHeaders: {} = {}, testBody: {}): Promise<APIResponse>{
        return await this.request.post(endpoint, { headers: testHeaders, form: testBody});
    }
}