import { test as base, APIRequestContext, request } from "@playwright/test";

type FakeStoreFixture = {
  fS: APIRequestContext;
};

export const test = base.extend<FakeStoreFixture>({
  fS: async ({ playwright }, use) => {
    const fakeStore = await playwright.request.newContext({
      baseURL: "https://fakestoreapi.com",
    });
    await use(fakeStore);
    await fakeStore.dispose();
  },
});

export { expect } from "@playwright/test";
