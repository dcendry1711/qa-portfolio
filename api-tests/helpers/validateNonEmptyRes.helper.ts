import { expect } from "@playwright/test";
import { Product } from "../apiTypes";

export function validateNonEmptyResponse(resp: Product[]){
    expect(resp).toBeInstanceOf(Array)
    expect(resp.length).toBeGreaterThan(0)
    resp.forEach(el => expect(el).toHaveProperty("id"))
}