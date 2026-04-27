import { expect } from "@playwright/test";
import { Product } from "../apiTypes";

export function validateProductStructure(prod: Product) {
  
  const propArr = ["id", "title", "price", "description", "category", "image", "rating"]

  propArr.forEach(property => {
    expect(prod).toHaveProperty(property)
  })
}
