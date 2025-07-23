import { expect, test } from "../fixtures/api";
import { Pet, PetBuilder, PetSchema } from "../models/Pet";


test('Create new Pet', async ({ petEndpoint }) => {
  const response = await petEndpoint.createPet(PetBuilder.buildPetWithDetails(100, "Playwright dog", 1, "Domestic", ["String"], 2, "house"))
  const responseJson = await response.json();

  // Assert response
  await expect(response).toBeOK();

  expect(() => {
    const responsePet = PetSchema.parse(responseJson)
    console.log(responsePet.id);
  }).not.toThrow();  
});

test('Get pet', async ({ petEndpoint }) => {
  const response = await petEndpoint.createPet(PetBuilder.buildPetWithDetails(101, "Playwright cat", 1, "Domestic", ["String"], 2, "house"))
  await expect(response).toBeOK();
  const responseJson = await response.json();

  const getResponse = await petEndpoint.getPet(responseJson.id);
  await expect(getResponse).toBeOK();
  const getJson = await getResponse.json();

  let petObject: Pet | undefined

  expect(() => {
    petObject = PetSchema.parse(getJson)
  }).not.toThrow();

  expect(petObject?.id).toEqual(101);
});
