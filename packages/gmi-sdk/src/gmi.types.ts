export interface GetMyInvoicesOptions {
  apiKey: string;
  mode?: "production" | "sandbox";
}

export namespace Account {
  interface Account {
    companyName: string;
    email: string;
    package?: string;
    country: number;
    paymentInterval?: "monthly" | "yearly";
    language: "de" | "en";
    externalId?: string;
  }
  export interface CreateBody extends Account {
    password?: string;
    firstname: string;
    lastname?: string;
    trialAccount?: boolean;
  }
  export interface CreateResponse {
    accountPrimUid: number;
    success: boolean;
    userPrimUid: number;
  }

  export interface AccountDetails extends Account {
    accountPrimUid: number;
    active: boolean;
    addons: any;
    locked: boolean;
    numberOfOnlinePortals: number;
    usesEmailImport: boolean;
    usesInbox: boolean;
    created: Date;
    lastLogin: Date;
  }

  export interface CreateApiKeyRequest {
    apiPermission: string;
    apiNote: string;
  }
}

export interface CountryItem {
  primUid: number;
  name: string;
}

export enum AccountEndPoints {
  create = "createAccount",
  list = "listAccounts",
  getOne = "getAccount",
  activate = "activateAccount",
  deactivate = "deactivateAccount",
  delete = "deleteAccount",
  createApiKey = "createAccountsAPIKey",
}
export enum GeneralEndpoints {
  getCountries = "getCountries",
}
