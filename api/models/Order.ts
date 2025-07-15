import { z } from "zod";

enum status {
    placed = "placed",
    approved = "approved",
    delivered = "delivered",
}
export const OrderSchema = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.iso.datetime(),
    status: z.enum(status),
    complete: z.boolean(),
  })
  .partial()

type Order = z.infer<typeof OrderSchema>;

export class OrderBuilder {
    private order : Partial<Order> = {};

    setId(id: number): OrderBuilder {
        this.order.id = id;
        return this;
    }

    setPetId(petId: number): OrderBuilder {
        this.order.petId = petId;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.order.quantity = quantity;
        return this;
    }

    setShipDate(date: Date): OrderBuilder {
        this.order.shipDate = date.toISOString();
        return this;
    }

    setComplete(complete: boolean): OrderBuilder {
        this.order.complete = complete;
        return this;
    }

    build(): Order {
        return OrderSchema.parse(this.order);
    }
}