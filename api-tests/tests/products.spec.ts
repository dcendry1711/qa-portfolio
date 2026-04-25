import { Product } from "../apiTypes";
import { test, expect } from "../fixtures/fakeStore.fixture";
import { checkResponseStatus } from "../helpers/checkResponseStatus.helper";
import { validateProduct } from "../helpers/validateProduct.helper";

test.describe("Products API", () => {
  test("TC01 - get all products", async ({ fS }) => {
    const response = await fS.get("/products");
    const productsArray: Product[] = await response.json();

    checkResponseStatus(response, 200);
    expect(productsArray).toBeInstanceOf(Array);
    expect(productsArray.length).toBeGreaterThan(0);
  });

  test("TC02 - get single product", async ({ fS }) => {
    const productId = 1;
    const response = await fS.get(`/products/${productId}`);
    const singleProductData: Product = await response.json();

    checkResponseStatus(response, 200);
    expect(singleProductData).toBeInstanceOf(Object);
    expect(singleProductData.id).toBe(productId);
  });

  test("TC03 - Create new product", async ({ fS }) => {
    const newProduct: Partial<Product> = {
      title: "Test Product",
      price: 19.99,
    };

    const response = await fS.post("/products", { data: newProduct });
    const createdProduct: Product = await response.json();

    checkResponseStatus(response, 201);
    expect(createdProduct).toBeInstanceOf(Object);
    expect(createdProduct).toHaveProperty("id");
    expect(createdProduct).toMatchObject({
      id: expect.any(Number),
    });
  });

  test("TC04 - Delete product", async ({ fS }) => {
    const deletedProductId = 1;
    const response = await fS.delete(`/products/${deletedProductId}`);

    checkResponseStatus(response, 200);
  });

  test("TC05 - Get non existing product", async ({ fS }) => {
    const nonExistProductId = 9999;
    const response = await fS.get(`/products/${nonExistProductId}`);

    checkResponseStatus(response, 200); //In this test-case API should return status code 404 (not found)
  });
});
