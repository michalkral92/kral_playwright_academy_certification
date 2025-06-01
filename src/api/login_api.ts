import { APIRequestContext, expect } from "@playwright/test";

export class LoginApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(username: string, password: string): Promise<string> {
    const response = await this.request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
      {
        headers: { "Content-Type": "application/json" },
        data: { username, password },
      }
    );

    const status = response.status();
    console.log("Login response status:", status);
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log("Access token:", responseBody.access_token);
    expect(responseBody.access_token).toBeDefined();

    return responseBody.access_token;
  }
}
