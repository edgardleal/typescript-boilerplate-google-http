/**
 * http-cash-decorator.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@.com>
 * @module http-cash-decorator.ts
 */

import { promisify } from 'util';
import fs from 'fs';
import HttpClient from '../http-client';
import Url from '../Url';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export interface CachedData<R> {
  timestamp: number;
  data: R;
  hits: number;
}

/**
 * generate a cache file name from a URL
 */
function generateFileName(url: Url): string {
  return `${url.id}.cache`;
}

/**
 * Implements a disk-cache for http-clients
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class HttpCashDecorator<I, R> implements HttpClient<I, R> {
  private httpClient: HttpClient<I, R>;

  private inMemoryCachedItems: { [id: string]: CachedData<R> };

  constructor(httpClient: HttpClient<I, R>) {
    this.httpClient = httpClient;
  }

  async getFromFile(urlObject: Url): Promise<CachedData<R> | null> {
    const { id } = urlObject;
    if (this.inMemoryCachedItems[id]) {
      return this.inMemoryCachedItems[id];
    }
    const fileName = generateFileName(urlObject);
    if (!await exists(fileName)) {
      return null;
    }
    const content = await readFile(fileName);
    const parsed: CachedData<R> = JSON.parse(content.toString('utf8'));
    return parsed;
  }

  async writeOnCache(data: CachedData<R>, url: Url) {
    this.inMemoryCachedItems[url.id] = {
      ...data,
      hits: data.hits + 1,
    };
    const json = JSON.stringify(data, null, 2);
    await writeFile(generateFileName(url), json);
  }

  async execute(url: string, input: I): Promise<R> {
    const urlObject = new Url(url);
    const cachedData = await this.getFromFile(urlObject);
    if (cachedData) {
      this.writeOnCache(cachedData, urlObject); // there is no need to wait
      return cachedData.data;
    }
    const response = await this.httpClient.execute(url, input);
    const dataToCache: CachedData<R> = {
      timestamp: Date.now(),
      hits: 0,
      data: response,
    };

    this.writeOnCache(dataToCache, urlObject);

    return response;
  }
}
