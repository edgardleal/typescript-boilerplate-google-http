/**
 * index.ts
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */

import HttpFactory from './factory';

/**
 * Return default factory instance
 */
export default function http(): HttpFactory {
  return new HttpFactory();
}
