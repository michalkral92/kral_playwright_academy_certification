import { APIRequestContext, APIResponse } from "@playwright/test";

export class LoginApi {
  private readonly request: APIRequestContext;
  private readonly loginUrl =
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async loginViaApi(username: string, password: string): Promise<APIResponse> {
    const loginResponse = await this.request.post(this.loginUrl, {
      headers: { "Content-Type": "application/json" },
      data: { username, password },
    });
    return loginResponse;
  }
}
