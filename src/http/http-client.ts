/**
 * http-client.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module http-client.ts
 */
export default interface HttpClient<P, R> {
  execute: (url: string, input: P) => Promise<R>;
}
