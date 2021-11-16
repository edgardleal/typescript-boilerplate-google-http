/**
 * HttpPage.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@.com>
 * @module HttpPage.ts
 */

import Languagedetect from 'languagedetect';
import { fromString } from 'html-to-text';
import Url from './Url';
import HttpClient from './http-client';
import AxiosGetClient from './axios/axios-get-client';
import HttpCashDecorator from './decorators/http-cash-decorator';

/**
 * Repretents an Http Page
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class HttpPage {
  title: string;

  url: Url;

  text: string;

  html: string;

  client: HttpClient<string, string>;

  language: string;

  constructor(pagePath: string) {
    this.url = new Url(pagePath);
    this.client = new HttpCashDecorator<string, string>(
      new AxiosGetClient(),
    );
  }

  async load() {
    if (this.html) {
      return;
    }
    this.html = await this.client.execute(this.url.toString(), '');
    this.text = fromString(this.html);
    const languages = new Languagedetect().detect(this.text);
    if (languages && languages.length) {
      [[this.language]] = languages;
    }
  }
}
