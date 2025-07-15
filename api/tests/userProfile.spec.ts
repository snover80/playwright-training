import { expect, test } from "../fixtures/api";
import { z } from "zod"


const UserSchema = z.object({
  success: z.boolean(),
  status: z.number().int(),
  message: z.string(),
  data: z.object({id: z.string(), name: z.string(), email: z.email()})
});

test('Get User Profile', async ({ usersEndpoint }) => {
  const response = await usersEndpoint.getUserProfile();
  const responseJson = await response.json();
  await expect(response).toBeOK();

  expect(() => {
    UserSchema.parse(responseJson)
  }).not.toThrow();
});
