import { APIRequestContext } from "@playwright/test";
import { RequestHandler } from "../RequestHandler";

export class CommentsEndpoint extends RequestHandler{

    private readonly path = "https://jsonplaceholder.typicode.com/comments"
    constructor(request: APIRequestContext){
        super(request);
    }

    async getCommentsById(postId: number){
        return await this.getRequest(this.path, {}, {"postId": postId} );
    }
}