/**
 * Url.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@.com>
 * @module Url.ts
 */
import { createHash } from 'crypto';

export interface UrlData {
  id: string;
  full: string;
  protocol: string;
  domain: string;
  path: string;
}

/**
 * Reprentents a internet url
 * @author edgardleal@gmail.com
 * @since 13.05.21
 */
export default class Url implements UrlData {
  id: string;

  full: string;

  // TODO: extract others parts
  protocol: string;

  domain: string;

  path: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('Url parameter is undefined');
    }
    const hash = createHash('md5');
    hash.update(value);
    this.id = hash.digest('hex');
    this.full = value;
  }

  toString() {
    return this.full;
  }
}
