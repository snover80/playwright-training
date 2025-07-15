import { z } from "zod";

export const CategorySchema = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()

export type Category = z.infer<typeof CategorySchema>

export class CategoryBuilder {
    private category : Partial<Category> = {}

    setId(id: number): CategoryBuilder {
        this.category.id = id;
        return this;
    }

    setName(name: string): CategoryBuilder {
        this.category.name = name;
        return this;
    }

    build(): Category {
        return CategorySchema.parse(this.category);
    }
}