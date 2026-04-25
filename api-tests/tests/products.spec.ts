import {test, expect} from "../fixtures/fakeStore.fixture";

test.describe("Products API", () => {

  test("TC01 - get all products", async ({fS}) => {
    const response = await fS.get("/products");
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
