/**
 * axios-get-client.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module axios-get-client.ts
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpClient from '../http-client';

/**
 * Implements a GET methos using axios
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class AxiosGetClient<T = any> implements HttpClient<string, T> {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      timeout: 5000,
    });
  }

  async execute(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get<T>(url);
    return response.data;
  }
}
