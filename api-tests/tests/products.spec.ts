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
    checkResponseStatus(response, 200); //In this test-case API should return status code 404 (not found), qualify for bug report
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
    checkResponseStatus(response, 200); //api return status code = 200, should be 400 (bad request), qualify for bug report
  });

  test("TC10 - Missing required fields", async ({ fS }) => {
    const prodWithMissingFields = {
      price: 20,
    };
    const response = await fS.post("/products", {
      data: prodWithMissingFields,
    });
    checkResponseStatus(response, 201); //api should return status code 400 not 201 like during tests, qualify for bug report
  });

  test("TC11 - Invalid data types", async ({ fS }) => {
    const prodWithWrongDataType: Partial<Product> = {
      title: 12,
      price: "twelve",
    };
    const response = await fS.post("/products", {
      data: prodWithWrongDataType,
    });
    checkResponseStatus(response, 201); //api should return status code 400 not 201 like during tests, qualify for bug report
  });

  test("TC12 - Empty request body", async ({ fS }) => {
    const response = await fS.post("/products", { data: {} });
    checkResponseStatus(response, 201); //api should return status code 400 not 201 like during tests, qualify for bug report
  });

  test("TC13 - large response handling", async ({ fS }) => {
    const response = await fS.get("/products");
    const productsArr: Product[] = await response.json();
    checkResponseStatus(response, 200);
    expect(productsArr.length).toBeGreaterThan(0);
  });

  test("TC14 - very long product title", async ({ fS }) => {
    const longTitle = "A".repeat(1000);
    const newProduct: Partial<Product> = {
      title: longTitle,
      price: 19.99,
    };
    const response = await fS.post("/products", { data: newProduct });
    const createdProduct: Product = await response.json();
    checkResponseStatus(response, 201);
    expect(createdProduct.title).toBe(longTitle);
  });

  test("TC15 - extremly high price value", async ({ fS }) => {
    const newProduct: Partial<Product> = {
      title: "Expensive Product",
      price: 1e10,
    };
    const response = await fS.post("/products", { data: newProduct });
    const createdProduct: Product = await response.json();
    checkResponseStatus(response, 201);
    expect(createdProduct.price).toBe(1e10);
  });

  test("TC16 - Multiple rapid requests", async ({ fS }) => {
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(fS.get("/products"));
    }
    const responses = await Promise.all(requests);
    responses.forEach((response) => {
      checkResponseStatus(response, 200);
    });
  });

  test("TC17 - SQL injection attempt", async ({ fS }) => {
    const maliciousInput = "'; DROP TABLE products; --";
    const response = await fS.post("/products", {
      data: { title: maliciousInput, price: 19.99 },
    });
    checkResponseStatus(response, 201); //api should return status code 400 not 201 like during tests, qualify for bug report
  });

  test("TC18 - script injection (Xss) attempt", async ({ fS }) => {
    const maliciousInput = "<script>alert('XSS');</script>";
    const response = await fS.post("/products", {
      data: { title: maliciousInput, price: 19.99 },
    });
    checkResponseStatus(response, 201); //API accepts script tags in input without sanitization. This may lead to XSS if data is rendered without escaping on the frontend.
  });
});
