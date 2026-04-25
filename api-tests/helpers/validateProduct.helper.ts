import { Product } from "../apiTypes";

export function validateProduct(prod: Product){
    if (typeof prod.id !== "number") {
        throw new Error(`Invalid product id: ${prod.id}`);
    }
    if (typeof prod.title !== "string") {
        throw new Error(`Invalid product title: ${prod.title}`);
    }
    if (typeof prod.price !== "number") {
        throw new Error(`Invalid product price: ${prod.price}`);
    }
}