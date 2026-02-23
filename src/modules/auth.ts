import { ZevClient } from '../client';

export interface AuthResponse {
  accessToken: string;
  customer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

export interface AuthMessage {
  success: boolean;
  message: string;
}

export class AuthClient {
  constructor(private client: ZevClient) { }

  public async register(email: string, password: string, firstName: string, lastName: string, phone?: string) {
    const query = `
      mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $phone: String) {
        customerRegister(email: $email, password: $password, firstName: $firstName, lastName: $lastName, phone: $phone) {
          accessToken
          customer {
            id
            email
            firstName
            lastName
          }
        }
      }
    `;
    const response = await this.client.request<{ customerRegister: AuthResponse }>(query, { email, password, firstName, lastName, phone });
    return response.customerRegister;
  }

  public async login(email: string, password: string) {
    const query = `
      mutation Login($email: String!, $password: String!) {
        customerLogin(email: $email, password: $password) {
          accessToken
          customer {
            id
            email
            firstName
            lastName
          }
        }
      }
    `;
    const response = await this.client.request<{ customerLogin: AuthResponse }>(query, { email, password });
    return response.customerLogin;
  }

  public async forgotPassword(email: string) {
    const query = `
      mutation Forgot($email: String!) {
        customerForgotPassword(email: $email) {
          success
          message
        }
      }
    `;
    const response = await this.client.request<{ customerForgotPassword: AuthMessage }>(query, { email });
    return response.customerForgotPassword;
  }

  public async verifyOtp(email: string, code: string) {
    const query = `
      mutation VerifyOtp($email: String!, $code: String!) {
        customerVerifyOtp(email: $email, code: $code) {
          success
          message
        }
      }
    `;
    const response = await this.client.request<{ customerVerifyOtp: AuthMessage }>(query, { email, code });
    return response.customerVerifyOtp;
  }

  public async resetPassword(email: string, code: string, newPassword: string) {
    const query = `
      mutation ResetPassword($email: String!, $code: String!, $newPassword: String!) {
        customerResetPassword(email: $email, code: $code, newPassword: $newPassword) {
          success
          message
        }
      }
    `;
    const response = await this.client.request<{ customerResetPassword: AuthMessage }>(query, { email, code, newPassword });
    return response.customerResetPassword;
  }

  public async getSession() {
    const query = `
      query HeadlessSession {
        headlessSession {
          active
          customerId
          scopes
        }
      }
    `;
    const response = await this.client.request<{ headlessSession: import('../types').SessionInfo }>(query);
    return response.headlessSession;
  }

  public async getPermissions() {
    const query = `
      query HeadlessPermissions {
        headlessPermissions
      }
    `;
    const response = await this.client.request<{ headlessPermissions: string[] }>(query);
    return response.headlessPermissions;
  }

  public async getApiVersion() {
    const query = `
      query ApiVersion {
        apiVersion
      }
    `;
    const response = await this.client.request<{ apiVersion: string }>(query);
    return response.apiVersion;
  }
}
