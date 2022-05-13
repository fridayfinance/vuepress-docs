# @airbank/gmi-sdk

## Installation
```sh
yarn add @airbank/gmi-sdk
```
## Setup

First you need to setup your api key

```ts
import getMyInvoices from "@airbank/gmi-sdk";

getMyInvoices.init({
  apiKey: "0up1-o2br-nrcv-5mrw-zh0a-0m7s-v536",
  mode: "production",
});
```

There are two values of `mode`: `production` and `sandbox` the default value.

## Actions

### Create account

Create a new account.

```ts
const response = await getMyInvoices.createAccount({
  companyName: "GetMyInvoices",
  email: "max.mustermann@example.org",
  password: "56NBRh8sZLxuJrF",
  firstname: "Max",
  lastname: "Mustermann",
  package: "package_key",
  paymentInterval: "monthly",
  country: 28715,
  language: "de",
  externalId: "10001",
  trialAccount: true,
});
```

#### Input

| key             | Type    | Required | Default | Enum                 |
| --------------- | ------- | -------- | ------- | -------------------- |
| companyName     | string  | True     |         |                      |
| email           | string  | True     |         |                      |
| password        | string  | False    |         |                      |
| firstname       | string  | True     |         |                      |
| lastname        | string  | False    |         |                      |
| package         | string  | True     |         |                      |
| paymentInterval | string  | False    | monthly | "monthly" , "yearly" |
| country         | number  | True     |
| language        | string  | True     |         | "de" , "en"          |
| externalId      | string  | False    |         |                      |
| trialAccount    | boolean | False    |         |                      |

#### Response Example

```json
// response
{
  "success": true,
  "accountPrimUid": 100,
  "userPrimUid": 110
}
```

### Create GetMyInvoices API key

Create a new API key for that account

```ts
const accountPrimUid = 100;
const response = await getMyInvoices.createAccountsAPIKey(accountPrimUid, {
  apiPermission: "FULL_PERMISSION",
  note: "This is note",
});
```

#### Response Example

```json
{
  "success": true,
  "apiKeyUid": 42448,
  "accountsApiKey": "gt1h-k8et-xe55-3g82-0gpo-c5sw-stuc",
  "apiPermission": "FULL_PERMISSION",
  "note": "This is note"
}
```

### Get account

Get data for one account.

```ts
const accountPrimUid = 100;
const response = await getMyInvoices.getAccount(accountPrimUid);
```

#### Response Example

```json
{
  "accountPrimUid": 1,
  "externalId": 10001,
  "companyName": "GetMyInvoices",
  "email": "max.mustermann@example.org",
  "active": true,
  "package": "",
  "paymentInterval": "monthly",
  "addons": "[{'key': 'addon_key', 'amount': 5}]",
  "country": 28715,
  "language": "de",
  "locked": false,
  "numberOfOnlinePortals": 8,
  "usesEmailImport": false,
  "usesInbox": true,
  "created": "2018-01-03",
  "lastLogin": "2018-01-03 14:00:00"
}
```

### Activate account

Activate an account.

```ts
const accountPrimUid = 100;
const response = await getMyInvoices.activateAccount(accountPrimUid);
```

#### Response Example

```json
{
  "success": true
}
```

### Activate account

Deactivate an account.

```ts
const accountPrimUid = 100;
const response = await getMyInvoices.deactivateAccount(accountPrimUid);
```

#### Response Example

```json
{
  "success": true
}
```

### Delete account

Delete an account.

```ts
const accountPrimUid = 100;
const response = await getMyInvoices.deleteAccount(accountPrimUid);
```

#### Response Example

```json
{
  "success": true
}
```

### Get country list

Get list of all available countries.

```ts
const response = await getMyInvoices.getCountries();
```

#### Response Example

```json
[
  {
    "primUid": 28715,
    "name": "Germany"
  },
  {
    "primUid": 28718,
    "name": "United Kingdom"
  }
]
```
