/**
 * http-cash-decorator.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@.com>
 * @module http-cash-decorator.ts
 */

import HttpClient from '../http-client';
import File from '../../file/file';
import Url from '../Url';

export interface CachedData<R> {
  timestamp: number;
  data: R;
  hits: number;
}

/**
 * Implements a disk-cache for http-clients
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class HttpCashDecorator<I, R> implements HttpClient<I, R> {
  private httpClient: HttpClient<I, R>;

  constructor(httpClient: HttpClient<I, R>) {
    this.httpClient = httpClient;
  }

  async execute(url: string, input: I): Promise<R> {
    const { id } = new Url(url);
    const file = new File(`${id}.cache`);
    const exists = await file.exists();
    if (exists) {
      const cachedData: CachedData<R> = JSON.parse((await file.read()) || 'null');
      return cachedData.data;
    }
    const response = await this.httpClient.execute(url, input);
    const cacheData: CachedData<R> = {
      timestamp: Date.now(),
      hits: 0,
      data: response,
    };
    await file.write(Buffer.from(JSON.stringify(cacheData)));

    return response;
  }
}
