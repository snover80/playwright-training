import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int(),
  })
  .partial()

type User = z.infer<typeof UserSchema>;

export class UserBuilder{
    private user: Partial<User> = {};

    setId(id: number): UserBuilder {
        this.user.id = id;
        return this;
    }

    setUsername(username: string): UserBuilder {
        this.user.username = username;
        return this;
    }

    setFirstName(firstName: string): UserBuilder {
        this.user.firstName = firstName;
        return this;
    }

    setLastName(lastName: string): UserBuilder{
        this.user.lastName = lastName;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this.user.email = email;
        return this;
    }

    setPassword(password: string): UserBuilder {
        this.user.password = password;
        return this;
    }

    setPhone(phone: string): UserBuilder {
        this.user.phone = phone;
        return this;
    }

    setUserStatus(status: number): UserBuilder {
        this.user.userStatus = status;
        return this;
    }

    build(): User {
        return UserSchema.parse(this.user);
    }
}