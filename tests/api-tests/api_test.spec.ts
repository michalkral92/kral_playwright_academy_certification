import { test, expect } from "@playwright/test";
import { LoginApi } from "../../src/api/login_api.ts";
import { faker } from "@faker-js/faker";
import { RegistrationApi } from "../../src/api/registration_api.ts";

test("API test - successfull login with unique user", async ({ request }) => {
  const registrationApi = new RegistrationApi(request);
  const loginApi = new LoginApi(request);
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();
  const password = faker.internet.password();

  await test.step("User registration via API", async () => {
    const registrationResponse = await registrationApi.registrationViaApi(
      username,
      password,
      email
    );
    expect(registrationResponse.status()).toBe(201);
  });

  await test.step("Response status is 201 and access token is defined", async () => {
    const loginResponse = await loginApi.loginViaApi(username, password);
    const status = loginResponse.status();
    console.log("Login response status:", status);
    expect(loginResponse.status()).toBe(201);
    const loginResponseBody = await loginResponse.json();
    console.log("Access token:", loginResponseBody.access_token);
    expect(loginResponseBody.access_token).toBeDefined();
  });
});
