import { APIRequestContext, APIResponse } from "@playwright/test";

export class CreateAccountApi {
  private readonly request: APIRequestContext;
  private readonly createAccountUrl =
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/accounts/create";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createAccountApi(
    token: string,
    startBalance: number,
    type: string
  ): Promise<APIResponse> {
    const createAccountResponse = await this.request.post(
      this.createAccountUrl,
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
    return createAccountResponse;
  }
}
