import axios, { AxiosInstance } from "axios";
import {
  Account,
  AccountEndPoints,
  CountryItem,
  GeneralEndpoints,
  GetMyInvoicesOptions,
} from "./gmi.types";
import { objDeepLoop, stringToCamelCase, stringToSnakeCase } from "./utils";

export class GetMyInvoices {
  private readonly PRODUCTION_URL =
    "https://api.getmyinvoices.com/accounts/v3/";
  private readonly SANDBOX_URL = "https://sandbox.access.getmyinvoices.de/v1/";
  private options: GetMyInvoicesOptions;
  private http: AxiosInstance;

  init(options: GetMyInvoicesOptions) {
    this.options = { ...{ mode: "sandbox" }, ...options };
    const { mode } = this.options;
    const baseURL =
      mode === "production" ? this.PRODUCTION_URL : this.SANDBOX_URL;

    this.http = axios.create({
      baseURL,
      transformResponse: [
        ...(axios.defaults.transformResponse as any),
        (data: any) => {
          return objDeepLoop(data, stringToCamelCase);
        },
      ],
      transformRequest: [
        ...(axios.defaults.transformRequest as any),
        (data: any) => {
          const transformed = objDeepLoop(
            { ...JSON.parse(data), apiKey: this.options.apiKey },
            stringToSnakeCase
          ) as any;
          const stringified = JSON.stringify(transformed);
          return stringified;
        },
      ],
    });
  }

  public async createAccount(payload: Account.CreateBody) {
    try {
      const { data } = await this.http.post<Account.CreateResponse>(
        AccountEndPoints.create,
        payload
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAccount(accountId: number) {
    if (!accountId) throw new Error("Please provide account ID");
    try {
      const { data } = await this.http.post<Account.AccountDetails>(
        AccountEndPoints.getOne,
        {
          accountPrimUid: accountId,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async activateAccount(accountId: number) {
    if (!accountId) throw new Error("Please provide account ID");
    try {
      const { data } = await this.http.post<{ success: boolean }>(
        AccountEndPoints.activate,
        {
          accountPrimUid: accountId,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async createAccountsAPIKey(
    accountId: number,
    data: Account.CreateApiKeyRequest
  ) {
    if (!accountId) throw new Error("Please provide account ID");
    const requestBody = { ...data, accountPrimUid: accountId };
    try {
      const { data } = await this.http.post<{ success: boolean }>(
        AccountEndPoints.createApiKey,
        requestBody
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deactivateAccount(accountId: number) {
    if (!accountId) throw new Error("Please provide account ID");
    try {
      const { data } = await this.http.post<{ success: boolean }>(
        AccountEndPoints.deactivate,
        {
          accountPrimUid: accountId,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAccount(accountId: number) {
    if (!accountId) throw new Error("Please provide account ID");
    try {
      const { data } = await this.http.post<{ success: boolean }>(
        AccountEndPoints.delete,
        {
          accountPrimUid: accountId,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async getCountries() {
    try {
      const { data } = await this.http.post<CountryItem[]>(
        GeneralEndpoints.getCountries
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
