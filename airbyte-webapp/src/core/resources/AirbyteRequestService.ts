import { NetworkError } from "./NetworkError";
import config from "../../config";

export default class AirbyteRequestService {
  static rootUrl = config.apiUrl;

  /** Perform network request*/
  static async fetch(
    url: string,
    body?: Readonly<object | string>,
    options?: Partial<RequestInit>
  ) {
    const response = await fetch(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const e = new NetworkError(response);
      e.status = response.status;
      throw e;
    }
  }
}