/**
 * factory.ts
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */

import HttpClient from './http-client';
import AxiosGetClient from './axios/axios-get-client';

/**
 * Create Hppt classes instances and its dependencies
 */
export default class HttpFactory {
  private httpGetClient: HttpClient<any, any>;

  getHttpGetClient<T = any>(): HttpClient<any, T> {
    if (!this.httpGetClient) {
      this.httpGetClient = new AxiosGetClient<T>();
    }
    return this.httpGetClient;
  }
}
