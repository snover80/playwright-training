import { z } from "zod";
import { Category, CategorySchema } from "./Category";
import { Tag, TagSchema } from "./Tag";

export enum status {
    availabe = "availabe",
    pending = "pending",
    sold = "sold"
}
export const PetSchema = z
  .object({
    id: z.number().int(),
    name: z.string(),
    category: CategorySchema,
    photoUrls: z.array(z.string()),
    tags: z.array(TagSchema),
    status: z.enum(status)
  }).partial({category: true, photoUrls: true, tags: true, status: true})

export type Pet = z.infer<typeof PetSchema>;


export class PetBuilder{
    private pet: Partial<Pet> = {};

    setId(id: number): PetBuilder{
        this.pet.id = id;
        return this;
    }

    setName(name: string): PetBuilder {
        this.pet.name = name;
        return this;
    }

    setCategory(category: Category): PetBuilder {
        this.pet.category = category;
        return this;
    }

    setPhotoUrls(photoUrls: string[]): PetBuilder {
        this.pet.photoUrls = photoUrls;
        return this;
    }

    setTags(tags: Tag[]): PetBuilder {
        this.pet.tags = tags;
        return this;
    }

    setStatus(status: status): PetBuilder {
        this.pet.status = status;
        return this;
    }

    build(): Pet {
        return PetSchema.parse(this.pet);
    }
}