import { APIResponse } from "@playwright/test";

export function checkResponseStatus(response: APIResponse, expectedStatus: number): void {
  const status = response.status();
  if (status !== expectedStatus) {
    throw new Error(`Expected status ${expectedStatus}, but got ${status}`);
  } 
}