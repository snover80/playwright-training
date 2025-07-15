import { test as base } from './token';
import { CommentsEndpoint } from '../endpoints/CommentsEndpoint';
import { UsersEndpoint } from '../endpoints/UsersEndpoint';
import { PetEndpoint } from '../endpoints/pet-store/PetEndpoint';


type ApiModels = {
  commentsEndpoint: CommentsEndpoint;
  usersEndpoint: UsersEndpoint;
  petEndpoint: PetEndpoint;
};

export const test = base.extend<ApiModels>({
  commentsEndpoint: async ({ request }, use) => {
    await use(new CommentsEndpoint(request));
  },

  usersEndpoint: async ({ request, token }, use) => {
    await use(new UsersEndpoint(request, token));
  },

  petEndpoint: async ({ request }, use) => {
    await use(new PetEndpoint(request));
  },

});

export { expect } from '@playwright/test';