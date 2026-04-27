import { Product } from "../apiTypes";
import { expect } from "@playwright/test";

export function validateProdPropType(prod: Product) {
  expect(prod).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    description: expect.any(String),
    category: expect.any(String),
    image: expect.any(String),
    rating: {
      rate: expect.any(Number),
      count: expect.any(Number),
    },
  });

  if (typeof prod.id !== "number") {
    throw new Error(`Invalid product id: ${prod.id}`);
  }
  if (typeof prod.title !== "string") {
    throw new Error(`Invalid product title: ${prod.title}`);
  }
  if (typeof prod.price !== "number") {
    throw new Error(`Invalid product price: ${prod.price}`);
  }
  if (typeof prod.description !== "string") {
    throw new Error(`Invalid product description: ${prod.description}`);
  }
  if (typeof prod.category !== "string") {
    throw new Error(`Invalid product category: ${prod.category}`);
  }
  if (typeof prod.image !== "string") {
    throw new Error(`Invalid product image: ${prod.image}`);
  }
  if (typeof prod.rating.rate !== "number") {
    throw new Error(`Invalid product rate: ${prod.rating.rate}`);
  }
  if (typeof prod.rating.count !== "number") {
    throw new Error(`Invalid product count: ${prod.rating.count}`);
  }
}
