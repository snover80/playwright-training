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

    generatePetObject(petId: number, petName: string, categoryId: number, categoryName: string, photoUrls: string[], tagId: number, tagName: string): Pet {
        // Build pet object
        const category = new CategoryBuilder().setId(categoryId).setName(categoryName).build();
        const tag = new TagBuilder().setId(tagId).setName(tagName).build();
        const pet = new PetBuilder().setId(petId).setName(petName).setCategory(category).setPhotoUrls(photoUrls).setTags([tag]).setStatus(status.availabe).build();
        return pet;
    }
}