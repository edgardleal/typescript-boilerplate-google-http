/**
 * http-retry-decorator.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@.com>
 * @module http-retry-decorator.ts
 */

import HttpClient from '../http-client';

/**
 * Implements a retry mechanism when an error ocoour
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class HttpRetryDecorator<P = string, R = string> implements HttpClient<P, R> {
  private httpClient: HttpClient<P, R>;

  constructor(httpClient: HttpClient<P, R>) {
    this.httpClient = httpClient;
  }

  async execute(url: string, input: P): Promise<R> {
    try {
      const response = await this.httpClient.execute(url, input);
      return response;
    } catch (e) {
      return this.httpClient.execute(url, input);
    }
  }
}
