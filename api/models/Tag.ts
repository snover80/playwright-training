import { z } from "zod";

export const TagSchema = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()

export type Tag = z.infer<typeof TagSchema>;

export class TagBuilder {
    private tag : Partial<Tag> = {};

    setId(id : number): TagBuilder {
        this.tag.id = id;
        return this;
    }

    setName(name: string): TagBuilder {
        this.tag.name = name;
        return this;
    }

    build(): Tag {
        return TagSchema.parse(this.tag);
    }
}