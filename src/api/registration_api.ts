import { APIRequestContext, APIResponse } from "@playwright/test";

export class RegistrationApi {
  private readonly request: APIRequestContext;
  private readonly registrationUrl =
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/register";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registrationViaApi(
    username: string,
    password: string,
    email: string
  ): Promise<APIResponse> {
    const registrationResponse = await this.request.post(this.registrationUrl, {
      headers: { "Content-Type": "application/json" },
      data: { username, password, email },
    });
    return registrationResponse;
  }
}
