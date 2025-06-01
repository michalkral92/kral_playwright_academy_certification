import { test } from "@playwright/test";
import { LoginApi } from "../../src/api/login_api.ts";

test("API test - successfull login", async ({ request }) => {
  const loginApi = new LoginApi(request);

  await loginApi.login("tester01", "certifikace");
});
