import { request as playwrightRequest, test as base, type APIRequestContext } from '@playwright/test';

type WorkerFixtures = {
  workerRequest: APIRequestContext;
  token: string;
};

export const test = base.extend<{}, WorkerFixtures>({
  workerRequest: [
    async ({}, use) => {
      const request = await playwrightRequest.newContext();
      await use(request);
      await request.dispose();
    },
    { scope: 'worker' },
  ],

  token: [
    async ({ workerRequest }, use) => {
       const response = await workerRequest.post("https://practice.expandtesting.com/notes/api/users/login", { form: { email: "snover80@gmail.com", password: "123456"}});
    const json = await response.json();
    await use(json.data.token);
    },
    { scope: 'worker' },
  ],
});
