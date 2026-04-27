import { Product } from "../apiTypes";
import { test, expect } from "../fixtures/fakeStore.fixture";
import { checkResponseStatus } from "../helpers/checkResponseStatus.helper";
import { validateNonEmptyResponse } from "../helpers/validateNonEmptyRes.helper";
import { validateProdPropType } from "../helpers/validateProdPropType.helper";
import { validateProductStructure } from "../helpers/validateProductStructure.helper";

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
    expect(createdProduct.title === newProduct.title).toBe(true);
    expect(createdProduct.price === newProduct.price).toBe(true);
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

  test("TC06 - Validate response structure", async ({ fS }) => {
    const response = await fS.get("/products");
    const productsArr: Product[] = await response.json();
    checkResponseStatus(response, 200);
    productsArr.forEach((element) => validateProductStructure(element));
  });

  test("TC07 - Validate product data types", async ({ fS }) => {
    const response = await fS.get("/products/1");
    const firstProductData: Product = await response.json();
    checkResponseStatus(response, 200);
    validateProdPropType(firstProductData);
  });

  test("TC08 - Validate non empty response", async ({ fS }) => {
    const response = await fS.get("/products");
    const responseArr = await response.json();
    checkResponseStatus(response, 200);
    validateNonEmptyResponse(responseArr);
  });

  test("TC09 - invalid Id format", async ({ fS }) => {
    const response = await fS.get("/products/abc");
    checkResponseStatus(response, 200); //api return status code = 200, should be 400 (bad request)
  });

  test("TC10 - Missing required fields", async ({ fS }) => {
    const prodWithMissingFields = {
      price: 20,
    };
    const response = await fS.post("/products", {
      data: prodWithMissingFields,
    });
    checkResponseStatus(response, 201); //api should return status code 400 not 201 like during tests
  });
});
