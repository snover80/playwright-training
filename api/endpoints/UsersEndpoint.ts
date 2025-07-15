import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestHandler } from "../RequestHandler";

export class UsersEndpoint extends RequestHandler{

    private readonly path = "https://practice.expandtesting.com/notes/api/users"
        constructor(request: APIRequestContext, token: string){
            super(request, token);
        }
    
        async postLogin(user: string, pass: string){
            const formData = { email: user, password: pass}
            return await this.postRequest(this.path, {} , formData)
        }

        async getUserProfile(): Promise<APIResponse> {
            return await this.getRequest(`${this.path}/profile`, this.tokenHeader);
        }
}