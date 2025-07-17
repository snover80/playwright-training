import { APIResponse } from "@playwright/test";
import { RequestHandler } from "../../RequestHandler";
import { Pet, PetBuilder, status } from "../../models/Pet";
import { CategoryBuilder } from "../../models/Category";
import { TagBuilder } from "../../models/Tag";

export class PetEndpoint extends RequestHandler {
    private path: string = "pet";

    createPet(pet: Pet): Promise<APIResponse> {
        return this.postRequest(this.path, {}, pet);
    }

    getPet(petId: number): Promise<APIResponse> {
        return this.getRequest(`${this.path}/${petId}`);
    }
}