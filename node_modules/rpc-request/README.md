# rpc-request ![CI Status](https://github.com/vansergen/rpc-request/workflows/CI/badge.svg) ![npm](https://img.shields.io/npm/v/rpc-request) [![Coverage Status](https://coveralls.io/repos/github/vansergen/rpc-request/badge.svg?branch=main)](https://coveralls.io/github/vansergen/rpc-request?branch=main) [![Known Vulnerabilities](https://snyk.io/test/github/vansergen/rpc-request/badge.svg)](https://snyk.io/test/github/vansergen/rpc-request) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![NPM license](https://img.shields.io/npm/l/rpc-request)](LICENSE) ![node version](https://img.shields.io/node/v/rpc-request) ![npm downloads](https://img.shields.io/npm/dt/rpc-request) ![GitHub top language](https://img.shields.io/github/languages/top/vansergen/rpc-request)

`rpc-request` is a simple wrapper of the [Fetch API](https://nodejs.org/api/globals.html#fetch) in a class.

## Installation

```bash
npm install rpc-request
```

## Usage

The `Fetch` class accepts all parameters from `RequestInit` plus the following

```typescript
import { Fetch } from "rpc-request";
// 1. Transform the response by default
const transform = "json";
// 2. Base url for the `.fetch()` method
const base_url = new URL("http://worldtimeapi.org/");
// 3. Throws an error when `response.ok !== true`
const reject = true;
// Plus anything from `RequestInit`
const headers = { "X-TOKEN": "123" };
const client = new Fetch({ transform, base_url, reject, headers });
const response = await client.get("/api/ip");
```

One can easily extend it

```typescript
import { Fetch } from "rpc-request";
interface IResponse1 {
  bar: "bar";
}
interface IResponse2 {
  foo: "foo";
}
class CustomFetch extends Fetch {
  public constructor() {
    super({
      transform: "json",
      base_url: new URL("http://www.example.com/api/v1/"),
    });
  }
  public post<T = unknown>(
    path: string,
    body: Record<string, unknown> = {},
  ): Promise<T> {
    return super.post<T>(path, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }
  public getFoo(): Promise<IResponse1> {
    return this.get<IResponse1>("/get");
  }
  public getBar(id: string): Promise<IResponse2> {
    return this.post<IResponse2>("/post", { id });
  }
}
```

- `fetch`

The basic method

```typescript
import { Fetch } from "rpc-request";
interface Ip {
  client_ip: string;
  timezone: string;
}
const base_url = new URL("http://worldtimeapi.org/api/");
const client = new Fetch({ base_url, transform: "json" });
const { client_ip, timezone } = await client.fetch<Ip>("ip");
```

### HTTP methods.

- `get`

```typescript
interface Info {
  data: string;
  headers: Record<string, string | undefined>;
}
const base_url = "https://httpbin.org/";
const client = new Fetch({ transform: "json", base_url });
const { data, headers } = await client.get<Info>("anything");
```

- `post`

```typescript
const base_url = "https://httpbin.org/";
const client = new Fetch({
  base_url,
  body: JSON.stringify({ data: "Hello World!" }),
  transform: "text",
});
const string = await client.post<string>("anything");
console.log(typeof string === "string");
```

- `put`

```typescript
const base_url = "https://httpbin.org/";
const client = new Fetch({
  base_url,
  body: JSON.stringify({ data: "Hello World!" }),
  transform: "buffer",
  reject: true,
});
const buffer = await client.put<ArrayBuffer>("anything");
console.log(buffer instanceof ArrayBuffer);
```

- `patch`

```typescript
import { Blob } from "node:buffer";
const base_url = "https://httpbin.org/";
const client = new Fetch({
  base_url,
  body: JSON.stringify({ data: "Hello World!" }),
  transform: "blob",
});
const blob = await client.patch("anything");
console.log(blob instanceof Blob);
```

- `delete`

```typescript
const base_url = "https://httpbin.org/";
const client = new Fetch({
  base_url,
  body: JSON.stringify({ data: "Hello World!" }),
  transform: "buffer",
  reject: true,
});
const buffer = await client.delete<Buffer>("anything");
console.log(buffer instanceof Buffer);
```

- `head`

```typescript
const base_url = "https://httpbin.org/";
const client = new Fetch({ transform: "json", base_url });
const response = await client.head("/anything");
```

- `options`

```typescript
const client = new Fetch({ base_url: "https://httpbin.org/" });
const response = await client.options("/anything");
```
