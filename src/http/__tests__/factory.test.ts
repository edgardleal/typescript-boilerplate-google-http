/**
 * FactoryTest
 * Copyright (C) 2021 edgardleal
 *
 * Distributed under terms of the MIT license.
 */
import Factory from '../factory';

describe('Factory', () => {
  it('should return a valid instance of httpClient', () => {
    const instance = new Factory().getHttpGetClient();
    expect(instance.execute).toBeInstanceOf(Function);
  });
});
