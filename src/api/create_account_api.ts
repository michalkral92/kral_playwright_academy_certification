import { APIRequestContext, expect } from "@playwright/test";

export class AccountApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createAccount(token: string, startBalance = 10000, type = "Test") {
    const response = await this.request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          startBalance,
          type,
        },
      }
    );

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.accountNumber).toBeDefined();

    return responseBody;
  }
}
