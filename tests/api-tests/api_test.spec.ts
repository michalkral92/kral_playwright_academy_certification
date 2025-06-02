import { test, expect } from "@playwright/test";
import { LoginApi } from "../../src/api/login_api.ts";

test("API test - successfull login", async ({ request }) => {
  const loginApi = new LoginApi(request);
  const loginResponse = await loginApi.loginViaApi("tester01", "certifikace");

  await test.step("Response status is 201", async () => {
    const status = loginResponse.status();
    console.log("Login response status:", status);
    expect(loginResponse.status()).toBe(201);
  });

  await test.step("Acces token is defined", async () => {
    const loginResponseBody = await loginResponse.json();
    console.log("Access token:", loginResponseBody.access_token);
    expect(loginResponseBody.access_token).toBeDefined();
  });
});
